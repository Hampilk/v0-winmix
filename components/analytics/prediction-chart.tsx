"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data for the chart
const predictionData = [
  { date: "Jan", accuracy: 0.72 },
  { date: "Feb", accuracy: 0.68 },
  { date: "Mar", accuracy: 0.75 },
  { date: "Apr", accuracy: 0.82 },
  { date: "May", accuracy: 0.78 },
  { date: "Jun", accuracy: 0.85 },
]

export function PredictionChart() {
  return (
    <ChartContainer
      config={{
        accuracy: {
          label: "Accuracy",
          color: "hsl(var(--chart-1))",
        },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={predictionData}>
          <XAxis dataKey="date" />
          <YAxis domain={[0.5, 0.9]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="accuracy" stroke="var(--color-accuracy)" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
