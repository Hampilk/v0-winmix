"use server"

import type { Pattern, PatternResult } from "@/types/pattern"

// Mock data for development
const mockPatterns: Pattern[] = [
  {
    id: "pat1",
    name: "High Press",
    description: "Aggressive pressing in opponent half",
    type: "defensive",
    complexity: "high",
    nodes: [
      { id: "n1", x: 100, y: 100, label: "Striker", type: "player" },
      { id: "n2", x: 150, y: 150, label: "Midfielder", type: "player" },
    ],
    connections: [{ id: "c1", source: "n1", target: "n2", label: "Press", type: "movement" }],
    createdAt: "2023-01-15T12:00:00Z",
    updatedAt: "2023-02-20T14:30:00Z",
  },
  {
    id: "pat2",
    name: "Counter Attack",
    description: "Quick transition from defense to attack",
    type: "offensive",
    complexity: "medium",
    nodes: [
      { id: "n1", x: 100, y: 100, label: "Defender", type: "player" },
      { id: "n2", x: 200, y: 100, label: "Midfielder", type: "player" },
      { id: "n3", x: 300, y: 100, label: "Forward", type: "player" },
    ],
    connections: [
      { id: "c1", source: "n1", target: "n2", label: "Pass", type: "pass" },
      { id: "c2", source: "n2", target: "n3", label: "Through Ball", type: "pass" },
    ],
    createdAt: "2023-02-10T10:15:00Z",
    updatedAt: "2023-03-05T09:45:00Z",
  },
]

export async function fetchPatterns(): Promise<Pattern[]> {
  // In a real app, this would fetch from an API
  return mockPatterns
}

export async function fetchPatternById(id: string): Promise<Pattern> {
  // In a real app, this would fetch from an API
  const pattern = mockPatterns.find((p) => p.id === id)
  if (!pattern) {
    throw new Error(`Pattern with ID ${id} not found`)
  }
  return pattern
}

export async function savePattern(pattern: Pattern): Promise<Pattern> {
  // In a real app, this would send a POST or PUT request to an API
  if (!pattern.id) {
    // Create new pattern
    const newPattern = {
      ...pattern,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    return newPattern
  } else {
    // Update existing pattern
    return {
      ...pattern,
      updatedAt: new Date().toISOString(),
    }
  }
}

export async function deletePattern(id: string): Promise<void> {
  // In a real app, this would send a DELETE request to an API
  // Just a mock implementation for now
  return Promise.resolve()
}

export async function applyPattern(patternId: string): Promise<PatternResult[]> {
  // In a real app, this would send a request to apply the pattern and get results
  // Mock data for development
  return [
    {
      id: "res1",
      patternId,
      matchId: "m1",
      homeTeam: "Team A",
      awayTeam: "Team B",
      date: "2023-04-15T15:00:00Z",
      occurrences: 5,
      successRate: 0.8,
      leadToGoal: 1,
      leadToShot: 3,
    },
    {
      id: "res2",
      patternId,
      matchId: "m2",
      homeTeam: "Team C",
      awayTeam: "Team D",
      date: "2023-04-16T15:00:00Z",
      occurrences: 3,
      successRate: 0.67,
      leadToGoal: 0,
      leadToShot: 2,
    },
  ]
}
