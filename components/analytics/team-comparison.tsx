"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts"

// Sample data for the chart
const teamComparisonData = [
  { attribute: "Attack", teamA: 85, teamB: 70 },
  { attribute: "Defense", teamA: 75, teamB: 80 },
  { attribute: "Possession", teamA: 90, teamB: 65 },
  { attribute: "Passing", teamA: 88, teamB: 72 },
  { attribute: "Physical", teamA: 70, teamB: 85 },
  { attribute: "Tactics", teamA: 82, teamB: 78 },
]

export function TeamComparison() {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={teamComparisonData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="attribute" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="Team A"
            dataKey="teamA"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.3}
          />
          <Radar
            name="Team B"
            dataKey="teamB"
            stroke="hsl(var(--secondary))"
            fill="hsl(var(--secondary))"
            fillOpacity={0.3}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
