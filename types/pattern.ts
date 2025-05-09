export interface Pattern {
  id: string
  name: string
  description: string
  type: "offensive" | "defensive" | "transition" | "set-piece"
  complexity: "low" | "medium" | "high"
  nodes: {
    id: string
    x: number
    y: number
    label: string
    type: string
  }[]
  connections: {
    id: string
    source: string
    target: string
    label: string
    type: string
  }[]
  createdAt: string
  updatedAt: string
}

export interface PatternResult {
  id: string
  patternId: string
  matchId: string
  homeTeam: string
  awayTeam: string
  date: string
  occurrences: number
  successRate: number
  leadToGoal: number
  leadToShot: number
}
