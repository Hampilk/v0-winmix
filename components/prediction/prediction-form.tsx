"use client"

import type React from "react"

import { useState } from "react"
import type { Team } from "@/data/teams"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArrowRightLeft } from "lucide-react"

interface PredictionFormProps {
  teams: Team[]
  onSubmit: (homeTeam: Team | null, awayTeam: Team | null) => void
  isLoading: boolean
}

export function PredictionForm({ teams, onSubmit, isLoading }: PredictionFormProps) {
  const [homeTeam, setHomeTeam] = useState<Team | null>(null)
  const [awayTeam, setAwayTeam] = useState<Team | null>(null)

  const handleHomeTeamChange = (value: string) => {
    const team = teams.find((t) => t.id === value) || null
    setHomeTeam(team)
  }

  const handleAwayTeamChange = (value: string) => {
    const team = teams.find((t) => t.id === value) || null
    setAwayTeam(team)
  }

  const handleSwapTeams = () => {
    const temp = homeTeam
    setHomeTeam(awayTeam)
    setAwayTeam(temp)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(homeTeam, awayTeam)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Match Prediction</CardTitle>
        <CardDescription>Select teams to generate a match prediction</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="md:col-span-2">
              <label htmlFor="home-team" className="block text-sm font-medium mb-2">
                Home Team
              </label>
              <Select value={homeTeam?.id || ""} onValueChange={handleHomeTeamChange}>
                <SelectTrigger id="home-team" className="w-full">
                  <SelectValue placeholder="Select home team" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={`home-${team.id}`} value={team.id} disabled={team.id === awayTeam?.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <Button type="button" variant="outline" size="icon" onClick={handleSwapTeams} className="rounded-full">
                <ArrowRightLeft className="h-4 w-4" />
                <span className="sr-only">Swap teams</span>
              </Button>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="away-team" className="block text-sm font-medium mb-2">
                Away Team
              </label>
              <Select value={awayTeam?.id || ""} onValueChange={handleAwayTeamChange}>
                <SelectTrigger id="away-team" className="w-full">
                  <SelectValue placeholder="Select away team" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={`away-${team.id}`} value={team.id} disabled={team.id === homeTeam?.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center">
            <Button type="submit" className="w-full md:w-auto" disabled={!homeTeam || !awayTeam || isLoading}>
              {isLoading ? "Generating Prediction..." : "Generate Prediction"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
