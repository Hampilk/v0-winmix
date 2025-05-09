"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Sample data for the performance chart
const performanceData = [
  { month: "Jan", wins: 5, losses: 2, draws: 1, goalsScored: 15, goalsConceded: 8 },
  { month: "Feb", wins: 3, losses: 3, draws: 2, goalsScored: 10, goalsConceded: 12 },
  { month: "Mar", wins: 4, losses: 1, draws: 3, goalsScored: 14, goalsConceded: 7 },
  { month: "Apr", wins: 6, losses: 0, draws: 2, goalsScored: 18, goalsConceded: 4 },
  { month: "May", wins: 2, losses: 4, draws: 2, goalsScored: 8, goalsConceded: 14 },
  { month: "Jun", wins: 5, losses: 2, draws: 1, goalsScored: 16, goalsConceded: 9 },
]

interface PerformanceChartProps {
  data?: typeof performanceData
  title?: string
  description?: string
}

export function PerformanceChart({
  data = performanceData,
  title = "Team Performance",
  description = "Monthly performance metrics",
}: PerformanceChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="results">
          <TabsList className="mb-4">
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>
          <TabsContent value="results">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="wins" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="draws" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                  <Area type="monotone" dataKey="losses" stackId="1" stroke="#ffc658" fill="#ffc658" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="goals">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="goalsScored" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="goalsConceded" stroke="#ffc658" fill="#ffc658" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
