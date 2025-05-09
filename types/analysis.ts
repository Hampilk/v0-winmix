export interface AnalysisFilters {
  leagueId: string
  seasonId: string
  teamId: string
  dateRange: string
}

export interface AnalysisData {
  predictions: {
    id: string
    matchId: string
    homeTeam: string
    awayTeam: string
    date: string
    homeWinProbability: number
    drawProbability: number
    awayWinProbability: number
    predictedScore: string
    confidence: number
  }[]
  predictionAccuracy: {
    overall: number
    homeWins: number
    draws: number
    awayWins: number
    history: {
      date: string
      accuracy: number
    }[]
  }
  teamPerformance: {
    id: string
    name: string
    attack: number
    defense: number
    form: string[]
    xG: number
    xGA: number
  }[]
  teamTrends: {
    teamId: string
    data: {
      date: string
      attack: number
      defense: number
    }[]
  }[]
  playerAnalysis: {
    id: string
    name: string
    teamId: string
    position: string
    form: number
    goals: number
    assists: number
    minutesPlayed: number
  }[]
  playerStatistics: {
    topScorers: {
      playerId: string
      name: string
      team: string
      goals: number
    }[]
    topAssists: {
      playerId: string
      name: string
      team: string
      assists: number
    }[]
    bestRated: {
      playerId: string
      name: string
      team: string
      rating: number
    }[]
  }
}
