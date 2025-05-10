"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
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
      { id: "s1", name: "2023/2024", year: 2023 },
      { id: "s2", name: "2022/2023", year: 2022 },
      { id: "s3", name: "2021/2022", year: 2021 },
    ],
  }
}

const fetchLeagueStats = async (leagueId: string, seasonId: string) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    overview: {
      totalMatches: 380,
      matchesPlayed: 220,
      goalsScored: 580,
      avgGoalsPerMatch: 2.64,
      cleanSheets: 75,
      yellowCards: 620,
      redCards: 25,
    },
    standings: [
      { position: 1, team: "Team A", played: 25, won: 18, drawn: 5, lost: 2, gf: 55, ga: 18, gd: 37, points: 59 },
      { position: 2, team: "Team B", played: 25, won: 17, drawn: 5, lost: 3, gf: 50, ga: 20, gd: 30, points: 56 },
      { position: 3, team: "Team C", played: 25, won: 15, drawn: 6, lost: 4, gf: 48, ga: 25, gd: 23, points: 51 },
      { position: 4, team: "Team D", played: 25, won: 14, drawn: 5, lost: 6, gf: 45, ga: 28, gd: 17, points: 47 },
    ],
    topScorers: [
      { player: "Player 1", team: "Team A", goals: 18, assists: 7, minutesPlayed: 2250 },
      { player: "Player 2", team: "Team B", goals: 15, assists: 3, minutesPlayed: 2100 },
      { player: "Player 3", team: "Team C", goals: 14, assists: 10, minutesPlayed: 2300 },
      { player: "Player 4", team: "Team D", goals: 13, assists: 5, minutesPlayed: 2150 },
      { player: "Player 5", team: "Team E", goals: 12, assists: 2, minutesPlayed: 2250 },
    ],
    recentResults: [
      { date: "2023-02-10", homeTeam: "Team A", awayTeam: "Team B", homeScore: 2, awayScore: 1 },
      { date: "2023-02-09", homeTeam: "Team C", awayTeam: "Team D", homeScore: 0, awayScore: 0 },
      { date: "2023-02-08", homeTeam: "Team E", awayTeam: "Team F", homeScore: 3, awayScore: 1 },
      { date: "2023-02-07", homeTeam: "Team G", awayTeam: "Team H", homeScore: 1, awayScore: 2 },
      { date: "2023-02-06", homeTeam: "Team I", awayTeam: "Team J", homeScore: 4, awayScore: 0 },
    ],
  }
}

// Mock components until we implement the actual components
const StatsOverview = ({ stats }: any) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    <Card>
      <CardContent className="pt-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Total Matches</p>
          <h3 className="text-3xl font-bold mt-1">{stats.totalMatches}</h3>
          <p className="text-xs text-muted-foreground mt-1">
            {Math.round((stats.matchesPlayed / stats.totalMatches) * 100)}% completed
          </p>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent className="pt-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Goals Scored</p>
          <h3 className="text-3xl font-bold mt-1">{stats.goalsScored}</h3>
          <p className="text-xs text-muted-foreground mt-1">Avg: {stats.avgGoalsPerMatch} per match</p>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent className="pt-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Clean Sheets</p>
          <h3 className="text-3xl font-bold mt-1">{stats.cleanSheets}</h3>
          <p className="text-xs text-muted-foreground mt-1">
            {Math.round((stats.cleanSheets / stats.matchesPlayed) * 100)}% of matches
          </p>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent className="pt-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Cards</p>
          <h3 className="text-3xl font-bold mt-1">{stats.yellowCards}</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Yellow: {stats.yellowCards}, Red: {stats.redCards}
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
)

const LeagueTable = ({ standings }: any) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left py-2 px-4">Pos</th>
          <th className="text-left py-2 px-4">Team</th>
          <th className="text-center py-2 px-2">P</th>
          <th className="text-center py-2 px-2">W</th>
          <th className="text-center py-2 px-2">D</th>
          <th className="text-center py-2 px-2">L</th>
          <th className="text-center py-2 px-2">GF</th>
          <th className="text-center py-2 px-2">GA</th>
          <th className="text-center py-2 px-2">GD</th>
          <th className="text-center py-2 px-2">Pts</th>
        </tr>
      </thead>
      <tbody>
        {standings.map((team: any, index: number) => (
          <tr key={index} className="border-b hover:bg-muted/50">
            <td className="py-2 px-4 font-medium">{team.position}</td>
            <td className="py-2 px-4">{team.team}</td>
            <td className="py-2 px-2 text-center">{team.played}</td>
            <td className="py-2 px-2 text-center">{team.won}</td>
            <td className="py-2 px-2 text-center">{team.drawn}</td>
            <td className="py-2 px-2 text-center">{team.lost}</td>
            <td className="py-2 px-2 text-center">{team.gf}</td>
            <td className="py-2 px-2 text-center">{team.ga}</td>
            <td className="py-2 px-2 text-center">{team.gd}</td>
            <td className="py-2 px-2 text-center font-bold">{team.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const TopScorers = ({ scorers }: any) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left py-2 px-4">Player</th>
          <th className="text-left py-2 px-4">Team</th>
          <th className="text-center py-2 px-4">Goals</th>
          <th className="text-center py-2 px-4">Assists</th>
          <th className="text-center py-2 px-4">Minutes</th>
        </tr>
      </thead>
      <tbody>
        {scorers.map((player: any, index: number) => (
          <tr key={index} className="border-b hover:bg-muted/50">
            <td className="py-2 px-4 font-medium">{player.player}</td>
            <td className="py-2 px-4">{player.team}</td>
            <td className="py-2 px-4 text-center font-bold">{player.goals}</td>
            <td className="py-2 px-4 text-center">{player.assists}</td>
            <td className="py-2 px-4 text-center">{player.minutesPlayed}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const MatchResults = ({ results }: any) => (
  <div className="space-y-4">
    {results.map((match: any, index: number) => (
      <Card key={index}>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">{new Date(match.date).toLocaleDateString()}</div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium">{match.homeTeam}</p>
                <p className="text-sm text-muted-foreground">Home</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold">{match.homeScore}</span>
                <span className="text-muted-foreground">-</span>
                <span className="text-xl font-bold">{match.awayScore}</span>
              </div>
              <div className="text-left">
                <p className="font-medium">{match.awayTeam}</p>
                <p className="text-sm text-muted-foreground">Away</p>
              </div>
            </div>
            <div className="w-8"></div> {/* Spacer for alignment */}
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
)

const SeasonSelector = ({ seasons, selectedSeason, onChange }: any) => (
  <div className="flex items-center space-x-2">
    <span className="text-sm">Season:</span>
    <select
      value={selectedSeason || ""}
      onChange={(e) => onChange(e.target.value)}
      className="bg-background border border-input rounded-md px-3 py-1 text-sm"
    >
      {seasons.map((season: any) => (
        <option key={season.id} value={season.id}>
          {season.name}
        </option>
      ))}
    </select>
  </div>
)

export default function LeagueStatsView() {
  const params = useParams<{ id: string }>()
  const id = params.id as string
  const router = useRouter()

  const [league, setLeague] = useState<any | null>(null)
  const [stats, setStats] = useState<any | null>(null)
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setIsLoading(false)
        return
      }

      try {
        const leagueData = await fetchLeagueById(id)
        setLeague(leagueData)

        // Set the most recent season as default
        if (leagueData.seasons && leagueData.seasons.length > 0) {
          const sortedSeasons = [...leagueData.seasons].sort((a, b) => b.year - a.year)
          setSelectedSeason(sortedSeasons[0].id)
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch league:", error)
        setError("Failed to load league data")
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id])

  useEffect(() => {
    const getStats = async () => {
      if (!id || !selectedSeason) {
        return
      }

      setIsLoading(true)

      try {
        const statsData = await fetchLeagueStats(id, selectedSeason)
        setStats(statsData)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch stats:", error)
        setError("Failed to load statistics data")
        setIsLoading(false)
      }
    }

    getStats()
  }, [id, selectedSeason])

  const handleSeasonChange = (seasonId: string) => {
    setSelectedSeason(seasonId)
  }

  const handleBackToLeague = () => {
    router.push(`/league/management/${id}`)
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
        <div>
          <h1 className="text-3xl font-bold tracking-tight">League Stats</h1>
          <p className="text-muted-foreground">View detailed league statistics</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold">{league.name} Statistics</h1>
            <p className="text-muted-foreground mt-1">Season performance and records</p>
          </div>
          <div className="flex space-x-4">
            <SeasonSelector
              seasons={league.seasons || []}
              selectedSeason={selectedSeason}
              onChange={handleSeasonChange}
            />
            <Button variant="secondary" onClick={handleBackToLeague}>
              Back to League
            </Button>
          </div>
        </div>

        {error ? (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <>
            {!stats ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-3 text-muted-foreground">Loading statistics...</p>
              </div>
            ) : (
              <div className="space-y-6">
                <StatsOverview stats={stats.overview} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>League Table</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <LeagueTable standings={stats.standings} />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Top Scorers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <TopScorers scorers={stats.topScorers} />
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MatchResults results={stats.recentResults} />
                  </CardContent>
                </Card>
              </div>
            )}
          </>
        )}
        <Card>
          <CardHeader>
            <CardTitle>League Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Content for the League Stats page will be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
