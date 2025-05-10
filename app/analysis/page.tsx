import { CardDescription } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardSidebar } from "@/components/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PerformanceChart } from "@/components/analytics/performance-chart"
import { TeamComparison } from "@/components/analytics/team-comparison"
import { PlayerStats } from "@/components/analytics/player-stats"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AnalysisView() {
  return (
    <div className="flex min-h-screen bg-[#0d1117]">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Match Analysis</h1>
              <p className="text-muted-foreground">Detailed analysis and prediction for matches</p>
            </div>
            <div className="flex space-x-2">
              <Select defaultValue="2023-2024">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023-2024">Season 2023-2024</SelectItem>
                  <SelectItem value="2022-2023">Season 2022-2023</SelectItem>
                  <SelectItem value="2021-2022">Season 2021-2022</SelectItem>
                </SelectContent>
              </Select>
              <Button>Generate Report</Button>
            </div>
          </div>

          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="comparison">Team Comparison</TabsTrigger>
              <TabsTrigger value="players">Player Analysis</TabsTrigger>
              <TabsTrigger value="predictions">Predictions</TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-[#1a2233] border-[#2d3748]">
                  <CardHeader>
                    <CardTitle className="text-white">Performance Metrics</CardTitle>
                    <CardDescription>Key performance indicators over time</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <PerformanceChart />
                  </CardContent>
                </Card>

                <Card className="bg-[#1a2233] border-[#2d3748]">
                  <CardHeader>
                    <CardTitle className="text-white">Win/Loss Analysis</CardTitle>
                    <CardDescription>Win/loss distribution and trends</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <div className="h-full bg-[#131a29] rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Win/Loss chart visualization</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2 bg-[#1a2233] border-[#2d3748]">
                  <CardHeader>
                    <CardTitle className="text-white">Performance Breakdown</CardTitle>
                    <CardDescription>Detailed breakdown of team performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-[#131a29] p-4 rounded-md">
                        <h3 className="text-lg font-medium text-white mb-2">Offense</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Goals Scored</span>
                            <span className="text-white font-medium">24</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Shots on Target</span>
                            <span className="text-white font-medium">87</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Conversion Rate</span>
                            <span className="text-white font-medium">27.6%</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#131a29] p-4 rounded-md">
                        <h3 className="text-lg font-medium text-white mb-2">Defense</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Goals Conceded</span>
                            <span className="text-white font-medium">12</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Clean Sheets</span>
                            <span className="text-white font-medium">8</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Tackles Won</span>
                            <span className="text-white font-medium">156</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#131a29] p-4 rounded-md">
                        <h3 className="text-lg font-medium text-white mb-2">Possession</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Avg. Possession</span>
                            <span className="text-white font-medium">58.3%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Pass Accuracy</span>
                            <span className="text-white font-medium">87.2%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Duels Won</span>
                            <span className="text-white font-medium">324</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-6">
              <Card className="bg-[#1a2233] border-[#2d3748]">
                <CardHeader>
                  <CardTitle className="text-white">Team Comparison</CardTitle>
                  <CardDescription>Compare performance metrics between teams</CardDescription>
                </CardHeader>
                <CardContent>
                  <TeamComparison />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="players" className="space-y-6">
              <Card className="bg-[#1a2233] border-[#2d3748]">
                <CardHeader>
                  <CardTitle className="text-white">Player Analysis</CardTitle>
                  <CardDescription>Individual player performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <PlayerStats />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="predictions" className="space-y-6">
              <Card className="bg-[#1a2233] border-[#2d3748]">
                <CardHeader>
                  <CardTitle className="text-white">Match Predictions</CardTitle>
                  <CardDescription>AI-powered match outcome predictions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-[#131a29] p-4 rounded-md">
                        <h3 className="text-lg font-medium text-white mb-2">Win Probability</h3>
                        <div className="flex items-center justify-center h-32">
                          <span className="text-4xl font-bold text-green-500">68%</span>
                        </div>
                      </div>
                      <div className="bg-[#131a29] p-4 rounded-md">
                        <h3 className="text-lg font-medium text-white mb-2">Draw Probability</h3>
                        <div className="flex items-center justify-center h-32">
                          <span className="text-4xl font-bold text-yellow-500">22%</span>
                        </div>
                      </div>
                      <div className="bg-[#131a29] p-4 rounded-md">
                        <h3 className="text-lg font-medium text-white mb-2">Loss Probability</h3>
                        <div className="flex items-center justify-center h-32">
                          <span className="text-4xl font-bold text-red-500">10%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#131a29] p-4 rounded-md">
                      <h3 className="text-lg font-medium text-white mb-2">Prediction Factors</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Recent Form</span>
                          <span className="text-green-500">Strong positive impact</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Head-to-Head Record</span>
                          <span className="text-green-500">Moderate positive impact</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Home Advantage</span>
                          <span className="text-green-500">Strong positive impact</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Injuries</span>
                          <span className="text-yellow-500">Neutral impact</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Weather Conditions</span>
                          <span className="text-red-500">Slight negative impact</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
