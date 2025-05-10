import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PatternRecognitionChart } from "@/components/pattern-recognition-chart"
import { PatternList } from "@/components/pattern-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardSidebar } from "@/components/sidebar"

export default function AdvancedPatternPage() {
  return (
    <div className="flex min-h-screen bg-[#0d1117]">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Advanced Pattern Recognition</h1>
              <p className="text-muted-foreground">Analyze and identify complex patterns in match data</p>
            </div>
            <Button>Run New Analysis</Button>
          </div>

          <Tabs defaultValue="patterns" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="patterns">Detected Patterns</TabsTrigger>
              <TabsTrigger value="analysis">Pattern Analysis</TabsTrigger>
              <TabsTrigger value="settings">Recognition Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="patterns" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-1 bg-[#1a2233] border-[#2d3748]">
                  <CardHeader>
                    <CardTitle className="text-white">Pattern Categories</CardTitle>
                    <CardDescription>Filter by pattern type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PatternList />
                  </CardContent>
                </Card>

                <Card className="md:col-span-2 bg-[#1a2233] border-[#2d3748]">
                  <CardHeader>
                    <CardTitle className="text-white">Pattern Visualization</CardTitle>
                    <CardDescription>Visual representation of selected pattern</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px]">
                    <PatternRecognitionChart />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              <Card className="bg-[#1a2233] border-[#2d3748]">
                <CardHeader>
                  <CardTitle className="text-white">Pattern Analysis</CardTitle>
                  <CardDescription>Detailed analysis of detected patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="pattern-type">Pattern Type</Label>
                        <Select defaultValue="offensive">
                          <SelectTrigger id="pattern-type">
                            <SelectValue placeholder="Select pattern type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="offensive">Offensive Patterns</SelectItem>
                            <SelectItem value="defensive">Defensive Patterns</SelectItem>
                            <SelectItem value="transition">Transition Patterns</SelectItem>
                            <SelectItem value="set-piece">Set Piece Patterns</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="time-period">Time Period</Label>
                        <Select defaultValue="full-season">
                          <SelectTrigger id="time-period">
                            <SelectValue placeholder="Select time period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="last-match">Last Match</SelectItem>
                            <SelectItem value="last-5">Last 5 Matches</SelectItem>
                            <SelectItem value="last-10">Last 10 Matches</SelectItem>
                            <SelectItem value="full-season">Full Season</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="confidence">Confidence Level</Label>
                        <Select defaultValue="high">
                          <SelectTrigger id="confidence">
                            <SelectValue placeholder="Select confidence level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low (60%+)</SelectItem>
                            <SelectItem value="medium">Medium (75%+)</SelectItem>
                            <SelectItem value="high">High (90%+)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="h-[300px] bg-[#131a29] rounded-md p-4 flex items-center justify-center">
                      <p className="text-muted-foreground">Select a pattern to view detailed analysis</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card className="bg-[#1a2233] border-[#2d3748]">
                <CardHeader>
                  <CardTitle className="text-white">Recognition Settings</CardTitle>
                  <CardDescription>Configure pattern recognition parameters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="min-occurrences">Minimum Occurrences</Label>
                        <Input id="min-occurrences" type="number" defaultValue="3" />
                      </div>
                      <div>
                        <Label htmlFor="confidence-threshold">Confidence Threshold (%)</Label>
                        <Input id="confidence-threshold" type="number" defaultValue="75" />
                      </div>
                      <div>
                        <Label htmlFor="pattern-duration">Pattern Duration (seconds)</Label>
                        <Input id="pattern-duration" type="number" defaultValue="15" />
                      </div>
                      <div>
                        <Label htmlFor="max-patterns">Maximum Patterns to Detect</Label>
                        <Input id="max-patterns" type="number" defaultValue="50" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="algorithm">Recognition Algorithm</Label>
                      <Select defaultValue="sequential">
                        <SelectTrigger id="algorithm">
                          <SelectValue placeholder="Select algorithm" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sequential">Sequential Pattern Mining</SelectItem>
                          <SelectItem value="clustering">Clustering-based Recognition</SelectItem>
                          <SelectItem value="neural">Neural Network Recognition</SelectItem>
                          <SelectItem value="hybrid">Hybrid Approach</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Reset to Defaults</Button>
                      <Button>Save Settings</Button>
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
