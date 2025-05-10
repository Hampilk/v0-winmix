import type { Match, Team } from "@/types/league"

export interface TeamStats {
  teamId: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
  form: string[]
}

export interface LeagueStandingsResult {
  standings: TeamStats[]
  error?: string
}

/**
 * Calculates league standings based on match results
 * @param matches Array of match results
 * @param teams Array of teams in the league
 * @returns Object containing standings array and optional error
 */
export function calculateLeagueStandings(matches: Match[], teams: Team[]): LeagueStandingsResult {
  if (!matches || !Array.isArray(matches)) {
    return {
      standings: [],
      error: "Invalid matches data",
    }
  }

  if (!teams || !Array.isArray(teams)) {
    return {
      standings: [],
      error: "Invalid teams data",
    }
  }

  try {
    // Initialize stats for each team
    const statsMap = new Map<string, TeamStats>()

    teams.forEach((team) => {
      statsMap.set(team.id, {
        teamId: team.id,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
        form: [],
      })
    })

    // Process completed matches
    const completedMatches = matches.filter(
      (match) => match.status === "completed" && match.homeScore !== null && match.awayScore !== null,
    )

    // Sort matches by date (newest first) for form calculation
    const sortedMatches = [...completedMatches].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Process each match
    sortedMatches.forEach((match) => {
      const homeTeamStats = statsMap.get(match.homeTeamId)
      const awayTeamStats = statsMap.get(match.awayTeamId)

      if (!homeTeamStats || !awayTeamStats) {
        return // Skip if team not found
      }

      const homeScore = match.homeScore as number
      const awayScore = match.awayScore as number

      // Update home team stats
      homeTeamStats.played += 1
      homeTeamStats.goalsFor += homeScore
      homeTeamStats.goalsAgainst += awayScore

      // Update away team stats
      awayTeamStats.played += 1
      awayTeamStats.goalsFor += awayScore
      awayTeamStats.goalsAgainst += homeScore

      // Determine match result
      if (homeScore > awayScore) {
        // Home win
        homeTeamStats.won += 1
        homeTeamStats.points += 3
        homeTeamStats.form.unshift("W")

        awayTeamStats.lost += 1
        awayTeamStats.form.unshift("L")
      } else if (homeScore < awayScore) {
        // Away win
        homeTeamStats.lost += 1
        homeTeamStats.form.unshift("L")

        awayTeamStats.won += 1
        awayTeamStats.points += 3
        awayTeamStats.form.unshift("W")
      } else {
        // Draw
        homeTeamStats.drawn += 1
        homeTeamStats.points += 1
        homeTeamStats.form.unshift("D")

        awayTeamStats.drawn += 1
        awayTeamStats.points += 1
        awayTeamStats.form.unshift("D")
      }

      // Limit form to last 5 matches
      homeTeamStats.form = homeTeamStats.form.slice(0, 5)
      awayTeamStats.form = awayTeamStats.form.slice(0, 5)

      // Update goal difference
      homeTeamStats.goalDifference = homeTeamStats.goalsFor - homeTeamStats.goalsAgainst
      awayTeamStats.goalDifference = awayTeamStats.goalsFor - awayTeamStats.goalsAgainst
    })

    // Convert map to array and sort
    const standings = Array.from(statsMap.values()).sort((a, b) => {
      // Sort by points (descending)
      if (a.points !== b.points) {
        return b.points - a.points
      }

      // Then by goal difference (descending)
      if (a.goalDifference !== b.goalDifference) {
        return b.goalDifference - a.goalDifference
      }

      // Then by goals scored (descending)
      if (a.goalsFor !== b.goalsFor) {
        return b.goalsFor - a.goalsFor
      }

      // Then alphabetically by team ID
      return a.teamId.localeCompare(b.teamId)
    })

    return { standings }
  } catch (error) {
    console.error("Error calculating league standings:", error)
    return {
      standings: [],
      error: "Failed to calculate league standings",
    }
  }
}

export interface LeagueOverviewStats {
  totalMatches: number
  completedMatches: number
  totalGoals: number
  averageGoalsPerMatch: number
  homeWins: number
  awayWins: number
  draws: number
  cleanSheets: number
  highestScoringMatch: {
    match: Match | null
    goals: number
  }
}

/**
 * Calculates overview statistics for a league
 * @param matches Array of match results
 * @returns Overview statistics object
 */
export function calculateLeagueOverview(matches: Match[]): LeagueOverviewStats {
  if (!matches || !Array.isArray(matches)) {
    throw new Error("Invalid matches data")
  }

  try {
    const completedMatches = matches.filter(
      (match) => match.status === "completed" && match.homeScore !== null && match.awayScore !== null,
    )

    let totalGoals = 0
    let homeWins = 0
    let awayWins = 0
    let draws = 0
    let cleanSheets = 0
    let highestGoals = 0
    let highestScoringMatch: Match | null = null

    completedMatches.forEach((match) => {
      const homeScore = match.homeScore as number
      const awayScore = match.awayScore as number
      const matchGoals = homeScore + awayScore

      // Add to total goals
      totalGoals += matchGoals

      // Count result types
      if (homeScore > awayScore) {
        homeWins++
      } else if (homeScore < awayScore) {
        awayWins++
      } else {
        draws++
      }

      // Count clean sheets
      if (homeScore === 0 || awayScore === 0) {
        cleanSheets++
      }

      // Check for highest scoring match
      if (matchGoals > highestGoals) {
        highestGoals = matchGoals
        highestScoringMatch = match
      }
    })

    return {
      totalMatches: matches.length,
      completedMatches: completedMatches.length,
      totalGoals,
      averageGoalsPerMatch: completedMatches.length > 0 ? totalGoals / completedMatches.length : 0,
      homeWins,
      awayWins,
      draws,
      cleanSheets,
      highestScoringMatch: {
        match: highestScoringMatch,
        goals: highestGoals,
      },
    }
  } catch (error) {
    console.error("Error calculating league overview:", error)
    throw new Error("Failed to calculate league overview")
  }
}

export interface TeamFormAnalysis {
  teamId: string
  currentForm: string[]
  formRating: number // 0-100 scale
  formTrend: "improving" | "declining" | "stable"
  lastFiveResults: {
    matchId: string
    opponent: string
    result: "W" | "D" | "L"
    score: string
    date: string
  }[]
}

/**
 * Analyzes team form based on recent matches
 * @param teamId Team ID to analyze
 * @param matches Array of match results
 * @param teams Array of teams for reference
 * @returns Team form analysis object
 */
export function analyzeTeamForm(teamId: string, matches: Match[], teams: Team[]): TeamFormAnalysis | null {
  if (!teamId || !matches || !teams) {
    return null
  }

  try {
    // Get team's matches, sorted by date (newest first)
    const teamMatches = matches
      .filter(
        (match) =>
          (match.homeTeamId === teamId || match.awayTeamId === teamId) &&
          match.status === "completed" &&
          match.homeScore !== null &&
          match.awayScore !== null,
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    if (teamMatches.length === 0) {
      return null
    }

    // Get last 5 matches for detailed analysis
    const recentMatches = teamMatches.slice(0, 5)
    const form: string[] = []
    const lastFiveResults: any[] = []

    recentMatches.forEach((match) => {
      const isHome = match.homeTeamId === teamId
      const teamScore = isHome ? match.homeScore : match.awayScore
      const opponentScore = isHome ? match.awayScore : match.homeScore
      const opponentId = isHome ? match.awayTeamId : match.homeTeamId
      const opponent = teams.find((team) => team.id === opponentId)?.name || "Unknown"

      let result: "W" | "D" | "L"
      if (teamScore === opponentScore) {
        result = "D"
      } else if (teamScore > opponentScore) {
        result = "W"
      } else {
        result = "L"
      }

      form.push(result)
      lastFiveResults.push({
        matchId: match.id,
        opponent,
        result,
        score: `${teamScore}-${opponentScore}`,
        date: match.date,
      })
    })

    // Calculate form rating (W=3, D=1, L=0)
    // More recent matches have higher weight
    const weights = [0.35, 0.25, 0.2, 0.15, 0.05]
    let formPoints = 0
    let maxPoints = 0

    form.forEach((result, index) => {
      const weight = index < weights.length ? weights[index] : 0
      maxPoints += weight * 3

      if (result === "W") formPoints += weight * 3
      else if (result === "D") formPoints += weight * 1
    })

    const formRating = maxPoints > 0 ? (formPoints / maxPoints) * 100 : 0

    // Determine form trend
    let formTrend: "improving" | "declining" | "stable" = "stable"
    if (form.length >= 3) {
      const recentForm = form.slice(0, 3)
      const olderForm = form.slice(Math.max(0, form.length - 3))

      const recentPoints = recentForm.reduce((sum, result) => {
        return sum + (result === "W" ? 3 : result === "D" ? 1 : 0)
      }, 0)

      const olderPoints = olderForm.reduce((sum, result) => {
        return sum + (result === "W" ? 3 : result === "D" ? 1 : 0)
      }, 0)

      if (recentPoints > olderPoints) {
        formTrend = "improving"
      } else if (recentPoints < olderPoints) {
        formTrend = "declining"
      }
    }

    return {
      teamId,
      currentForm: form,
      formRating,
      formTrend,
      lastFiveResults,
    }
  } catch (error) {
    console.error("Error analyzing team form:", error)
    return null
  }
}
