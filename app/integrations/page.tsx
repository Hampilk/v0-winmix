import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, Globe, BarChart, RefreshCw, Shield, Settings } from "lucide-react"

export default function IntegrationsView() {
  return (
    <div className="flex min-h-screen bg-[#0d1117]">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Integrations</h1>
              <p className="text-muted-foreground">Connect with external data sources and services</p>
            </div>
            <Button>Add New Integration</Button>
          </div>

          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="active">Active Integrations</TabsTrigger>
              <TabsTrigger value="available">Available Integrations</TabsTrigger>
              <TabsTrigger value="settings">Integration Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-[#1a2233] border-[#2d3748]">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-white">Sports API</CardTitle>
                        <CardDescription>Live sports data provider</CardDescription>
                      </div>
                      <Badge className="bg-green-500">Connected</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-blue-500/20 p-3 rounded-full">
                        <Globe className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Last sync: 15 minutes ago</p>
                        <p className="text-sm text-muted-foreground">Data: Match results, player stats</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Sync Now
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-[#1a2233] border-[#2d3748]">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-white">Analytics Engine</CardTitle>
                        <CardDescription>Advanced sports analytics</CardDescription>
                      </div>
                      <Badge className="bg-green-500">Connected</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-purple-500/20 p-3 rounded-full">
                        <BarChart className="h-6 w-6 text-purple-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Last sync: 2 hours ago</p>
                        <p className="text-sm text-muted-foreground">Data: Performance metrics, predictions</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Sync Now
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-[#1a2233] border-[#2d3748]">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-white">Team Database</CardTitle>
                        <CardDescription>Internal team data storage</CardDescription>
                      </div>
                      <Badge className="bg-green-500">Connected</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-green-500/20 p-3 rounded-full">
                        <Database className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Last sync: 30 minutes ago</p>
                        <p className="text-sm text-muted-foreground">Data: Team rosters, training data</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Sync Now
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="available" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-[#1a2233] border-[#2d3748]">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-white">Video Analysis API</CardTitle>
                        <CardDescription>Automated video analysis service</CardDescription>
                      </div>
                      <Badge variant="outline">Available</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-gray-500/20 p-3 rounded-full">
                        <Shield className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Provides: Player movement tracking, heat maps</p>
                        <p className="text-sm text-muted-foreground">Pricing: $99/month</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Connect</Button>
                  </CardFooter>
                </Card>

                <Card className="bg-[#1a2233] border-[#2d3748]">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-white">Weather Data</CardTitle>
                        <CardDescription>Real-time weather conditions</CardDescription>
                      </div>
                      <Badge variant="outline">Available</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-gray-500/20 p-3 rounded-full">
                        <Shield className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Provides: Match day weather forecasts</p>
                        <p className="text-sm text-muted-foreground">Pricing: Free tier available</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Connect</Button>
                  </CardFooter>
                </Card>

                <Card className="bg-[#1a2233] border-[#2d3748]">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-white">Social Media Analytics</CardTitle>
                        <CardDescription>Fan engagement metrics</CardDescription>
                      </div>
                      <Badge variant="outline">Available</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-gray-500/20 p-3 rounded-full">
                        <Shield className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Provides: Fan sentiment analysis, engagement stats
                        </p>
                        <p className="text-sm text-muted-foreground">Pricing: $49/month</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Connect</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card className="bg-[#1a2233] border-[#2d3748]">
                <CardHeader>
                  <CardTitle className="text-white">Integration Settings</CardTitle>
                  <CardDescription>Configure global integration settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-sync">Automatic Synchronization</Label>
                      <p className="text-sm text-muted-foreground">Automatically sync data at regular intervals</p>
                    </div>
                    <Switch id="auto-sync" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">Integration Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications about integration status</p>
                    </div>
                    <Switch id="notifications" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sync-interval">Sync Interval (minutes)</Label>
                    <Input id="sync-interval" type="number" defaultValue="30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-key">Default API Key</Label>
                    <Input id="api-key" type="password" value="••••••••••••••••" />
                  </div>
                  <div className="pt-4 flex justify-end space-x-2">
                    <Button variant="outline">Reset</Button>
                    <Button>Save Settings</Button>
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
