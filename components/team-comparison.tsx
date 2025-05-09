"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from "recharts"
import { useState } from "react"

// Sample data for team comparison
const teamData = [
  {
    id: "team1",
    name: "Team A",
    stats: [
      { subject: "Attack", A: 120, B: 110, fullMark: 150 },
      { subject: "Defense", A: 98, B: 130, fullMark: 150 },
      { subject: "Possession", A: 86, B: 130, fullMark: 150 },
      { subject: "Passing", A: 99, B: 100, fullMark: 150 },
      { subject: "Physical", A: 85, B: 90, fullMark: 150 },
      { subject: "Tactical", A: 65, B: 85, fullMark: 150 },
    ],
  },
  {
    id: "team2",
    name: "Team B",
    stats: [
      { subject: "Attack", A: 110, B: 130, fullMark: 150 },
      { subject: "Defense", A: 120, B: 100, fullMark: 150 },
      { subject: "Possession", A: 130, B: 90, fullMark: 150 },
      { subject: "Passing", A: 110, B: 85, fullMark: 150 },
      { subject: "Physical", A: 90, B: 100, fullMark: 150 },
      { subject: "Tactical", A: 85, B: 95, fullMark: 150 },
    ],
  },
]

interface TeamComparisonProps {
  teams?: typeof teamData
  title?: string
  description?: string
}

export function TeamComparison({
  teams = teamData,
  title = "Team Comparison",
  description = "Compare team performance metrics",
}: TeamComparisonProps) {
  const [selectedTeam, setSelectedTeam] = useState(teams[0].id)

  const currentTeam = teams.find((team) => team.id === selectedTeam) || teams[0]

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Select value={selectedTeam} onValueChange={setSelectedTeam}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select team" />
            </SelectTrigger>
            <SelectContent>
              {teams.map((team) => (
                <SelectItem key={team.id} value={team.id}>
                  {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="radar">
          <TabsList className="mb-4">
            <TabsTrigger value="radar">Radar Chart</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
          </TabsList>
          <TabsContent value="radar">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={currentTeam.stats}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} />
                  <Radar name={currentTeam.name} dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Radar name="Opponent" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="comparison">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentTeam.stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="py-2">
                    <CardTitle className="text-sm">{stat.subject}</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-lg font-bold">{stat.A}</span>
                        <span className="text-xs text-muted-foreground">{currentTeam.name}</span>
                      </div>
                      <div className="text-sm font-medium">vs</div>
                      <div className="flex flex-col items-end">
                        <span className="text-lg font-bold">{stat.B}</span>
                        <span className="text-xs text-muted-foreground">Opponent</span>
                      </div>
                    </div>
                    <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(stat.A / (stat.A + stat.B)) * 100}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
