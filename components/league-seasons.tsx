"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, Eye, Plus } from "lucide-react"
import type { LeagueSeason } from "@/types/league"

interface LeagueSeasonsProps {
  seasons: LeagueSeason[]
  onAddMatch?: (seasonId: string) => void
  onViewMatches?: (seasonId: string) => void
  onEditSeason?: (seasonId: string) => void
}

export function LeagueSeasons({ seasons = [], onAddMatch, onViewMatches, onEditSeason }: LeagueSeasonsProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500"
      case "completed":
        return "bg-blue-500"
      case "upcoming":
        return "bg-yellow-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="rounded-md border border-[#2d3748] overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#131a29]">
            <TableHead className="text-white">Season</TableHead>
            <TableHead className="text-white">Start Date</TableHead>
            <TableHead className="text-white">End Date</TableHead>
            <TableHead className="text-white">Matches</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {seasons.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No seasons found. Create a new season to get started.
              </TableCell>
            </TableRow>
          ) : (
            seasons.map((season) => (
              <TableRow key={season.id} className="border-[#2d3748]">
                <TableCell className="font-medium text-white">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {season.name}
                  </div>
                </TableCell>
                <TableCell>{season.startDate}</TableCell>
                <TableCell>{season.endDate}</TableCell>
                <TableCell>{season.matchCount || 0}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(season.status)}>{season.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    {onAddMatch && (
                      <Button variant="ghost" size="sm" onClick={() => onAddMatch(season.id)}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add Match
                      </Button>
                    )}
                    {onViewMatches && (
                      <Button variant="ghost" size="sm" onClick={() => onViewMatches(season.id)}>
                        <Eye className="h-4 w-4 mr-1" />
                        View Matches
                      </Button>
                    )}
                    {onEditSeason && (
                      <Button variant="ghost" size="sm" onClick={() => onEditSeason(season.id)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
