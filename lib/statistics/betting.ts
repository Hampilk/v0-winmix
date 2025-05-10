import type { Match, Team } from "@/types/league"
import { calculateLeagueStandings } from "./core"

export interface ValueBet {
  matchId: string
  homeTeam: string
  awayTeam: string
  prediction: "home" | "draw" | "away"
  odds: number
  valueRating: number // 0-100 scale
  confidence: number // 0-100 scale
  reasoning: string
}

export interface BettingAnalysisResult {
  valueBets: ValueBet[]
  error?: string
}

/**
 * Identifies potential value bets based on match analysis
 * @param matches Array of upcoming matches
 * @param teams Array of teams
 * @param historicalMatches Array of historical matches for reference
 * @returns Object containing value bets and optional error
 */
export function identifyValueBets(matches: Match[], teams: Team[], historicalMatches: Match[]): BettingAnalysisResult {
  if (!matches || !teams || !historicalMatches) {
    return {
      valueBets: [],
      error: "Invalid input data",
    }
  }

  try {
    // Get upcoming matches that have odds
    const upcomingMatches = matches.filter(
      (match) => match.status === "scheduled" && match.odds && match.odds.home && match.odds.draw && match.odds.away,
    )

    if (upcomingMatches.length === 0) {
      return {
        valueBets: [],
        error: "No upcoming matches with odds found",
      }
    }

    // Calculate league standings for reference
    const { standings } = calculateLeagueStandings(historicalMatches, teams)

    const valueBets: ValueBet[] = []

    upcomingMatches.forEach((match) => {
      // Get team stats from standings
      const homeTeamStats = standings.find((s) => s.teamId === match.homeTeamId)
      const awayTeamStats = standings.find((s) => s.teamId === match.awayTeamId)

      if (!homeTeamStats || !awayTeamStats) {
        return // Skip if team stats not found
      }

      // Get team names
      const homeTeam = teams.find((t) => t.id === match.homeTeamId)?.name || "Unknown"
      const awayTeam = teams.find((t) => t.id === match.awayTeamId)?.name || "Unknown"

      // Calculate expected probabilities based on team strength
      const homeStrength = calculateTeamStrength(homeTeamStats, true)
      const awayStrength = calculateTeamStrength(awayTeamStats, false)
      const totalStrength = homeStrength + awayStrength

      // Base probabilities
      let homeProb = homeStrength / totalStrength
      let awayProb = awayStrength / totalStrength
      let drawProb = 1 - homeProb - awayProb

      // Ensure probabilities are positive and sum to 1
      if (drawProb < 0.1) {
        // Minimum 10% chance of draw
        drawProb = 0.1
        const remainingProb = 0.9
        const ratio = homeProb / (homeProb + awayProb)
        homeProb = remainingProb * ratio
        awayProb = remainingProb * (1 - ratio)
      }

      // Convert odds to implied probabilities
      const homeImpliedProb = 1 / match.odds.home
      const drawImpliedProb = 1 / match.odds.draw
      const awayImpliedProb = 1 / match.odds.away

      // Calculate value ratings
      const homeValue = ((homeProb - homeImpliedProb) / homeImpliedProb) * 100
      const drawValue = ((drawProb - drawImpliedProb) / drawImpliedProb) * 100
      const awayValue = ((awayProb - awayImpliedProb) / awayImpliedProb) * 100

      // Find the best value bet
      const values = [
        { prediction: "home", value: homeValue, odds: match.odds.home, prob: homeProb },
        { prediction: "draw", value: drawValue, odds: match.odds.draw, prob: drawProb },
        { prediction: "away", value: awayValue, odds: match.odds.away, prob: awayProb },
      ]

      const bestValue = values.reduce((prev, current) => (current.value > prev.value ? current : prev))

      // Only include if value is positive and significant
      if (bestValue.value > 10) {
        // Calculate confidence based on team form consistency and data quality
        const homeFormConsistency = calculateFormConsistency(homeTeamStats.form)
        const awayFormConsistency = calculateFormConsistency(awayTeamStats.form)
        const confidence = Math.min(70 + (homeFormConsistency + awayFormConsistency) / 2 + bestValue.value / 5, 100)

        // Generate reasoning
        const reasoning = generateBetReasoning(
          bestValue.prediction as "home" | "draw" | "away",
          homeTeam,
          awayTeam,
          homeTeamStats,
          awayTeamStats,
          bestValue.value,
        )

        valueBets.push({
          matchId: match.id,
          homeTeam,
          awayTeam,
          prediction: bestValue.prediction as "home" | "draw" | "away",
          odds: bestValue.odds,
          valueRating: Math.round(bestValue.value),
          confidence: Math.round(confidence),
          reasoning,
        })
      }
    })

    // Sort by value rating (descending)
    valueBets.sort((a, b) => b.valueRating - a.valueRating)

    return { valueBets }
  } catch (error) {
    console.error("Error identifying value bets:", error)
    return {
      valueBets: [],
      error: "Failed to analyze betting opportunities",
    }
  }
}

/**
 * Calculates team strength based on performance statistics
 * @param stats Team statistics
 * @param isHome Whether the team is playing at home
 * @returns Strength rating
 */
function calculateTeamStrength(stats: any, isHome: boolean): number {
  if (!stats) return 0

  // Base strength from points per game
  const pointsPerGame = stats.played > 0 ? stats.points / stats.played : 0
  let strength = pointsPerGame * 10

  // Adjust for goal difference
  const goalDiffPerGame = stats.played > 0 ? stats.goalDifference / stats.played : 0
  strength += goalDiffPerGame * 5

  // Adjust for recent form
  const formFactor = calculateFormFactor(stats.form)
  strength *= formFactor

  // Home advantage
  if (isHome) {
    strength *= 1.2 // 20% home advantage
  }

  return Math.max(strength, 0.1) // Ensure positive strength
}

/**
 * Calculates form factor based on recent results
 * @param form Array of recent results (W/D/L)
 * @returns Form factor multiplier
 */
function calculateFormFactor(form: string[]): number {
  if (!form || form.length === 0) return 1

  let factor = 1
  // More recent matches have higher weight
  const weights = [0.35, 0.25, 0.2, 0.15, 0.05]

  form.slice(0, 5).forEach((result, index) => {
    const weight = weights[index] || 0.05
    if (result === "W") factor += weight * 0.1
    else if (result === "D") factor += 0
    else if (result === "L") factor -= weight * 0.1
  })

  return Math.max(factor, 0.7) // Limit negative impact
}

/**
 * Calculates form consistency
 * @param form Array of recent results (W/D/L)
 * @returns Consistency rating (0-10)
 */
function calculateFormConsistency(form: string[]): number {
  if (!form || form.length < 3) return 5 // Default to medium consistency

  // Check if all recent results are the same
  const recentForm = form.slice(0, 3)
  const allSame = recentForm.every((result) => result === recentForm[0])

  if (allSame) return 10 // Very consistent

  // Check if form is highly variable
  const hasWin = recentForm.includes("W")
  const hasLoss = recentForm.includes("L")
  const hasDraw = recentForm.includes("D")

  if (hasWin && hasLoss && hasDraw) return 2 // Very inconsistent

  return 5 // Moderately consistent
}

/**
 * Generates reasoning for a value bet
 * @param prediction Predicted outcome
 * @param homeTeam Home team name
 * @param awayTeam Away team name
 * @param homeStats Home team statistics
 * @param awayStats Away team statistics
 * @param valueRating Value rating of the bet
 * @returns Reasoning string
 */
function generateBetReasoning(
  prediction: "home" | "draw" | "away",
  homeTeam: string,
  awayTeam: string,
  homeStats: any,
  awayStats: any,
  valueRating: number,
): string {
  let reasoning = ""

  if (prediction === "home") {
    reasoning = `${homeTeam} (home) appears undervalued with ${valueRating.toFixed(1)}% edge. `

    if (homeStats.form.slice(0, 3).filter((r) => r === "W").length >= 2) {
      reasoning += `${homeTeam} has won at least 2 of their last 3 matches. `
    }

    if (homeStats.goalsFor / homeStats.played > awayStats.goalsFor / awayStats.played) {
      reasoning += `${homeTeam} scores more goals per game than ${awayTeam}. `
    }

    if (awayStats.form.slice(0, 3).filter((r) => r === "L").length >= 2) {
      reasoning += `${awayTeam} has lost at least 2 of their last 3 matches. `
    }
  } else if (prediction === "away") {
    reasoning = `${awayTeam} (away) appears undervalued with ${valueRating.toFixed(1)}% edge. `

    if (awayStats.form.slice(0, 3).filter((r) => r === "W").length >= 2) {
      reasoning += `${awayTeam} has won at least 2 of their last 3 matches. `
    }

    if (awayStats.goalsFor / awayStats.played > homeStats.goalsFor / homeStats.played) {
      reasoning += `${awayTeam} scores more goals per game than ${homeTeam}. `
    }

    if (homeStats.form.slice(0, 3).filter((r) => r === "L").length >= 2) {
      reasoning += `${homeTeam} has lost at least 2 of their last 3 matches. `
    }
  } else {
    reasoning = `Draw appears undervalued with ${valueRating.toFixed(1)}% edge. `

    const homeDraws = homeStats.form.slice(0, 5).filter((r) => r === "D").length
    const awayDraws = awayStats.form.slice(0, 5).filter((r) => r === "D").length

    if (homeDraws + awayDraws >= 3) {
      reasoning += `Both teams have drawn frequently in recent matches. `
    }

    if (Math.abs(homeStats.goalsFor / homeStats.played - awayStats.goalsFor / awayStats.played) < 0.3) {
      reasoning += `Teams have similar scoring rates. `
    }

    if (Math.abs(homeStats.points - awayStats.points) < 3) {
      reasoning += `Teams are closely matched in the standings. `
    }
  }

  return reasoning
}
