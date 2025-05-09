"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data for the chart
const performanceData = [
  { date: "Jan", homeWins: 4, awayWins: 2, draws: 1 },
  { date: "Feb", homeWins: 3, awayWins: 1, draws: 2 },
  { date: "Mar", homeWins: 5, awayWins: 3, draws: 0 },
  { date: "Apr", homeWins: 2, awayWins: 2, draws: 3 },
  { date: "May", homeWins: 6, awayWins: 1, draws: 1 },
  { date: "Jun", homeWins: 4, awayWins: 3, draws: 2 },
]

export function PerformanceChart() {
  return (
    <Tabs defaultValue="line">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="line">Line</TabsTrigger>
          <TabsTrigger value="bar">Bar</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="line" className="h-[300px]">
        <ChartContainer
          config={{
            homeWins: {
              label: "Home Wins",
              color: "hsl(var(--chart-1))",
            },
            awayWins: {
              label: "Away Wins",
              color: "hsl(var(--chart-2))",
            },
            draws: {
              label: "Draws",
              color: "hsl(var(--chart-3))",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="homeWins" stroke="var(--color-homeWins)" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="awayWins" stroke="var(--color-awayWins)" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="draws" stroke="var(--color-draws)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </TabsContent>

      <TabsContent value="bar" className="h-[300px]">
        <ChartContainer
          config={{
            homeWins: {
              label: "Home Wins",
              color: "hsl(var(--chart-1))",
            },
            awayWins: {
              label: "Away Wins",
              color: "hsl(var(--chart-2))",
            },
            draws: {
              label: "Draws",
              color: "hsl(var(--chart-3))",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="homeWins" fill="var(--color-homeWins)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="awayWins" fill="var(--color-awayWins)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="draws" fill="var(--color-draws)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </TabsContent>
    </Tabs>
  )
}
