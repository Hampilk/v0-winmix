import type { Match, Team } from "@/types/league"
import { analyzeTeamForm } from "./core"

export interface MatchPrediction {
  matchId: string
  homeTeam: string
  awayTeam: string
  homeWinProbability: number
  drawProbability: number
  awayWinProbability: number
  predictedScore: {
    home: number
    away: number
  }
  confidence: number
  keyFactors: string[]
}

export interface PredictionResult {
  predictions: MatchPrediction[]
  error?: string
}

/**
 * Predicts outcomes for upcoming matches
 * @param upcomingMatches Array of upcoming matches
 * @param teams Array of teams
 * @param historicalMatches Array of historical matches for reference
 * @returns Object containing predictions and optional error
 */
export function predictMatchOutcomes(
  upcomingMatches: Match[],
  teams: Team[],
  historicalMatches: Match[],
): PredictionResult {
  if (!upcomingMatches || !teams || !historicalMatches) {
    return {
      predictions: [],
      error: "Invalid input data",
    }
  }

  try {
    // Filter upcoming matches
    const scheduledMatches = upcomingMatches.filter((match) => match.status === "scheduled")

    if (scheduledMatches.length === 0) {
      return {
        predictions: [],
        error: "No upcoming matches found",
      }
    }

    const predictions: MatchPrediction[] = []

    scheduledMatches.forEach((match) => {
      // Get team names
      const homeTeam = teams.find((t) => t.id === match.homeTeamId)?.name || "Unknown"
      const awayTeam = teams.find((t) => t.id === match.awayTeamId)?.name || "Unknown"

      // Analyze team form
      const homeForm = analyzeTeamForm(match.homeTeamId, historicalMatches, teams)
      const awayForm = analyzeTeamForm(match.awayTeamId, historicalMatches, teams)

      if (!homeForm || !awayForm) {
        return // Skip if form analysis failed
      }

      // Calculate head-to-head statistics
      const h2hStats = calculateHeadToHead(match.homeTeamId, match.awayTeamId, historicalMatches)

      // Calculate base probabilities based on form ratings
      let homeWinProb = 0.45 + (homeForm.formRating - awayForm.formRating) / 200
      let awayWinProb = 0.25 + (awayForm.formRating - homeForm.formRating) / 200
      let drawProb = 1 - homeWinProb - awayWinProb

      // Adjust for home advantage
      homeWinProb += 0.1
      awayWinProb -= 0.05
      drawProb -= 0.05

      // Adjust based on head-to-head record
      if (h2hStats.matches > 0) {
        const h2hFactor = 0.1 // Weight of h2h adjustment
        homeWinProb = (1 - h2hFactor) * homeWinProb + h2hFactor * h2hStats.homeWinRate
        drawProb = (1 - h2hFactor) * drawProb + h2hFactor * h2hStats.drawRate
        awayWinProb = (1 - h2hFactor) * awayWinProb + h2hFactor * h2hStats.awayWinRate
      }

      // Ensure probabilities are within bounds and sum to 1
      homeWinProb = Math.max(0.05, Math.min(0.9, homeWinProb))
      awayWinProb = Math.max(0.05, Math.min(0.9, awayWinProb))
      drawProb = Math.max(0.05, Math.min(0.9, drawProb))

      // Normalize probabilities
      const totalProb = homeWinProb + drawProb + awayWinProb
      homeWinProb /= totalProb
      drawProb /= totalProb
      awayWinProb /= totalProb

      // Predict score
      const homeExpectedGoals = predictTeamGoals(match.homeTeamId, match.awayTeamId, true, historicalMatches)
      const awayExpectedGoals = predictTeamGoals(match.awayTeamId, match.homeTeamId, false, historicalMatches)

      // Round to nearest 0.5 for more realistic scores
      const homeScore = Math.round(homeExpectedGoals * 2) / 2
      const awayScore = Math.round(awayExpectedGoals * 2) / 2

      // Determine key factors
      const keyFactors = determineKeyFactors(homeForm, awayForm, h2hStats, homeTeam, awayTeam)

      // Calculate confidence level
      const confidence = calculateConfidence(homeForm, awayForm, h2hStats)

      predictions.push({
        matchId: match.id,
        homeTeam,
        awayTeam,
        homeWinProbability: Number.parseFloat((homeWinProb * 100).toFixed(1)),
        drawProbability: Number.parseFloat((drawProb * 100).toFixed(1)),
        awayWinProbability: Number.parseFloat((awayWinProb * 100).toFixed(1)),
        predictedScore: {
          home: homeScore,
          away: awayScore,
        },
        confidence,
        keyFactors,
      })
    })

    return { predictions }
  } catch (error) {
    console.error("Error predicting match outcomes:", error)
    return {
      predictions: [],
      error: "Failed to predict match outcomes",
    }
  }
}

/**
 * Calculates head-to-head statistics between two teams
 * @param homeTeamId Home team ID
 * @param awayTeamId Away team ID
 * @param matches Array of historical matches
 * @returns Head-to-head statistics
 */
function calculateHeadToHead(
  homeTeamId: string,
  awayTeamId: string,
  matches: Match[],
): {
  matches: number
  homeWins: number
  draws: number
  awayWins: number
  homeWinRate: number
  drawRate: number
  awayWinRate: number
  goalsPerMatch: number
} {
  // Find all matches between these teams
  const h2hMatches = matches.filter(
    (match) =>
      match.status === "completed" &&
      match.homeScore !== null &&
      match.awayScore !== null &&
      ((match.homeTeamId === homeTeamId && match.awayTeamId === awayTeamId) ||
        (match.homeTeamId === awayTeamId && match.awayTeamId === homeTeamId)),
  )

  if (h2hMatches.length === 0) {
    return {
      matches: 0,
      homeWins: 0,
      draws: 0,
      awayWins: 0,
      homeWinRate: 0.4, // Default values
      drawRate: 0.2,
      awayWinRate: 0.4,
      goalsPerMatch: 2.5,
    }
  }

  let homeWins = 0
  let draws = 0
  let awayWins = 0
  let totalGoals = 0

  h2hMatches.forEach((match) => {
    const homeScore = match.homeScore as number
    const awayScore = match.awayScore as number
    totalGoals += homeScore + awayScore

    // Normalize results to current home/away perspective
    if (match.homeTeamId === homeTeamId && match.awayTeamId === awayTeamId) {
      // Match was in same configuration
      if (homeScore > awayScore) homeWins++
      else if (homeScore < awayScore) awayWins++
      else draws++
    } else {
      // Match was in reverse configuration
      if (homeScore > awayScore) awayWins++
      else if (homeScore < awayScore) homeWins++
      else draws++
    }
  })

  return {
    matches: h2hMatches.length,
    homeWins,
    draws,
    awayWins,
    homeWinRate: homeWins / h2hMatches.length,
    drawRate: draws / h2hMatches.length,
    awayWinRate: awayWins / h2hMatches.length,
    goalsPerMatch: totalGoals / h2hMatches.length,
  }
}

/**
 * Predicts goals for a team in an upcoming match
 * @param teamId Team ID
 * @param opponentId Opponent team ID
 * @param isHome Whether the team is playing at home
 * @param matches Array of historical matches
 * @returns Expected goals
 */
function predictTeamGoals(teamId: string, opponentId: string, isHome: boolean, matches: Match[]): number {
  // Get team's recent matches
  const teamMatches = matches
    .filter(
      (match) =>
        match.status === "completed" &&
        match.homeScore !== null &&
        match.awayScore !== null &&
        (match.homeTeamId === teamId || match.awayTeamId === teamId),
    )
    .slice(0, 10) // Last 10 matches

  if (teamMatches.length === 0) {
    return isHome ? 1.5 : 1.2 // Default values
  }

  // Calculate average goals scored
  let totalGoals = 0
  let homeGoals = 0
  let awayGoals = 0
  let homeMatches = 0
  let awayMatches = 0

  teamMatches.forEach((match) => {
    if (match.homeTeamId === teamId) {
      totalGoals += match.homeScore as number
      homeGoals += match.homeScore as number
      homeMatches++
    } else {
      totalGoals += match.awayScore as number
      awayGoals += match.awayScore as number
      awayMatches++
    }
  })

  const avgGoals = totalGoals / teamMatches.length
  const avgHomeGoals = homeMatches > 0 ? homeGoals / homeMatches : avgGoals
  const avgAwayGoals = awayMatches > 0 ? awayGoals / awayMatches : avgGoals

  // Get opponent's recent matches
  const opponentMatches = matches
    .filter(
      (match) =>
        match.status === "completed" &&
        match.homeScore !== null &&
        match.awayScore !== null &&
        (match.homeTeamId === opponentId || match.awayTeamId === opponentId),
    )
    .slice(0, 10) // Last 10 matches

  // Calculate average goals conceded by opponent
  let opponentConceded = 0
  let opponentHomeConceded = 0
  let opponentAwayConceded = 0
  let opponentHomeMatches = 0
  let opponentAwayMatches = 0

  opponentMatches.forEach((match) => {
    if (match.homeTeamId === opponentId) {
      opponentConceded += match.awayScore as number
      opponentHomeConceded += match.awayScore as number
      opponentHomeMatches++
    } else {
      opponentConceded += match.homeScore as number
      opponentAwayConceded += match.homeScore as number
      opponentAwayMatches++
    }
  })

  const avgOpponentConceded = opponentMatches.length > 0 ? opponentConceded / opponentMatches.length : 1.2
  const avgOpponentHomeConceded =
    opponentHomeMatches > 0 ? opponentHomeConceded / opponentHomeMatches : avgOpponentConceded
  const avgOpponentAwayConceded =
    opponentAwayMatches > 0 ? opponentAwayConceded / opponentAwayMatches : avgOpponentConceded

  // Calculate expected goals
  let expectedGoals
  if (isHome) {
    expectedGoals = (avgHomeGoals + avgOpponentAwayConceded) / 2
    expectedGoals *= 1.1 // Home advantage
  } else {
    expectedGoals = (avgAwayGoals + avgOpponentHomeConceded) / 2
    expectedGoals *= 0.9 // Away disadvantage
  }

  // Add some randomness
  const randomFactor = 0.9 + Math.random() * 0.2 // 0.9 to 1.1
  expectedGoals *= randomFactor

  return Math.max(0.5, expectedGoals) // Minimum of 0.5 expected goals
}

/**
 * Determines key factors affecting a match prediction
 * @param homeForm Home team form analysis
 * @param awayForm Away team form analysis
 * @param h2h Head-to-head statistics
 * @param homeTeam Home team name
 * @param awayTeam Away team name
 * @returns Array of key factors
 */
function determineKeyFactors(homeForm: any, awayForm: any, h2h: any, homeTeam: string, awayTeam: string): string[] {
  const factors: string[] = []

  // Form-based factors
  if (homeForm.formRating > 75) {
    factors.push(`${homeTeam} is in excellent form`)
  } else if (homeForm.formRating < 40) {
    factors.push(`${homeTeam} is in poor form`)
  }

  if (awayForm.formRating > 75) {
    factors.push(`${awayTeam} is in excellent form`)
  } else if (awayForm.formRating < 40) {
    factors.push(`${awayTeam} is in poor form`)
  }

  // Form trend factors
  if (homeForm.formTrend === "improving") {
    factors.push(`${homeTeam}'s form is improving`)
  } else if (homeForm.formTrend === "declining") {
    factors.push(`${homeTeam}'s form is declining`)
  }

  if (awayForm.formTrend === "improving") {
    factors.push(`${awayTeam}'s form is improving`)
  } else if (awayForm.formTrend === "declining") {
    factors.push(`${awayTeam}'s form is declining`)
  }

  // Head-to-head factors
  if (h2h.matches > 2) {
    if (h2h.homeWinRate > 0.6) {
      factors.push(`${homeTeam} has a strong head-to-head record against ${awayTeam}`)
    } else if (h2h.awayWinRate > 0.6) {
      factors.push(`${awayTeam} has a strong head-to-head record against ${homeTeam}`)
    } else if (h2h.drawRate > 0.4) {
      factors.push(`${homeTeam} and ${awayTeam} often draw against each other`)
    }

    if (h2h.goalsPerMatch > 3.5) {
      factors.push(`Matches between these teams tend to be high-scoring`)
    } else if (h2h.goalsPerMatch < 1.5) {
      factors.push(`Matches between these teams tend to be low-scoring`)
    }
  }

  return factors.slice(0, 5) // Limit to top 5 factors
}

/**
 * Calculates confidence level for a prediction
 * @param homeForm Home team form analysis
 * @param awayForm Away team form analysis
 * @param h2h Head-to-head statistics
 * @returns Confidence level (0-100)
 */
function calculateConfidence(homeForm: any, awayForm: any, h2h: any): number {
  // Base confidence
  let confidence = 60

  // Adjust based on form consistency
  const homeFormConsistency = homeForm.formTrend === "stable" ? 5 : 0
  const awayFormConsistency = awayForm.formTrend === "stable" ? 5 : 0
  confidence += homeFormConsistency + awayFormConsistency

  // Adjust based on form rating difference
  const formDiff = Math.abs(homeForm.formRating - awayForm.formRating)
  if (formDiff > 30) {
    confidence += 10 // Clear favorite
  } else if (formDiff < 10) {
    confidence -= 5 // Evenly matched
  }

  // Adjust based on head-to-head data
  if (h2h.matches > 3) {
    confidence += 5 // More h2h data increases confidence

    // Clear h2h dominance increases confidence
    if (h2h.homeWinRate > 0.7 || h2h.awayWinRate > 0.7) {
      confidence += 5
    }
  } else if (h2h.matches === 0) {
    confidence -= 5 // No h2h data decreases confidence
  }

  // Ensure confidence is within bounds
  return Math.min(Math.max(confidence, 30), 90)
}
