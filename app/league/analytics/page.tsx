"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DashboardSidebar } from "@/components/sidebar"

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

const fetchLeagueAnalytics = async (leagueId: string, seasonId: string) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    performanceData: [
      { team: "Team A", wins: 15, draws: 5, losses: 2, goalsFor: 45, goalsAgainst: 20 },
      { team: "Team B", wins: 12, draws: 8, losses: 2, goalsFor: 38, goalsAgainst: 18 },
      { team: "Team C", wins: 11, draws: 5, losses: 6, goalsFor: 35, goalsAgainst: 25 },
    ],
    playerStats: [
      { player: "Player 1", team: "Team A", goals: 18, assists: 7, minutesPlayed: 1800 },
      { player: "Player 2", team: "Team B", goals: 15, assists: 3, minutesPlayed: 1750 },
      { player: "Player 3", team: "Team C", goals: 12, assists: 10, minutesPlayed: 1900 },
    ],
    teamComparison: [
      { team: "Team A", possession: 58, shots: 245, passes: 8500, tackles: 320 },
      { team: "Team B", possession: 52, shots: 220, passes: 7800, tackles: 350 },
      { team: "Team C", possession: 48, shots: 200, passes: 7200, tackles: 380 },
    ],
  }
}

// Mock components until we implement the actual components
const PerformanceChart = ({ data }: any) => (
  <div className="p-4 bg-card rounded-lg">
    <h3 className="text-lg font-medium mb-4">Performance Trends</h3>
    <div className="grid grid-cols-3 gap-4">
      {data.map((team: any, index: number) => (
        <div key={index} className="bg-muted p-3 rounded-md">
          <h4 className="font-medium">{team.team}</h4>
          <div className="mt-2 space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Wins:</span>
              <span className="font-medium">{team.wins}</span>
            </div>
            <div className="flex justify-between">
              <span>Draws:</span>
              <span className="font-medium">{team.draws}</span>
            </div>
            <div className="flex justify-between">
              <span>Losses:</span>
              <span className="font-medium">{team.losses}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const PlayerStatsTable = ({ players }: any) => (
  <div className="p-4 bg-card rounded-lg">
    <h3 className="text-lg font-medium mb-4">Player Statistics</h3>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 px-4">Player</th>
            <th className="text-left py-2 px-4">Team</th>
            <th className="text-right py-2 px-4">Goals</th>
            <th className="text-right py-2 px-4">Assists</th>
            <th className="text-right py-2 px-4">Minutes</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player: any, index: number) => (
            <tr key={index} className="border-b hover:bg-muted/50">
              <td className="py-2 px-4">{player.player}</td>
              <td className="py-2 px-4">{player.team}</td>
              <td className="py-2 px-4 text-right">{player.goals}</td>
              <td className="py-2 px-4 text-right">{player.assists}</td>
              <td className="py-2 px-4 text-right">{player.minutesPlayed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

const TeamComparison = ({ teams }: any) => (
  <div className="p-4 bg-card rounded-lg">
    <h3 className="text-lg font-medium mb-4">Team Comparison</h3>
    <div className="grid grid-cols-2 gap-6">
      {teams.map((team: any, index: number) => (
        <div key={index} className="bg-muted p-4 rounded-md">
          <h4 className="font-medium mb-3">{team.team}</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Possession</span>
                <span>{team.possession}%</span>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: `${team.possession}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Shots</span>
                <span>{team.shots}</span>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: `${(team.shots / 300) * 100}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Passes</span>
                <span>{team.passes}</span>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: `${(team.passes / 10000) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
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

export default function LeagueAnalyticsView() {
  const params = useParams<{ id: string }>()
  const id = params.id as string
  const router = useRouter()

  const [league, setLeague] = useState<any | null>(null)
  const [analytics, setAnalytics] = useState<any | null>(null)
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("performance")
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
    const getAnalytics = async () => {
      if (!id || !selectedSeason) {
        return
      }

      setIsLoading(true)

      try {
        const analyticsData = await fetchLeagueAnalytics(id, selectedSeason)
        setAnalytics(analyticsData)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch analytics:", error)
        setError("Failed to load analytics data")
        setIsLoading(false)
      }
    }

    getAnalytics()
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
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <span className="sr-only">Loading...</span>
          </div>
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
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold">{league.name} Analytics</h1>
            <p className="text-muted-foreground mt-1">In-depth statistical analysis</p>
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
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="performance">Performance Trends</TabsTrigger>
                <TabsTrigger value="players">Player Statistics</TabsTrigger>
                <TabsTrigger value="teams">Team Comparison</TabsTrigger>
              </TabsList>

              <div className="bg-card rounded-lg p-6 mt-4">
                {!analytics ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-3 text-muted-foreground">Loading analytics data...</p>
                  </div>
                ) : (
                  <>
                    <TabsContent value="performance">
                      <PerformanceChart data={analytics.performanceData} />
                    </TabsContent>

                    <TabsContent value="players">
                      <PlayerStatsTable players={analytics.playerStats} />
                    </TabsContent>

                    <TabsContent value="teams">
                      <TeamComparison teams={analytics.teamComparison} />
                    </TabsContent>
                  </>
                )}
              </div>
            </Tabs>
          </>
        )}
      </div>
    </div>
  )
}
