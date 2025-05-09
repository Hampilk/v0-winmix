"use server"

import type { League, LeagueAnalytics, LeagueStats } from "@/types/league"

// Mock data for development
const mockLeagues: League[] = [
  {
    id: "1",
    name: "Premier League",
    description: "English top division football league",
    sportType: "soccer",
    status: "active",
    seasons: [
      { id: "s1", name: "2023/2024", year: 2023 },
      { id: "s2", name: "2022/2023", year: 2022 },
    ],
  },
  {
    id: "2",
    name: "La Liga",
    description: "Spanish top division football league",
    sportType: "soccer",
    status: "active",
    seasons: [
      { id: "s3", name: "2023/2024", year: 2023 },
      { id: "s4", name: "2022/2023", year: 2022 },
    ],
  },
]

export async function fetchLeagues(): Promise<League[]> {
  // In a real app, this would fetch from an API
  return mockLeagues
}

export async function fetchLeagueById(id: string): Promise<League> {
  // In a real app, this would fetch from an API
  const league = mockLeagues.find((l) => l.id === id)
  if (!league) {
    throw new Error(`League with ID ${id} not found`)
  }
  return league
}

export async function createLeague(league: League): Promise<League> {
  // In a real app, this would send a POST request to an API
  const newLeague = {
    ...league,
    id: Math.random().toString(36).substring(2, 9),
  }
  return newLeague
}

export async function updateLeague(id: string, league: League): Promise<League> {
  // In a real app, this would send a PUT request to an API
  return {
    ...league,
    id,
  }
}

export async function fetchLeagueAnalytics(leagueId: string, seasonId: string): Promise<LeagueAnalytics> {
  // Mock analytics data
  return {
    performanceData: [
      { date: "2023-01", homeWins: 30, awayWins: 15, draws: 10 },
      { date: "2023-02", homeWins: 28, awayWins: 18, draws: 9 },
      { date: "2023-03", homeWins: 25, awayWins: 20, draws: 10 },
    ],
    playerStats: [
      { id: "p1", name: "John Doe", team: "Team A", goals: 15, assists: 7, rating: 8.5 },
      { id: "p2", name: "Jane Smith", team: "Team B", goals: 12, assists: 10, rating: 8.3 },
      { id: "p3", name: "Bob Johnson", team: "Team C", goals: 10, assists: 5, rating: 7.9 },
    ],
    teamComparison: [
      { id: "t1", name: "Team A", attack: 85, defense: 75, possession: 60 },
      { id: "t2", name: "Team B", attack: 80, defense: 80, possession: 55 },
      { id: "t3", name: "Team C", attack: 70, defense: 85, possession: 50 },
    ],
  }
}

export async function fetchLeagueStats(leagueId: string, seasonId: string): Promise<LeagueStats> {
  // Mock stats data
  return {
    overview: {
      totalMatches: 380,
      goalsScored: 1024,
      avgGoalsPerMatch: 2.7,
      homeWins: 180,
      awayWins: 120,
      draws: 80,
    },
    standings: [
      { position: 1, team: "Team A", played: 38, won: 28, drawn: 6, lost: 4, gf: 85, ga: 25, gd: 60, points: 90 },
      { position: 2, team: "Team B", played: 38, won: 25, drawn: 8, lost: 5, gf: 75, ga: 30, gd: 45, points: 83 },
      { position: 3, team: "Team C", played: 38, won: 22, drawn: 10, lost: 6, gf: 70, ga: 35, gd: 35, points: 76 },
    ],
    topScorers: [
      { player: "John Doe", team: "Team A", goals: 25, assists: 10 },
      { player: "Jane Smith", team: "Team B", goals: 22, assists: 8 },
      { player: "Bob Johnson", team: "Team C", goals: 20, assists: 12 },
    ],
    recentResults: [
      { date: "2023-05-21", homeTeam: "Team A", awayTeam: "Team B", score: "2-1" },
      { date: "2023-05-20", homeTeam: "Team C", awayTeam: "Team D", score: "0-0" },
      { date: "2023-05-19", homeTeam: "Team E", awayTeam: "Team F", score: "3-2" },
    ],
  }
}
