"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusIcon, FilterIcon } from "lucide-react"
import { DashboardSidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { CardHeader, CardTitle } from "@/components/ui/card"

// Mock data and services until we implement the actual data fetching
const fetchMatches = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return [
    {
      id: "m1",
      date: "2023-02-10",
      leagueId: "l1",
      seasonId: "s1",
      homeTeamId: "t1",
      awayTeamId: "t2",
      homeTeam: "Team A",
      awayTeam: "Team B",
      homeScore: 2,
      awayScore: 1,
      status: "completed",
      venue: "Stadium A",
    },
    {
      id: "m2",
      date: "2023-02-15",
      leagueId: "l1",
      seasonId: "s1",
      homeTeamId: "t3",
      awayTeamId: "t4",
      homeTeam: "Team C",
      awayTeam: "Team D",
      homeScore: 0,
      awayScore: 0,
      status: "completed",
      venue: "Stadium C",
    },
    {
      id: "m3",
      date: "2023-02-20",
      leagueId: "l1",
      seasonId: "s1",
      homeTeamId: "t5",
      awayTeamId: "t6",
      homeTeam: "Team E",
      awayTeam: "Team F",
      homeScore: null,
      awayScore: null,
      status: "scheduled",
      venue: "Stadium E",
    },
    {
      id: "m4",
      date: "2023-02-25",
      leagueId: "l2",
      seasonId: "s3",
      homeTeamId: "t7",
      awayTeamId: "t8",
      homeTeam: "Team G",
      awayTeam: "Team H",
      homeScore: null,
      awayScore: null,
      status: "scheduled",
      venue: "Stadium G",
    },
  ]
}

const fetchLeagues = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [
    { id: "l1", name: "Premier League" },
    { id: "l2", name: "La Liga" },
    { id: "l3", name: "Bundesliga" },
  ]
}

const fetchSeasons = async (leagueId: string) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [
    { id: "s1", name: "2023/2024" },
    { id: "s2", name: "2022/2023" },
    { id: "s3", name: "2021/2022" },
  ]
}

// Filter Panel Component
const FilterPanel = ({ filters, leagues, seasons, onChange }: any) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <h3 className="font-medium flex items-center">
            <FilterIcon className="h-4 w-4 mr-2" />
            Filters
          </h3>

          <div>
            <Label htmlFor="leagueId">League</Label>
            <Select value={filters.leagueId} onValueChange={(value) => onChange({ leagueId: value, seasonId: "" })}>
              <SelectTrigger id="leagueId">
                <SelectValue placeholder="Select league" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Leagues</SelectItem>
                {leagues.map((league: any) => (
                  <SelectItem key={league.id} value={league.id}>
                    {league.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="seasonId">Season</Label>
            <Select
              value={filters.seasonId}
              onValueChange={(value) => onChange({ seasonId: value })}
              disabled={!filters.leagueId}
            >
              <SelectTrigger id="seasonId">
                <SelectValue placeholder={filters.leagueId ? "Select season" : "Select league first"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Seasons</SelectItem>
                {seasons.map((season: any) => (
                  <SelectItem key={season.id} value={season.id}>
                    {season.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={filters.status} onValueChange={(value) => onChange({ status: value })}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="postponed">Postponed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateFrom">From Date</Label>
              <Input
                id="dateFrom"
                type="date"
                value={filters.dateFrom}
                onChange={(e) => onChange({ dateFrom: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="dateTo">To Date</Label>
              <Input
                id="dateTo"
                type="date"
                value={filters.dateTo}
                onChange={(e) => onChange({ dateTo: e.target.value })}
              />
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              onChange({
                leagueId: "",
                seasonId: "",
                teamId: "",
                dateFrom: "",
                dateTo: "",
                status: "",
              })
            }
          >
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Match Table Component
const MatchTable = ({ matches, onView, onEdit }: any) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Completed</Badge>
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">Scheduled</Badge>
      case "in_progress":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">In Progress</Badge>
        )
      case "postponed":
        return (
          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100">Postponed</Badge>
        )
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Teams</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matches.map((match: any) => (
              <TableRow key={match.id}>
                <TableCell>{match.date}</TableCell>
                <TableCell>
                  {match.homeTeam} vs {match.awayTeam}
                </TableCell>
                <TableCell>
                  {match.homeScore !== null && match.awayScore !== null
                    ? `${match.homeScore} - ${match.awayScore}`
                    : "-"}
                </TableCell>
                <TableCell>{getStatusBadge(match.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

// Main Page Component
const MatchesPageContent = () => {
  const [matches, setMatches] = useState([])
  const [leagues, setLeagues] = useState([])
  const [seasons, setSeasons] = useState([])
  const [filters, setFilters] = useState({
    leagueId: "",
    seasonId: "",
    teamId: "",
    dateFrom: "",
    dateTo: "",
    status: "",
  })
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchData = async () => {
      const matchesData = await fetchMatches()
      const leaguesData = await fetchLeagues()
      const seasonsData = await fetchSeasons(filters.leagueId)

      setMatches(matchesData)
      setLeagues(leaguesData)
      setSeasons(seasonsData)
    }

    fetchData()
  }, [filters.leagueId])

  const handleFilterChange = (newFilters: any) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }))
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Matches</h1>

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1">
          <FilterPanel filters={filters} leagues={leagues} seasons={seasons} onChange={handleFilterChange} />
        </div>

        <div className="col-span-3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-medium">Match List</h2>
            <Button onClick={() => router.push("/matches/create")}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Match
            </Button>
          </div>

          <MatchTable matches={matches} onView={() => {}} onEdit={() => {}} />
        </div>
      </div>
    </div>
  )
}

export default function MatchesPage() {
  return (
    <div className="flex min-h-screen bg-[#0d1117]">
      <DashboardSidebar />
      <div className="space-y-6 w-full">
        <DashboardHeader />
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Matches</h1>
            <p className="text-muted-foreground">View and manage match schedules</p>
          </div>
          <Button>Add New Match</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <MatchesPageContent />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
