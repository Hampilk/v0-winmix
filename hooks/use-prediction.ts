"use client"

import { useState, useCallback } from "react"
import type { Team } from "@/data/teams"
import type { Pattern } from "@/data/patterns"
import { getHeadToHeadRecord } from "@/data/head-to-head"
import { getTeamHTFTData } from "@/data/htft-data"

export interface PredictionResult {
  homeWinProbability: number
  drawProbability: number
  awayWinProbability: number
  predictedScore: {
    home: number
    away: number
  }
  htftPrediction: {
    ht: "home" | "draw" | "away"
    ft: "home" | "draw" | "away"
    probability: number
  }
  confidence: number
  keyFactors: string[]
  appliedPatterns: Pattern[]
}

export interface PredictionInput {
  homeTeam: Team | null
  awayTeam: Team | null
}

export function usePrediction() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<PredictionResult | null>(null)

  const generatePrediction = useCallback(async (input: PredictionInput) => {
    const { homeTeam, awayTeam } = input

    // Reset state
    setError(null)
    setResult(null)

    // Validate input
    if (!homeTeam || !awayTeam) {
      setError("Both home and away teams must be selected")
      return
    }

    if (homeTeam.id === awayTeam.id) {
      setError("Home and away teams cannot be the same")
      return
    }

    try {
      setIsLoading(true)

      // Simulate API call or complex calculation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Get head-to-head record
      const h2h = getHeadToHeadRecord(homeTeam.id, awayTeam.id)

      // Get HTFT data
      const homeHTFT = getTeamHTFTData(homeTeam.id)
      const awayHTFT = getTeamHTFTData(awayTeam.id)

      if (!homeHTFT || !awayHTFT) {
        throw new Error("HTFT data not found for one or both teams")
      }

      // Calculate base probabilities based on team strength and home advantage
      const homeStrength = homeTeam.strength * homeTeam.homeAdvantage
      const awayStrength = awayTeam.strength
      const totalStrength = homeStrength + awayStrength

      let homeWinProb = (homeStrength / totalStrength) * 100
      let awayWinProb = (awayStrength / totalStrength) * 100

      // Adjust based on form
      const homeFormFactor = calculateFormFactor(homeTeam.form)
      const awayFormFactor = calculateFormFactor(awayTeam.form)

      homeWinProb *= homeFormFactor
      awayWinProb *= awayFormFactor

      // Normalize probabilities
      const totalProb = homeWinProb + awayWinProb
      homeWinProb = (homeWinProb / totalProb) * 90 // Leave 10% for draw
      awayWinProb = (awayWinProb / totalProb) * 90
      const drawProb = 100 - homeWinProb - awayWinProb

      // Predict score
      const homeExpectedGoals = (homeStrength / 20) * homeFormFactor
      const awayExpectedGoals = (awayStrength / 22) * awayFormFactor

      // Round to nearest 0.5 for more realistic scores
      const homeScore = Math.round(homeExpectedGoals * 2) / 2
      const awayScore = Math.round(awayExpectedGoals * 2) / 2

      // Determine HT/FT prediction
      const htftPrediction = predictHTFT(homeHTFT, awayHTFT, homeWinProb, drawProb, awayWinProb)

      // Determine key factors
      const keyFactors = determineKeyFactors(homeTeam, awayTeam, h2h)

      // Determine applicable patterns
      const appliedPatterns = determinePatterns(homeTeam, awayTeam)

      // Calculate confidence level
      const confidence = calculateConfidence(homeTeam, awayTeam, h2h)

      // Create prediction result
      const prediction: PredictionResult = {
        homeWinProbability: Number.parseFloat(homeWinProb.toFixed(1)),
        drawProbability: Number.parseFloat(drawProb.toFixed(1)),
        awayWinProbability: Number.parseFloat(awayWinProb.toFixed(1)),
        predictedScore: {
          home: homeScore,
          away: awayScore,
        },
        htftPrediction,
        confidence,
        keyFactors,
        appliedPatterns,
      }

      setResult(prediction)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    generatePrediction,
    isLoading,
    error,
    result,
    reset: () => {
      setResult(null)
      setError(null)
    },
  }
}

// Helper functions
function calculateFormFactor(form: string[]): number {
  if (!form.length) return 1

  let factor = 1
  // More recent matches have higher weight
  const weights = [0.35, 0.25, 0.2, 0.15, 0.05]

  form.slice(0, 5).forEach((result, index) => {
    const weight = weights[index] || 0.05
    if (result === "W") factor += weight * 0.1
    else if (result === "D") factor += 0
    else if (result === "L") factor -= weight * 0.1
  })

  return factor
}

function predictHTFT(
  homeHTFT: any,
  awayHTFT: any,
  homeWinProb: number,
  drawProb: number,
  awayWinProb: number,
): { ht: "home" | "draw" | "away"; ft: "home" | "draw" | "away"; probability: number } {
  // Determine most likely HT result
  let htResult: "home" | "draw" | "away"
  if (homeWinProb > drawProb && homeWinProb > awayWinProb) {
    htResult = "home"
  } else if (awayWinProb > homeWinProb && awayWinProb > drawProb) {
    htResult = "away"
  } else {
    htResult = "draw"
  }

  // Determine most likely FT result based on HT result
  let ftResult: "home" | "draw" | "away"
  let probability: number

  if (htResult === "home") {
    // Use home team's HTFT data
    const { htWin_ftWin, htWin_ftDraw, htWin_ftLoss } = homeHTFT.data
    const total = htWin_ftWin + htWin_ftDraw + htWin_ftLoss

    if (htWin_ftWin > htWin_ftDraw && htWin_ftWin > htWin_ftLoss) {
      ftResult = "home"
      probability = (htWin_ftWin / total) * 100
    } else if (htWin_ftDraw > htWin_ftWin && htWin_ftDraw > htWin_ftLoss) {
      ftResult = "draw"
      probability = (htWin_ftDraw / total) * 100
    } else {
      ftResult = "away"
      probability = (htWin_ftLoss / total) * 100
    }
  } else if (htResult === "away") {
    // Use away team's HTFT data (reversed)
    const { htWin_ftWin, htWin_ftDraw, htWin_ftLoss } = awayHTFT.data
    const total = htWin_ftWin + htWin_ftDraw + htWin_ftLoss

    if (htWin_ftWin > htWin_ftDraw && htWin_ftWin > htWin_ftLoss) {
      ftResult = "away"
      probability = (htWin_ftWin / total) * 100
    } else if (htWin_ftDraw > htWin_ftWin && htWin_ftDraw > htWin_ftLoss) {
      ftResult = "draw"
      probability = (htWin_ftDraw / total) * 100
    } else {
      ftResult = "home"
      probability = (htWin_ftLoss / total) * 100
    }
  } else {
    // HT is a draw, use average of both teams' draw data
    const homeDraw = homeHTFT.data
    const awayDraw = awayHTFT.data

    const homeTotal = homeDraw.htDraw_ftWin + homeDraw.htDraw_ftDraw + homeDraw.htDraw_ftLoss
    const awayTotal = awayDraw.htDraw_ftWin + awayDraw.htDraw_ftDraw + awayDraw.htDraw_ftLoss

    const homeWinProb = homeDraw.htDraw_ftWin / homeTotal
    const homeDrawProb = homeDraw.htDraw_ftDraw / homeTotal
    const homeLossProb = homeDraw.htDraw_ftLoss / homeTotal

    const awayWinProb = awayDraw.htDraw_ftLoss / awayTotal // Reversed for away team
    const awayDrawProb = awayDraw.htDraw_ftDraw / awayTotal
    const awayLossProb = awayDraw.htDraw_ftWin / awayTotal // Reversed for away team

    const avgHomeWinProb = (homeWinProb + awayLossProb) / 2
    const avgDrawProb = (homeDrawProb + awayDrawProb) / 2
    const avgAwayWinProb = (homeLossProb + awayWinProb) / 2

    if (avgHomeWinProb > avgDrawProb && avgHomeWinProb > avgAwayWinProb) {
      ftResult = "home"
      probability = avgHomeWinProb * 100
    } else if (avgAwayWinProb > avgHomeWinProb && avgAwayWinProb > avgDrawProb) {
      ftResult = "away"
      probability = avgAwayWinProb * 100
    } else {
      ftResult = "draw"
      probability = avgDrawProb * 100
    }
  }

  return {
    ht: htResult,
    ft: ftResult,
    probability: Number.parseFloat(probability.toFixed(1)),
  }
}

function determineKeyFactors(homeTeam: Team, awayTeam: Team, h2h: any): string[] {
  const factors: string[] = []

  // Form-based factors
  const homeFormFactor = calculateFormFactor(homeTeam.form)
  const awayFormFactor = calculateFormFactor(awayTeam.form)

  if (homeFormFactor > 1.1) {
    factors.push(`${homeTeam.name} is in excellent form`)
  } else if (homeFormFactor < 0.9) {
    factors.push(`${homeTeam.name} is in poor form`)
  }

  if (awayFormFactor > 1.1) {
    factors.push(`${awayTeam.name} is in excellent form`)
  } else if (awayFormFactor < 0.9) {
    factors.push(`${awayTeam.name} is in poor form`)
  }

  // Strength difference
  const strengthDiff = homeTeam.strength - awayTeam.strength
  if (Math.abs(strengthDiff) > 5) {
    factors.push(`${strengthDiff > 0 ? homeTeam.name : awayTeam.name} has a significant strength advantage`)
  }

  // Home advantage
  if (homeTeam.homeAdvantage > 1.15) {
    factors.push(`${homeTeam.name} has a strong home advantage`)
  }

  // Head-to-head record
  if (h2h && h2h.matches.length > 0) {
    let homeWins = 0
    let awayWins = 0
    let draws = 0

    h2h.matches.forEach((match: any) => {
      if (match.homeTeamId === homeTeam.id) {
        if (match.homeScore > match.awayScore) homeWins++
        else if (match.homeScore < match.awayScore) awayWins++
        else draws++
      } else {
        if (match.homeScore > match.awayScore) awayWins++
        else if (match.homeScore < match.awayScore) homeWins++
        else draws++
      }
    })

    if (homeWins > awayWins + draws) {
      factors.push(`${homeTeam.name} has a favorable head-to-head record`)
    } else if (awayWins > homeWins + draws) {
      factors.push(`${awayTeam.name} has a favorable head-to-head record`)
    } else if (draws > homeWins && draws > awayWins) {
      factors.push("Teams have drawn frequently in recent meetings")
    }
  }

  return factors
}

import { patterns } from "@/data/patterns"

function determinePatterns(homeTeam: Team, awayTeam: Team): Pattern[] {
  // This would typically involve complex pattern matching logic
  // For this example, we'll return a simplified version

  // Randomly select 1-3 applicable patterns
  const numPatterns = Math.floor(Math.random() * 3) + 1
  const shuffled = [...patterns].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, numPatterns)
}

function calculateConfidence(homeTeam: Team, awayTeam: Team, h2h: any): number {
  // Base confidence
  let confidence = 70

  // Adjust based on team strength difference
  const strengthDiff = Math.abs(homeTeam.strength - awayTeam.strength)
  if (strengthDiff > 10) {
    confidence += 10 // More confident when teams are mismatched
  } else if (strengthDiff < 3) {
    confidence -= 10 // Less confident when teams are evenly matched
  }

  // Adjust based on form consistency
  const homeFormConsistency = calculateFormConsistency(homeTeam.form)
  const awayFormConsistency = calculateFormConsistency(awayTeam.form)

  confidence += (homeFormConsistency + awayFormConsistency) / 2

  // Adjust based on head-to-head data availability
  if (h2h && h2h.matches.length > 2) {
    confidence += 5 // More confident with more h2h data
  } else if (!h2h || h2h.matches.length === 0) {
    confidence -= 5 // Less confident with no h2h data
  }

  // Ensure confidence is within 0-100 range
  return Math.min(Math.max(confidence, 0), 100)
}

function calculateFormConsistency(form: string[]): number {
  if (form.length < 3) return 0

  // Check if all recent results are the same
  const recentForm = form.slice(0, 3)
  const allSame = recentForm.every((result) => result === recentForm[0])

  if (allSame) return 5 // Consistent form gives more confidence

  // Check if form is highly variable
  const hasWin = recentForm.includes("W")
  const hasLoss = recentForm.includes("L")
  const hasDraw = recentForm.includes("D")

  if (hasWin && hasLoss && hasDraw) return -5 // Inconsistent form reduces confidence

  return 0
}
