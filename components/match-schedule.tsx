"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, Plus, Trash } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Match } from "@/types/match"

interface MatchScheduleProps {
  matches: Match[]
  onAddMatch?: () => void
  onEditMatch?: (id: string) => void
  onDeleteMatch?: (id: string) => void
  onGenerateSchedule?: () => void
}

export function MatchSchedule({
  matches = [],
  onAddMatch,
  onEditMatch,
  onDeleteMatch,
  onGenerateSchedule,
}: MatchScheduleProps) {
  const [roundFilter, setRoundFilter] = useState<string>("all")
  const [teamFilter, setTeamFilter] = useState<string>("all")

  const filteredMatches = matches.filter((match) => {
    const matchesRound = roundFilter === "all" || match.round === roundFilter
    const matchesTeam = teamFilter === "all" || match.homeTeam === teamFilter || match.awayTeam === teamFilter
    return matchesRound && matchesTeam
  })

  // Get unique rounds and teams for filters
  const rounds = [...new Set(matches.map((match) => match.round))].sort()
  const teams = [
    ...new Set([...matches.map((match) => match.homeTeam), ...matches.map((match) => match.awayTeam)]),
  ].sort()

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500"
      case "scheduled":
        return "bg-blue-500"
      case "live":
        return "bg-red-500"
      case "postponed":
        return "bg-yellow-500"
      case "cancelled":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card className="bg-[#1a2233] border-[#2d3748]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-white">Match Schedule</CardTitle>
            <CardDescription>Manage league match schedule</CardDescription>
          </div>
          <div className="flex space-x-2">
            {onGenerateSchedule && (
              <Button variant="outline" onClick={onGenerateSchedule}>
                Generate Schedule
              </Button>
            )}
            {onAddMatch && (
              <Button onClick={onAddMatch}>
                <Plus className="mr-2 h-4 w-4" />
                Add Match
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Select value={roundFilter} onValueChange={setRoundFilter}>
              <SelectTrigger className="w-[180px] bg-[#131a29] border-[#2d3748]">
                <SelectValue placeholder="Filter by round" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rounds</SelectItem>
                {rounds.map((round) => (
                  <SelectItem key={round} value={round}>
                    Round {round}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={teamFilter} onValueChange={setTeamFilter}>
              <SelectTrigger className="w-[180px] bg-[#131a29] border-[#2d3748]">
                <SelectValue placeholder="Filter by team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                {teams.map((team) => (
                  <SelectItem key={team} value={team}>
                    {team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-[#2d3748]">
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground">Round</TableHead>
                <TableHead className="text-muted-foreground">Home Team</TableHead>
                <TableHead className="text-muted-foreground">Away Team</TableHead>
                <TableHead className="text-muted-foreground">Venue</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMatches.length === 0 ? (
                <TableRow className="border-[#2d3748]">
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No matches found. {onAddMatch && "Add a match or generate a schedule to get started."}
                  </TableCell>
                </TableRow>
              ) : (
                filteredMatches.map((match) => (
                  <TableRow key={match.id} className="border-[#2d3748]">
                    <TableCell className="text-white">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {match.date}
                      </div>
                    </TableCell>
                    <TableCell className="text-white">{match.round}</TableCell>
                    <TableCell className="text-white">{match.homeTeam}</TableCell>
                    <TableCell className="text-white">{match.awayTeam}</TableCell>
                    <TableCell className="text-white">{match.venue}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(match.status)}>{match.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {onEditMatch && (
                          <Button variant="ghost" size="sm" onClick={() => onEditMatch(match.id)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        {onDeleteMatch && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500"
                            onClick={() => onDeleteMatch(match.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
