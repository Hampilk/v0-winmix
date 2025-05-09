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
}

export interface MatchFilters {
  leagueId: string
  seasonId: string
  teamId: string
  dateFrom: string
  dateTo: string
  status: string
}
