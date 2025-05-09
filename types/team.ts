export interface Team {
  id: string
  name: string
  shortName: string
  logo?: string
  stadium?: string
  manager?: string
  founded?: number
}

export interface TeamForm {
  id: string
  name: string
  position: number
  prevPosition?: number
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
  recentForm?: Array<"W" | "D" | "L">
}

export interface TeamStanding {
  id: string
  name: string
  position: number
  prevPosition?: number
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
}
