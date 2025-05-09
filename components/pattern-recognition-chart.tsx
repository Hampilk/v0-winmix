"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Sample data for the pattern recognition chart
const patternData = [
  { name: "Jan", pattern1: 400, pattern2: 240, pattern3: 320 },
  { name: "Feb", pattern1: 300, pattern2: 139, pattern3: 221 },
  { name: "Mar", pattern1: 200, pattern2: 980, pattern3: 590 },
  { name: "Apr", pattern1: 278, pattern2: 390, pattern3: 480 },
  { name: "May", pattern1: 189, pattern2: 480, pattern3: 380 },
  { name: "Jun", pattern1: 239, pattern2: 380, pattern3: 430 },
  { name: "Jul", pattern1: 349, pattern2: 430, pattern3: 380 },
]

interface PatternRecognitionChartProps {
  data?: typeof patternData
  title?: string
  description?: string
}

export function PatternRecognitionChart({
  data = patternData,
  title = "Pattern Recognition Analysis",
  description = "Visualization of detected patterns over time",
}: PatternRecognitionChartProps) {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Patterns</TabsTrigger>
            <TabsTrigger value="pattern1">Pattern 1</TabsTrigger>
            <TabsTrigger value="pattern2">Pattern 2</TabsTrigger>
            <TabsTrigger value="pattern3">Pattern 3</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pattern1" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="pattern2" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="pattern3" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="pattern1">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pattern1" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="pattern2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pattern2" stroke="#82ca9d" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="pattern3">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pattern3" stroke="#ffc658" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
