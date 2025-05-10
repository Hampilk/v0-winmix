"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, BarChartIcon, PlusIcon, SearchIcon } from "lucide-react"
import { DashboardSidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"

// Mock data and services until we implement the actual data fetching
const fetchLeagueById = async (id: string) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    id,
    name: "Premier League",
    description: "English top division",
    sportType: "soccer",
    status: "active",
    seasons: [
      {
        id: "s1",
        name: "2023/2024",
        year: 2023,
        startDate: "2023-08-11",
        endDate: "2024-05-19",
        status: "active",
        matchCount: 380,
        matchesPlayed: 220,
        teams: 20,
      },
      {
        id: "s2",
        name: "2022/2023",
        year: 2022,
        startDate: "2022-08-05",
        endDate: "2023-05-28",
        status: "completed",
        matchCount: 380,
        matchesPlayed: 380,
        teams: 20,
      },
      {
        id: "s3",
        name: "2021/2022",
        year: 2021,
        startDate: "2021-08-13",
        endDate: "2022-05-22",
        status: "completed",
        matchCount: 380,
        matchesPlayed: 380,
        teams: 20,
      },
    ],
  }
}

// League Status Badge Component
const LeagueStatusBadge = ({ status }: { status: string }) => {
  const getVariant = () => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "upcoming":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      default:
        return ""
    }
  }

  return (
    <Badge variant="outline" className={getVariant()}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

// Season Table Component
const LeagueSeasonTable = ({ seasons, onAddMatch, onViewMatches, onEditSeason }: any) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Season</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Teams</TableHead>
              <TableHead>Matches</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {seasons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                  No seasons found. Create a new season to get started.
                </TableCell>
              </TableRow>
            ) : (
              seasons.map((season: any) => (
                <TableRow key={season.id}>
                  <TableCell className="font-medium">{season.name}</TableCell>
                  <TableCell>
                    <LeagueStatusBadge status={season.status} />
                  </TableCell>
                  <TableCell>
                    {new Date(season.startDate).toLocaleDateString()} - {new Date(season.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{season.teams}</TableCell>
                  <TableCell>
                    {season.matchesPlayed} / {season.matchCount}
                    <div className="w-full bg-muted h-1.5 mt-1 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-1.5 rounded-full"
                        style={{ width: `${(season.matchesPlayed / season.matchCount) * 100}%` }}
                      ></div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={() => onAddMatch(season.id)}>
                        <PlusIcon className="h-4 w-4 mr-1" />
                        Add Match
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => onViewMatches(season.id)}>
                        View Matches
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => onEditSeason(season.id)}>
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

// Search Bar Component
const SearchBar = ({ placeholder, value, onChange, className }: any) => {
  return (
    <div className={`relative ${className}`}>
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9"
      />
    </div>
  )
}

export default function LeagueManagementView() {
  const params = useParams<{ id: string }>()
  const id = params.id as string
  const router = useRouter()

  const [league, setLeague] = useState<any | null>(null)
  const [seasons, setSeasons] = useState<any[]>([])
  const [filteredSeasons, setFilteredSeasons] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getLeagueData = async () => {
      if (!id) {
        setIsLoading(false)
        return
      }

      try {
        const leagueData = await fetchLeagueById(id)
        setLeague(leagueData)
        setSeasons(leagueData.seasons || [])
        setFilteredSeasons(leagueData.seasons || [])
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch league:", error)
        setIsLoading(false)
      }
    }

    getLeagueData()
  }, [id])

  useEffect(() => {
    if (searchQuery && seasons) {
      const filtered = seasons.filter(
        (season) =>
          season.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          season.year.toString().includes(searchQuery.toLowerCase()),
      )
      setFilteredSeasons(filtered)
    } else {
      setFilteredSeasons(seasons)
    }
  }, [searchQuery, seasons])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleCreateSeason = () => {
    if (league) {
      router.push(`/league/editor/${league.id}/season/new`)
    }
  }

  const handleViewAnalytics = () => {
    if (league) {
      router.push(`/league/analytics/${league.id}`)
    }
  }

  const handleAddMatch = (seasonId: string) => {
    if (league) {
      router.push(`/matches/new?leagueId=${league.id}&seasonId=${seasonId}`)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!league) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">League Not Found</h1>
          <p>The league you are looking for does not exist.</p>
          <Button variant="secondary" className="mt-4" onClick={() => router.push("/league/list")}>
            Back to Leagues
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#0d1117]">
      <DashboardSidebar />
      <div className="container mx-auto px-4 py-6">
        <DashboardHeader />
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">League Management</h1>
            <p className="text-muted-foreground">Manage league settings and teams</p>
          </div>
          <Button>Add New League</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>League Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Content for the League Management page will be displayed here.</p>
          </CardContent>
        </Card>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold">{league.name}</h1>
            <div className="flex items-center mt-2">
              <LeagueStatusBadge status={league.status} />
              <span className="text-muted-foreground ml-4">ID: {league.id}</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={handleViewAnalytics}>
              <BarChartIcon className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
            <Button onClick={handleCreateSeason}>
              <CalendarIcon className="h-4 w-4 mr-2" />
              New Season
            </Button>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Seasons</h2>
            <SearchBar placeholder="Search seasons..." value={searchQuery} onChange={handleSearch} className="w-64" />
          </div>

          <LeagueSeasonTable
            seasons={filteredSeasons}
            onAddMatch={handleAddMatch}
            onViewMatches={(seasonId: string) => router.push(`/matches?leagueId=${league.id}&seasonId=${seasonId}`)}
            onEditSeason={(seasonId: string) => router.push(`/league/editor/${league.id}/season/${seasonId}`)}
          />
        </div>
      </div>
    </div>
  )
}
