"use client"

import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Edit, BarChart, PieChart } from "lucide-react"
import type { League } from "@/types/league"

interface LeagueTableProps {
  leagues: League[]
  isLoading?: boolean
  error?: string | null
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function LeagueTable({
  leagues,
  isLoading = false,
  error = null,
  page,
  totalPages,
  onPageChange,
}: LeagueTableProps) {
  const router = useRouter()

  const handleViewLeague = (id: string) => {
    router.push(`/league/management/${id}`)
  }

  const handleEditLeague = (id: string) => {
    router.push(`/league/editor/${id}`)
  }

  const handleViewAnalytics = (id: string) => {
    router.push(`/league/analytics/${id}`)
  }

  const handleViewStats = (id: string) => {
    router.push(`/league/stats/${id}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500 hover:bg-green-600"
      case "inactive":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "archived":
        return "bg-gray-500 hover:bg-gray-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  if (error) {
    return <div className="p-4 bg-red-900/20 rounded-md text-red-400">{error}</div>
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (leagues.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No leagues found. Try adjusting your filters or create a new league.
      </div>
    )
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Sport</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Seasons</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leagues.map((league) => (
            <TableRow
              key={league.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleViewLeague(league.id)}
            >
              <TableCell className="font-medium">{league.name}</TableCell>
              <TableCell>{league.sportType}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(league.status)}>
                  {league.status.charAt(0).toUpperCase() + league.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{league.seasons?.length || 0}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleViewStats(league.id)
                    }}
                    title="View Stats"
                  >
                    <PieChart className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleViewAnalytics(league.id)
                    }}
                    title="View Analytics"
                  >
                    <BarChart className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditLeague(league.id)
                    }}
                    title="Edit League"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <Button variant="outline" size="icon" onClick={() => onPageChange(page - 1)} disabled={page === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <Button variant="outline" size="icon" onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  )
}
