export interface League {
  id: string
  name: string
  description: string
  sportType: string
  status: "active" | "inactive" | "archived"
  seasons: LeagueSeason[]
}

export interface LeagueSeason {
  id: string
  name: string
  year: number
  startDate?: string
  endDate?: string
  status?: "upcoming" | "active" | "completed"
}

export interface LeagueAnalytics {
  performanceData: {
    date: string
    homeWins: number
    awayWins: number
    draws: number
  }[]
  playerStats: {
    id: string
    name: string
    team: string
    goals: number
    assists: number
    rating: number
  }[]
  teamComparison: {
    id: string
    name: string
    attack: number
    defense: number
    possession: number
  }[]
}

export interface LeagueStats {
  overview: {
    totalMatches: number
    goalsScored: number
    avgGoalsPerMatch: number
    homeWins: number
    awayWins: number
    draws: number
  }
  standings: {
    position: number
    team: string
    played: number
    won: number
    drawn: number
    lost: number
    gf: number
    ga: number
    gd: number
    points: number
  }[]
  topScorers: {
    player: string
    team: string
    goals: number
    assists: number
  }[]
  recentResults: {
    date: string
    homeTeam: string
    awayTeam: string
    score: string
  }[]
}
