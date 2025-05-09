"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Search } from "lucide-react"

interface PlayerStatsTableProps {
  players: {
    id: string
    name: string
    team: string
    goals: number
    assists: number
    rating: number
  }[]
}

export default function PlayerStatsTable({ players }: PlayerStatsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<keyof (typeof players)[0]>("rating")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (field: keyof (typeof players)[0]) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const filteredPlayers = players.filter(
    (player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.team.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    if (a[sortField] < b[sortField]) {
      return sortDirection === "asc" ? -1 : 1
    }
    if (a[sortField] > b[sortField]) {
      return sortDirection === "asc" ? 1 : -1
    }
    return 0
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Player Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search players or teams..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Player</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("goals")}
                    className="flex items-center gap-1 p-0 h-auto font-medium"
                  >
                    Goals
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("assists")}
                    className="flex items-center gap-1 p-0 h-auto font-medium"
                  >
                    Assists
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("rating")}
                    className="flex items-center gap-1 p-0 h-auto font-medium"
                  >
                    Rating
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPlayers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    No players found.
                  </TableCell>
                </TableRow>
              ) : (
                sortedPlayers.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell className="font-medium">{player.name}</TableCell>
                    <TableCell>{player.team}</TableCell>
                    <TableCell>{player.goals}</TableCell>
                    <TableCell>{player.assists}</TableCell>
                    <TableCell>{player.rating.toFixed(1)}</TableCell>
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
