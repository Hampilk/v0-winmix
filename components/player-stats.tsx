"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Search } from "lucide-react"

// Sample data for player stats
const playerStatsData = [
  {
    id: "1",
    name: "John Smith",
    position: "Forward",
    team: "Team A",
    matches: 15,
    goals: 12,
    assists: 5,
    yellowCards: 2,
    redCards: 0,
    minutesPlayed: 1250,
  },
  {
    id: "2",
    name: "Michael Johnson",
    position: "Midfielder",
    team: "Team B",
    matches: 14,
    goals: 5,
    assists: 10,
    yellowCards: 3,
    redCards: 0,
    minutesPlayed: 1180,
  },
  {
    id: "3",
    name: "David Williams",
    position: "Defender",
    team: "Team A",
    matches: 15,
    goals: 1,
    assists: 2,
    yellowCards: 4,
    redCards: 1,
    minutesPlayed: 1350,
  },
  {
    id: "4",
    name: "Robert Brown",
    position: "Goalkeeper",
    team: "Team C",
    matches: 15,
    goals: 0,
    assists: 0,
    yellowCards: 1,
    redCards: 0,
    minutesPlayed: 1350,
    cleanSheets: 6,
  },
  {
    id: "5",
    name: "James Davis",
    position: "Forward",
    team: "Team B",
    matches: 13,
    goals: 9,
    assists: 3,
    yellowCards: 2,
    redCards: 0,
    minutesPlayed: 1050,
  },
  {
    id: "6",
    name: "Daniel Miller",
    position: "Midfielder",
    team: "Team C",
    matches: 15,
    goals: 4,
    assists: 7,
    yellowCards: 5,
    redCards: 0,
    minutesPlayed: 1320,
  },
  {
    id: "7",
    name: "Christopher Wilson",
    position: "Defender",
    team: "Team A",
    matches: 14,
    goals: 0,
    assists: 1,
    yellowCards: 3,
    redCards: 0,
    minutesPlayed: 1260,
  },
]

interface PlayerStatsProps {
  players?: typeof playerStatsData
  title?: string
  description?: string
}

export function PlayerStats({
  players = playerStatsData,
  title = "Player Statistics",
  description = "Performance metrics for all players",
}: PlayerStatsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [positionFilter, setPositionFilter] = useState("all")
  const [teamFilter, setTeamFilter] = useState("all")

  // Get unique positions and teams for filters
  const positions = ["all", ...new Set(players.map((player) => player.position))]
  const teams = ["all", ...new Set(players.map((player) => player.team))]

  // Apply filters
  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPosition = positionFilter === "all" || player.position === positionFilter
    const matchesTeam = teamFilter === "all" || player.team === teamFilter

    return matchesSearch && matchesPosition && matchesTeam
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search players..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={positionFilter} onValueChange={setPositionFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Position" />
            </SelectTrigger>
            <SelectContent>
              {positions.map((position) => (
                <SelectItem key={position} value={position}>
                  {position === "all" ? "All Positions" : position}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={teamFilter} onValueChange={setTeamFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Team" />
            </SelectTrigger>
            <SelectContent>
              {teams.map((team) => (
                <SelectItem key={team} value={team}>
                  {team === "all" ? "All Teams" : team}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Player</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Team</TableHead>
                <TableHead className="text-right">Matches</TableHead>
                <TableHead className="text-right">Goals</TableHead>
                <TableHead className="text-right">Assists</TableHead>
                <TableHead className="text-right">Yellow Cards</TableHead>
                <TableHead className="text-right">Red Cards</TableHead>
                <TableHead className="text-right">Minutes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlayers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4 text-muted-foreground">
                    No players found. Try adjusting your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPlayers.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell className="font-medium">{player.name}</TableCell>
                    <TableCell>{player.position}</TableCell>
                    <TableCell>{player.team}</TableCell>
                    <TableCell className="text-right">{player.matches}</TableCell>
                    <TableCell className="text-right">{player.goals}</TableCell>
                    <TableCell className="text-right">{player.assists}</TableCell>
                    <TableCell className="text-right">{player.yellowCards}</TableCell>
                    <TableCell className="text-right">{player.redCards}</TableCell>
                    <TableCell className="text-right">{player.minutesPlayed}</TableCell>
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
