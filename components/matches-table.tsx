"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Edit, Eye, MoreHorizontal, Plus, Search, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Match } from "@/types/match"

interface MatchesTableProps {
  matches: Match[]
  onView?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onAddNew?: () => void
}

export function MatchesTable({ matches = [], onView, onEdit, onDelete, onAddNew }: MatchesTableProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMatches = matches.filter(
    (match) =>
      match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.leagueName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.status.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500"
      case "scheduled":
        return "bg-blue-500"
      case "live":
        return "bg-red-500"
      case "postponed":
        return "bg-yellow-500"
      case "cancelled":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search matches..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {onAddNew && (
          <Button onClick={onAddNew}>
            <Plus className="mr-2 h-4 w-4" />
            Add Match
          </Button>
        )}
      </div>

      <div className="rounded-md border border-[#2d3748] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#131a29]">
              <TableHead className="text-white">Date</TableHead>
              <TableHead className="text-white">Home Team</TableHead>
              <TableHead className="text-white">Away Team</TableHead>
              <TableHead className="text-white">Score</TableHead>
              <TableHead className="text-white">League</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMatches.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No matches found. {onAddNew && "Add a new match to get started."}
                </TableCell>
              </TableRow>
            ) : (
              filteredMatches.map((match) => (
                <TableRow key={match.id} className="border-[#2d3748]">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {match.date}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-white">{match.homeTeam}</TableCell>
                  <TableCell className="font-medium text-white">{match.awayTeam}</TableCell>
                  <TableCell>
                    {match.status === "completed" ? (
                      <span className="font-medium text-white">
                        {match.homeScore} - {match.awayScore}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>{match.leagueName}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(match.status)}>{match.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {onView && (
                        <Button variant="ghost" size="icon" onClick={() => onView(match.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      {onEdit && (
                        <Button variant="ghost" size="icon" onClick={() => onEdit(match.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {onDelete && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="text-red-500" onClick={() => onDelete(match.id)}>
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
