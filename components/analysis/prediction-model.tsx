"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface PredictionModelProps {
  predictions: {
    id: string
    matchId: string
    homeTeam: string
    awayTeam: string
    date: string
    homeWinProbability: number
    drawProbability: number
    awayWinProbability: number
    predictedScore: string
    confidence: number
  }[]
  accuracy: {
    overall: number
    homeWins: number
    draws: number
    awayWins: number
    history: {
      date: string
      accuracy: number
    }[]
  }
}

export default function PredictionModel({ predictions, accuracy }: PredictionModelProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(accuracy.overall * 100).toFixed(1)}%</div>
            <Progress value={accuracy.overall * 100} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Home Win Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(accuracy.homeWins * 100).toFixed(1)}%</div>
            <Progress value={accuracy.homeWins * 100} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Away Win Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(accuracy.awayWins * 100).toFixed(1)}%</div>
            <Progress value={accuracy.awayWins * 100} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Prediction Accuracy Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              config={{
                accuracy: {
                  label: "Accuracy",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={accuracy.history}>
                  <XAxis dataKey="date" />
                  <YAxis domain={[0.5, 0.9]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    stroke="var(--color-accuracy)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Match Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Match</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Prediction</TableHead>
                <TableHead>Home Win</TableHead>
                <TableHead>Draw</TableHead>
                <TableHead>Away Win</TableHead>
                <TableHead>Confidence</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {predictions.map((prediction) => {
                const date = new Date(prediction.date)
                return (
                  <TableRow key={prediction.id}>
                    <TableCell className="font-medium">
                      {prediction.homeTeam} vs {prediction.awayTeam}
                    </TableCell>
                    <TableCell>{date.toLocaleDateString()}</TableCell>
                    <TableCell>{prediction.predictedScore}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={prediction.homeWinProbability * 100} className="h-2 w-16" />
                        <span className="text-xs">{(prediction.homeWinProbability * 100).toFixed(0)}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={prediction.drawProbability * 100} className="h-2 w-16" />
                        <span className="text-xs">{(prediction.drawProbability * 100).toFixed(0)}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={prediction.awayWinProbability * 100} className="h-2 w-16" />
                        <span className="text-xs">{(prediction.awayWinProbability * 100).toFixed(0)}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={prediction.confidence * 100} className="h-2 w-16" />
                        <span className="text-xs">{(prediction.confidence * 100).toFixed(0)}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
