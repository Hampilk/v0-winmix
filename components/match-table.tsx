"use client"

import { useState } from "react"
import { Calendar, Edit, Eye, MoreHorizontal, Plus, Search, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for matches
const mockMatches = [
  {
    id: "1",
    date: "2023-10-15",
    homeTeam: "Team Alpha",
    awayTeam: "Team Beta",
    score: "2-1",
    league: "Premier League",
    status: "Completed",
  },
  {
    id: "2",
    date: "2023-10-16",
    homeTeam: "Team Charlie",
    awayTeam: "Team Delta",
    score: "0-0",
    league: "La Liga",
    status: "Completed",
  },
  {
    id: "3",
    date: "2023-10-17",
    homeTeam: "Team Echo",
    awayTeam: "Team Foxtrot",
    score: "3-2",
    league: "Bundesliga",
    status: "Completed",
  },
  {
    id: "4",
    date: "2023-10-18",
    homeTeam: "Team Golf",
    awayTeam: "Team Hotel",
    score: "-",
    league: "Serie A",
    status: "Scheduled",
  },
  {
    id: "5",
    date: "2023-10-19",
    homeTeam: "Team India",
    awayTeam: "Team Juliet",
    score: "-",
    league: "Ligue 1",
    status: "Scheduled",
  },
]

export function MatchTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [leagueFilter, setLeagueFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [matches, setMatches] = useState(mockMatches)

  const filteredMatches = matches.filter((match) => {
    const matchesSearch =
      match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.league.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesLeague = leagueFilter === "all" || match.league === leagueFilter
    const matchesStatus = statusFilter === "all" || match.status === statusFilter

    return matchesSearch && matchesLeague && matchesStatus
  })

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Matches</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search matches..."
              className="w-[250px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={leagueFilter} onValueChange={setLeagueFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by League" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Leagues</SelectItem>
              <SelectItem value="Premier League">Premier League</SelectItem>
              <SelectItem value="La Liga">La Liga</SelectItem>
              <SelectItem value="Bundesliga">Bundesliga</SelectItem>
              <SelectItem value="Serie A">Serie A</SelectItem>
              <SelectItem value="Ligue 1">Ligue 1</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Scheduled">Scheduled</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Match
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Home Team</TableHead>
              <TableHead>Away Team</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>League</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMatches.map((match) => (
              <TableRow key={match.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {match.date}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{match.homeTeam}</TableCell>
                <TableCell className="font-medium">{match.awayTeam}</TableCell>
                <TableCell>{match.score}</TableCell>
                <TableCell>{match.league}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      match.status === "Completed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                    }`}
                  >
                    {match.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
