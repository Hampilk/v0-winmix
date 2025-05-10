export interface HeadToHeadRecord {
  team1Id: string
  team2Id: string
  matches: {
    date: string
    homeTeamId: string
    homeScore: number
    awayScore: number
    awayTeamId: string
  }[]
}

export const headToHeadRecords: Record<string, HeadToHeadRecord> = {
  "team1-team2": {
    team1Id: "team1",
    team2Id: "team2",
    matches: [
      {
        date: "2023-01-15",
        homeTeamId: "team1",
        homeScore: 2,
        awayScore: 1,
        awayTeamId: "team2",
      },
      {
        date: "2022-08-22",
        homeTeamId: "team2",
        homeScore: 2,
        awayScore: 1,
        awayTeamId: "team1",
      },
      {
        date: "2022-03-05",
        homeTeamId: "team1",
        homeScore: 0,
        awayScore: 0,
        awayTeamId: "team2",
      },
    ],
  },
  "team1-team3": {
    team1Id: "team1",
    team2Id: "team3",
    matches: [
      {
        date: "2023-02-12",
        homeTeamId: "team3",
        homeScore: 3,
        awayScore: 1,
        awayTeamId: "team1",
      },
      {
        date: "2022-09-10",
        homeTeamId: "team1",
        homeScore: 1,
        awayScore: 2,
        awayTeamId: "team3",
      },
    ],
  },
  // Add more head-to-head records as needed
}

export function getHeadToHeadKey(team1Id: string, team2Id: string): string {
  // Ensure consistent key format regardless of team order
  return team1Id < team2Id ? `${team1Id}-${team2Id}` : `${team2Id}-${team1Id}`
}

export function getHeadToHeadRecord(team1Id: string, team2Id: string): HeadToHeadRecord | null {
  const key = getHeadToHeadKey(team1Id, team2Id)
  return headToHeadRecords[key] || null
}
