"use server"

import type { AnalysisData, AnalysisFilters } from "@/types/analysis"

export async function fetchAnalysisData(filters: AnalysisFilters, forceRefresh = false): Promise<AnalysisData> {
  // In a real app, this would fetch from an API with the provided filters
  // and potentially force a refresh of the data if requested

  // Mock data for development
  return {
    predictions: [
      {
        id: "p1",
        matchId: "m1",
        homeTeam: "Team A",
        awayTeam: "Team B",
        date: "2023-06-01T15:00:00Z",
        homeWinProbability: 0.45,
        drawProbability: 0.25,
        awayWinProbability: 0.3,
        predictedScore: "2-1",
        confidence: 0.75,
      },
      {
        id: "p2",
        matchId: "m2",
        homeTeam: "Team C",
        awayTeam: "Team D",
        date: "2023-06-02T15:00:00Z",
        homeWinProbability: 0.35,
        drawProbability: 0.4,
        awayWinProbability: 0.25,
        predictedScore: "1-1",
        confidence: 0.65,
      },
    ],
    predictionAccuracy: {
      overall: 0.72,
      homeWins: 0.75,
      draws: 0.6,
      awayWins: 0.7,
      history: [
        { date: "2023-01", accuracy: 0.68 },
        { date: "2023-02", accuracy: 0.7 },
        { date: "2023-03", accuracy: 0.72 },
      ],
    },
    teamPerformance: [
      {
        id: "t1",
        name: "Team A",
        attack: 85,
        defense: 75,
        form: ["W", "W", "D", "W", "L"],
        xG: 2.3,
        xGA: 1.1,
      },
      {
        id: "t2",
        name: "Team B",
        attack: 80,
        defense: 80,
        form: ["W", "L", "W", "D", "W"],
        xG: 2.1,
        xGA: 1.0,
      },
    ],
    teamTrends: [
      {
        teamId: "t1",
        data: [
          { date: "2023-01", attack: 80, defense: 70 },
          { date: "2023-02", attack: 82, defense: 72 },
          { date: "2023-03", attack: 85, defense: 75 },
        ],
      },
      {
        teamId: "t2",
        data: [
          { date: "2023-01", attack: 75, defense: 78 },
          { date: "2023-02", attack: 78, defense: 79 },
          { date: "2023-03", attack: 80, defense: 80 },
        ],
      },
    ],
    playerAnalysis: [
      {
        id: "p1",
        name: "John Doe",
        teamId: "t1",
        position: "Forward",
        form: 8.5,
        goals: 15,
        assists: 7,
        minutesPlayed: 1800,
      },
      {
        id: "p2",
        name: "Jane Smith",
        teamId: "t2",
        position: "Midfielder",
        form: 8.3,
        goals: 8,
        assists: 12,
        minutesPlayed: 1750,
      },
    ],
    playerStatistics: {
      topScorers: [
        { playerId: "p1", name: "John Doe", team: "Team A", goals: 15 },
        { playerId: "p3", name: "Bob Johnson", team: "Team C", goals: 12 },
      ],
      topAssists: [
        { playerId: "p2", name: "Jane Smith", team: "Team B", assists: 12 },
        { playerId: "p4", name: "Alice Brown", team: "Team D", assists: 10 },
      ],
      bestRated: [
        { playerId: "p1", name: "John Doe", team: "Team A", rating: 8.5 },
        { playerId: "p2", name: "Jane Smith", team: "Team B", rating: 8.3 },
      ],
    },
  }
}
