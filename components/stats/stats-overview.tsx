"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Goal, BarChart2, Home, ExternalLink, Divide } from "lucide-react"

interface StatsOverviewProps {
  stats: {
    totalMatches: number
    goalsScored: number
    avgGoalsPerMatch: number
    homeWins: number
    awayWins: number
    draws: number
  }
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalMatches}</div>
          <p className="text-xs text-muted-foreground">Matches played in this season</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Goals Scored</CardTitle>
          <Goal className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.goalsScored}</div>
          <p className="text-xs text-muted-foreground">Total goals scored in all matches</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Avg. Goals Per Match</CardTitle>
          <BarChart2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.avgGoalsPerMatch.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Average number of goals per match</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Home Wins</CardTitle>
          <Home className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.homeWins}</div>
          <p className="text-xs text-muted-foreground">Matches won by home teams</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Away Wins</CardTitle>
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.awayWins}</div>
          <p className="text-xs text-muted-foreground">Matches won by away teams</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Draws</CardTitle>
          <Divide className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.draws}</div>
          <p className="text-xs text-muted-foreground">Matches that ended in a draw</p>
        </CardContent>
      </Card>
    </div>
  )
}
