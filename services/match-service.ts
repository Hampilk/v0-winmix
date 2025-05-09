"use server"

import type { Match } from "@/types/match"

// Mock data for development
const mockMatches: Match[] = [
  {
    id: "m1",
    leagueId: "1",
    seasonId: "s1",
    date: "2023-05-21T15:00:00Z",
    homeTeamId: "t1",
    homeTeam: "Team A",
    awayTeamId: "t2",
    awayTeam: "Team B",
    homeScore: 2,
    awayScore: 1,
    status: "completed",
    venue: "Stadium A",
  },
  {
    id: "m2",
    leagueId: "1",
    seasonId: "s1",
    date: "2023-05-20T15:00:00Z",
    homeTeamId: "t3",
    homeTeam: "Team C",
    awayTeamId: "t4",
    awayTeam: "Team D",
    homeScore: 0,
    awayScore: 0,
    status: "completed",
    venue: "Stadium C",
  },
  {
    id: "m3",
    leagueId: "2",
    seasonId: "s3",
    date: "2023-05-22T15:00:00Z",
    homeTeamId: "t5",
    homeTeam: "Team E",
    awayTeamId: "t6",
    awayTeam: "Team F",
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    venue: "Stadium E",
  },
]

export async function fetchMatches(): Promise<Match[]> {
  // In a real app, this would fetch from an API
  return mockMatches
}

export async function fetchMatchById(id: string): Promise<Match> {
  // In a real app, this would fetch from an API
  const match = mockMatches.find((m) => m.id === id)
  if (!match) {
    throw new Error(`Match with ID ${id} not found`)
  }
  return match
}

export async function createMatch(match: Omit<Match, "id">): Promise<Match> {
  // In a real app, this would send a POST request to an API
  const newMatch = {
    ...match,
    id: Math.random().toString(36).substring(2, 9),
  }
  return newMatch as Match
}

export async function updateMatch(id: string, match: Partial<Match>): Promise<Match> {
  // In a real app, this would send a PUT request to an API
  const existingMatch = await fetchMatchById(id)
  return {
    ...existingMatch,
    ...match,
  }
}

export async function fetchLeagues() {
  // In a real app, this would fetch from an API
  return [
    { id: "1", name: "Premier League" },
    { id: "2", name: "La Liga" },
  ]
}

export async function fetchSeasons(leagueId: string) {
  // In a real app, this would fetch from an API based on the leagueId
  if (leagueId === "1") {
    return [
      { id: "s1", name: "2023/2024" },
      { id: "s2", name: "2022/2023" },
    ]
  } else if (leagueId === "2") {
    return [
      { id: "s3", name: "2023/2024" },
      { id: "s4", name: "2022/2023" },
    ]
  }
  return []
}

export async function fetchTeams(leagueId: string, seasonId: string) {
  // In a real app, this would fetch from an API based on the leagueId and seasonId
  return [
    { id: "t1", name: "Team A" },
    { id: "t2", name: "Team B" },
    { id: "t3", name: "Team C" },
    { id: "t4", name: "Team D" },
  ]
}
