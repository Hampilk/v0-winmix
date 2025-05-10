export interface League {
  id: string
  name: string
  description: string
  sportType: string
  country?: string
  status: "active" | "inactive" | "completed" | "upcoming" | "cancelled"
  seasons?: LeagueSeason[]
}

export interface LeagueSeason {
  id: string
  name: string
  year: number
  startDate?: string
  endDate?: string
  status?: "active" | "upcoming" | "completed" | "cancelled"
  matchCount?: number
  matchesPlayed?: number
  teams?: number
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

export interface Match {
  id: string
  leagueId: string
  seasonId: string
  date: string
  homeTeamId: string
  homeTeam: string
  awayTeamId: string
  awayTeam: string
  homeScore: number | null
  awayScore: number | null
  status: "scheduled" | "live" | "completed" | "postponed" | "cancelled"
  venue: string
  referee?: string
  attendance?: number
  weather?: string
  notes?: string
  odds?: {
    home: number
    draw: number
    away: number
  }
}

export interface Team {
  id: string
  name: string
  shortName: string
  logo?: string
  stadium?: string
  manager?: string
  founded?: number
}
