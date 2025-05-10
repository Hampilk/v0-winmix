"use client"

import { useState } from "react"
import { teams } from "@/data/teams"
import { usePrediction, type PredictionInput } from "@/hooks/use-prediction"
import { PredictionForm } from "@/components/prediction/prediction-form"
import { PredictionResults } from "@/components/prediction/prediction-results"
import { PredictionModelInfo } from "@/components/prediction/prediction-model-info"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import type { Team } from "@/types"

export function MatchPredictionSystem() {
  const { generatePrediction, isLoading, error, result, reset } = usePrediction()
  const [selectedTeams, setSelectedTeams] = useState<PredictionInput>({
    homeTeam: null,
    awayTeam: null,
  })

  const handleSubmit = (homeTeam: Team | null, awayTeam: Team | null) => {
    setSelectedTeams({ homeTeam, awayTeam })
    generatePrediction({ homeTeam, awayTeam })
  }

  return (
    <div className="space-y-6">
      <PredictionForm teams={teams} onSubmit={handleSubmit} isLoading={isLoading} />

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && selectedTeams.homeTeam && selectedTeams.awayTeam && (
        <PredictionResults result={result} homeTeam={selectedTeams.homeTeam} awayTeam={selectedTeams.awayTeam} />
      )}

      <PredictionModelInfo />
    </div>
  )
}
