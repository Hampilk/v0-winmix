"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Sample data for prediction chart
const predictionData = [
  { name: "Team A vs Team B", homeWin: 60, draw: 25, awayWin: 15 },
  { name: "Team C vs Team D", homeWin: 45, draw: 30, awayWin: 25 },
  { name: "Team E vs Team F", homeWin: 35, draw: 40, awayWin: 25 },
  { name: "Team G vs Team H", homeWin: 55, draw: 30, awayWin: 15 },
  { name: "Team I vs Team J", homeWin: 50, draw: 20, awayWin: 30 },
]

const accuracyData = [
  { name: "Correct", value: 68 },
  { name: "Incorrect", value: 32 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"]
const ACCURACY_COLORS = ["#4caf50", "#f44336"]

interface PredictionChartProps {
  predictions?: typeof predictionData
  accuracy?: typeof accuracyData
  title?: string
  description?: string
}

export function PredictionChart({
  predictions = predictionData,
  accuracy = accuracyData,
  title = "Match Predictions",
  description = "Probability analysis for upcoming matches",
}: PredictionChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="predictions">
          <TabsList className="mb-4">
            <TabsTrigger value="predictions">Match Predictions</TabsTrigger>
            <TabsTrigger value="accuracy">Prediction Accuracy</TabsTrigger>
          </TabsList>
          <TabsContent value="predictions">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={predictions} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                  <YAxis label={{ value: "Probability (%)", angle: -90, position: "insideLeft" }} />
                  <Tooltip formatter={(value) => [`${value}%`, ""]} />
                  <Legend />
                  <Bar dataKey="homeWin" name="Home Win" stackId="a" fill="#8884d8" />
                  <Bar dataKey="draw" name="Draw" stackId="a" fill="#82ca9d" />
                  <Bar dataKey="awayWin" name="Away Win" stackId="a" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="accuracy">
            <div className="h-[400px] flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={accuracy}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {accuracy.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={ACCURACY_COLORS[index % ACCURACY_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, ""]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center mt-4">
                <p className="text-lg font-semibold">Overall Prediction Accuracy: {accuracy[0].value}%</p>
                <p className="text-sm text-muted-foreground">Based on the last 100 predictions</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
