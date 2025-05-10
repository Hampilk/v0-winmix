import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function LeaguesPage() {
  // Mock data for leagues
  const leagues = [
    { id: 1, name: "Premier League", country: "England", teams: 20, status: "active" },
    { id: 2, name: "La Liga", country: "Spain", teams: 20, status: "active" },
    { id: 3, name: "Bundesliga", country: "Germany", teams: 18, status: "active" },
    { id: 4, name: "Serie A", country: "Italy", teams: 20, status: "active" },
    { id: 5, name: "Ligue 1", country: "France", teams: 20, status: "active" },
  ]

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leagues</h1>
          <p className="text-muted-foreground">Manage your sports leagues</p>
        </div>
        <Button>Add New League</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Leagues</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Teams</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leagues.map((league) => (
                <TableRow key={league.id}>
                  <TableCell className="font-medium">{league.name}</TableCell>
                  <TableCell>{league.country}</TableCell>
                  <TableCell>{league.teams}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      {league.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
