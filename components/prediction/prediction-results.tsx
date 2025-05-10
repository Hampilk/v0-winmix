import type { PredictionResult } from "@/hooks/use-prediction"
import type { Team } from "@/data/teams"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Trophy, Scale, Clock, AlertTriangle, TrendingUp, TrendingDown, Minus } from "lucide-react"

interface PredictionResultsProps {
  result: PredictionResult
  homeTeam: Team
  awayTeam: Team
}

export function PredictionResults({ result, homeTeam, awayTeam }: PredictionResultsProps) {
  const {
    homeWinProbability,
    drawProbability,
    awayWinProbability,
    predictedScore,
    htftPrediction,
    confidence,
    keyFactors,
    appliedPatterns,
  } = result

  // Determine the most likely outcome
  const mostLikelyOutcome =
    homeWinProbability > drawProbability && homeWinProbability > awayWinProbability
      ? "home"
      : awayWinProbability > homeWinProbability && awayWinProbability > drawProbability
        ? "away"
        : "draw"

  // Format HT/FT prediction text
  const formatHtFt = (result: "home" | "draw" | "away") => {
    if (result === "home") return homeTeam.name
    if (result === "away") return awayTeam.name
    return "Draw"
  }

  // Get confidence level text and color
  const getConfidenceLevel = () => {
    if (confidence >= 80) return { text: "Very High", color: "bg-green-500" }
    if (confidence >= 65) return { text: "High", color: "bg-green-400" }
    if (confidence >= 50) return { text: "Moderate", color: "bg-yellow-400" }
    if (confidence >= 35) return { text: "Low", color: "bg-orange-400" }
    return { text: "Very Low", color: "bg-red-500" }
  }

  const confidenceLevel = getConfidenceLevel()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Match Prediction</CardTitle>
          <CardDescription className="text-center">
            {homeTeam.name} vs {awayTeam.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Outcome probabilities */}
            <Card className="border-0 shadow-none">
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Outcome Probabilities</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{homeTeam.name} Win</span>
                    <span className="text-sm font-medium">{homeWinProbability}%</span>
                  </div>
                  <Progress value={homeWinProbability} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Draw</span>
                    <span className="text-sm font-medium">{drawProbability}%</span>
                  </div>
                  <Progress value={drawProbability} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{awayTeam.name} Win</span>
                    <span className="text-sm font-medium">{awayWinProbability}%</span>
                  </div>
                  <Progress value={awayWinProbability} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Predicted score */}
            <Card className="border-0 shadow-none">
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Predicted Score</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-sm mb-2">{homeTeam.name}</div>
                    <div className="text-4xl font-bold">{predictedScore.home}</div>
                  </div>
                  <div className="mx-4 text-4xl font-light">-</div>
                  <div className="text-center">
                    <div className="text-sm mb-2">{awayTeam.name}</div>
                    <div className="text-4xl font-bold">{predictedScore.away}</div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Badge
                    variant={
                      mostLikelyOutcome === "home"
                        ? "default"
                        : mostLikelyOutcome === "away"
                          ? "destructive"
                          : "outline"
                    }
                    className="px-3 py-1"
                  >
                    {mostLikelyOutcome === "home"
                      ? `${homeTeam.name} Win`
                      : mostLikelyOutcome === "away"
                        ? `${awayTeam.name} Win`
                        : "Draw"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* HT/FT prediction */}
            <Card className="border-0 shadow-none">
              <CardHeader className="p-4">
                <CardTitle className="text-lg">HT/FT Prediction</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="text-sm">Half Time:</span>
                    <span className="ml-auto font-medium">{formatHtFt(htftPrediction.ht)}</span>
                  </div>

                  <div className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="text-sm">Full Time:</span>
                    <span className="ml-auto font-medium">{formatHtFt(htftPrediction.ft)}</span>
                  </div>

                  <div className="flex items-center">
                    <Scale className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="text-sm">Probability:</span>
                    <span className="ml-auto font-medium">{htftPrediction.probability}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-6" />

          {/* Confidence and key factors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Confidence Level</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Prediction Confidence</span>
                    <span className="text-sm font-medium">
                      {confidence}% ({confidenceLevel.text})
                    </span>
                  </div>
                  <Progress value={confidence} className={`h-2 ${confidenceLevel.color}`} />
                </div>

                <div className="text-sm text-muted-foreground mt-2">
                  <AlertTriangle className="h-4 w-4 inline-block mr-1" />
                  <span>
                    {confidence < 50
                      ? "Low confidence prediction. Consider additional factors before betting."
                      : confidence < 70
                        ? "Moderate confidence. Some uncertainty exists in this prediction."
                        : "High confidence prediction based on available data."}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Key Factors</h3>
              <ul className="space-y-2">
                {keyFactors.map((factor, index) => (
                  <li key={index} className="flex items-start">
                    {factor.includes("excellent") || factor.includes("favorable") ? (
                      <TrendingUp className="h-5 w-5 mr-2 text-green-500 shrink-0" />
                    ) : factor.includes("poor") ? (
                      <TrendingDown className="h-5 w-5 mr-2 text-red-500 shrink-0" />
                    ) : (
                      <Minus className="h-5 w-5 mr-2 text-yellow-500 shrink-0" />
                    )}
                    <span className="text-sm">{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="w-full">
            <h3 className="text-lg font-medium mb-4">Applied Patterns</h3>
            <div className="flex flex-wrap gap-2">
              {appliedPatterns.map((pattern) => (
                <Badge key={pattern.id} variant="secondary" className="px-3 py-1">
                  {pattern.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
