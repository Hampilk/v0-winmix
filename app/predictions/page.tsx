import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PredictionChart } from "@/components/analytics/prediction-chart"
import { TrendingUp, TrendingDown, Zap, BarChart3, RefreshCw } from "lucide-react"

export default function PredictionsView() {
  return (
    <div className="flex min-h-screen bg-[#0d1117]">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Predictions</h1>
              <p className="text-muted-foreground">AI-powered match predictions and analysis</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Update Predictions
              </Button>
              <Button>Generate Report</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="bg-[#1a2233] border-[#2d3748]">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-500/20 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Prediction Accuracy</p>
                    <h3 className="text-2xl font-bold text-white">78%</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#1a2233] border-[#2d3748]">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500/20 p-3 rounded-full">
                    <Zap className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Active Predictions</p>
                    <h3 className="text-2xl font-bold text-white">12</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#1a2233] border-[#2d3748]">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-500/20 p-3 rounded-full">
                    <BarChart3 className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Data Points</p>
                    <h3 className="text-2xl font-bold text-white">5.2K</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#1a2233] border-[#2d3748]">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-red-500/20 p-3 rounded-full">
                    <TrendingDown className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Incorrect Predictions</p>
                    <h3 className="text-2xl font-bold text-white">22%</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="upcoming">Upcoming Matches</TabsTrigger>
              <TabsTrigger value="history">Prediction History</TabsTrigger>
              <TabsTrigger value="accuracy">Accuracy Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-6">
              <Card className="bg-[#1a2233] border-[#2d3748]">
                <CardHeader>
                  <CardTitle className="text-white">Upcoming Match Predictions</CardTitle>
                  <CardDescription>AI predictions for upcoming matches</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[#2d3748]">
                        <TableHead className="text-muted-foreground">Date</TableHead>
                        <TableHead className="text-muted-foreground">Match</TableHead>
                        <TableHead className="text-muted-foreground">Predicted Winner</TableHead>
                        <TableHead className="text-muted-foreground">Win Probability</TableHead>
                        <TableHead className="text-muted-foreground">Predicted Score</TableHead>
                        <TableHead className="text-muted-foreground">Confidence</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-[#2d3748]">
                        <TableCell className="text-white">May 15, 2024</TableCell>
                        <TableCell className="text-white">Team Charlie vs Team Delta</TableCell>
                        <TableCell className="text-white">Team Charlie</TableCell>
                        <TableCell className="text-white">68%</TableCell>
                        <TableCell className="text-white">2 - 1</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">High</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-[#2d3748]">
                        <TableCell className="text-white">May 20, 2024</TableCell>
                        <TableCell className="text-white">Team Golf vs Team Hotel</TableCell>
                        <TableCell className="text-white">Team Hotel</TableCell>
                        <TableCell className="text-white">54%</TableCell>
                        <TableCell className="text-white">1 - 2</TableCell>
                        <TableCell>
                          <Badge className="bg-yellow-500">Medium</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-[#2d3748]">
                        <TableCell className="text-white">May 25, 2024</TableCell>
                        <TableCell className="text-white">Team India vs Team Juliet</TableCell>
                        <TableCell className="text-white">Draw</TableCell>
                        <TableCell className="text-white">42%</TableCell>
                        <TableCell className="text-white">1 - 1</TableCell>
                        <TableCell>
                          <Badge className="bg-red-500">Low</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-[#1a2233] border-[#2d3748]">
                  <CardHeader>
                    <CardTitle className="text-white">Prediction Factors</CardTitle>
                    <CardDescription>Key factors influencing predictions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white">Recent Form</span>
                        <div className="w-2/3 bg-[#131a29] rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white">Head-to-Head</span>
                        <div className="w-2/3 bg-[#131a29] rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "70%" }}></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white">Home Advantage</span>
                        <div className="w-2/3 bg-[#131a29] rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white">Player Availability</span>
                        <div className="w-2/3 bg-[#131a29] rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "50%" }}></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white">Weather Conditions</span>
                        <div className="w-2/3 bg-[#131a29] rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#1a2233] border-[#2d3748]">
                  <CardHeader>
                    <CardTitle className="text-white">Prediction Trends</CardTitle>
                    <CardDescription>Historical prediction accuracy trends</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <PredictionChart />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card className="bg-[#1a2233] border-[#2d3748]">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-white">Prediction History</CardTitle>
                      <CardDescription>Past predictions and their outcomes</CardDescription>
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by result" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Results</SelectItem>
                        <SelectItem value="correct">Correct Predictions</SelectItem>
                        <SelectItem value="incorrect">Incorrect Predictions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[#2d3748]">
                        <TableHead className="text-muted-foreground">Date</TableHead>
                        <TableHead className="text-muted-foreground">Match</TableHead>
                        <TableHead className="text-muted-foreground">Predicted</TableHead>
                        <TableHead className="text-muted-foreground">Actual</TableHead>
                        <TableHead className="text-muted-foreground">Confidence</TableHead>
                        <TableHead className="text-muted-foreground">Result</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-[#2d3748]">
                        <TableCell className="text-white">May 10, 2024</TableCell>
                        <TableCell className="text-white">Team Alpha vs Team Bravo</TableCell>
                        <TableCell className="text-white">3 - 1</TableCell>
                        <TableCell className="text-white">3 - 1</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">High</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">Correct</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-[#2d3748]">
                        <TableCell className="text-white">May 8, 2024</TableCell>
                        <TableCell className="text-white">Team Echo vs Team Foxtrot</TableCell>
                        <TableCell className="text-white">1 - 0</TableCell>
                        <TableCell className="text-white">2 - 2</TableCell>
                        <TableCell>
                          <Badge className="bg-yellow-500">Medium</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-red-500">Incorrect</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-[#2d3748]">
                        <TableCell className="text-white">May 5, 2024</TableCell>
                        <TableCell className="text-white">Team Golf vs Team Hotel</TableCell>
                        <TableCell className="text-white">2 - 1</TableCell>
                        <TableCell className="text-white">2 - 0</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">High</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">Correct</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="accuracy" className="space-y-6">
              <Card className="bg-[#1a2233] border-[#2d3748]">
                <CardHeader>
                  <CardTitle className="text-white">Prediction Accuracy Analysis</CardTitle>
                  <CardDescription>Detailed analysis of prediction accuracy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#131a29] p-4 rounded-md">
                      <h3 className="text-lg font-medium text-white mb-4">Accuracy by League</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-white">Premier League</span>
                          <div className="flex items-center">
                            <div className="w-32 bg-[#0d1117] rounded-full h-2 mr-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: "82%" }}></div>
                            </div>
                            <span className="text-white">82%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white">Champions League</span>
                          <div className="flex items-center">
                            <div className="w-32 bg-[#0d1117] rounded-full h-2 mr-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: "76%" }}></div>
                            </div>
                            <span className="text-white">76%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white">La Liga</span>
                          <div className="flex items-center">
                            <div className="w-32 bg-[#0d1117] rounded-full h-2 mr-2">
                              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "68%" }}></div>
                            </div>
                            <span className="text-white">68%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white">Bundesliga</span>
                          <div className="flex items-center">
                            <div className="w-32 bg-[#0d1117] rounded-full h-2 mr-2">
                              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                            </div>
                            <span className="text-white">65%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#131a29] p-4 rounded-md">
                      <h3 className="text-lg font-medium text-white mb-4">Accuracy by Prediction Type</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-white">Match Winner</span>
                          <div className="flex items-center">
                            <div className="w-32 bg-[#0d1117] rounded-full h-2 mr-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                            </div>
                            <span className="text-white">78%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white">Exact Score</span>
                          <div className="flex items-center">
                            <div className="w-32 bg-[#0d1117] rounded-full h-2 mr-2">
                              <div className="bg-red-500 h-2 rounded-full" style={{ width: "42%" }}></div>
                            </div>
                            <span className="text-white">42%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white">Over/Under Goals</span>
                          <div className="flex items-center">
                            <div className="w-32 bg-[#0d1117] rounded-full h-2 mr-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: "73%" }}></div>
                            </div>
                            <span className="text-white">73%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white">Both Teams to Score</span>
                          <div className="flex items-center">
                            <div className="w-32 bg-[#0d1117] rounded-full h-2 mr-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                            </div>
                            <span className="text-white">75%</span>
                          </div>
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
