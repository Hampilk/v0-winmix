"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Check, Edit, Eye, MoreHorizontal, Plus, Search, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { League } from "@/types/league"

interface LeagueTableProps {
  leagues: League[]
  onView?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onConfirm?: (id: string) => void
  onAddNew?: () => void
}

export function LeagueTable({ leagues = [], onView, onEdit, onDelete, onConfirm, onAddNew }: LeagueTableProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredLeagues = leagues.filter(
    (league) =>
      league.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      league.status.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search leagues..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {onAddNew && (
          <Button onClick={onAddNew}>
            <Plus className="mr-2 h-4 w-4" />
            New League
          </Button>
        )}
      </div>

      <div className="rounded-md border border-[#2d3748] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#131a29]">
              <TableHead className="text-white">Season</TableHead>
              <TableHead className="text-white">Winner</TableHead>
              <TableHead className="text-white">Second Place</TableHead>
              <TableHead className="text-white">Third Place</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeagues.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No leagues found. {onAddNew && "Create a new league to get started."}
                </TableCell>
              </TableRow>
            ) : (
              filteredLeagues.map((league) => (
                <TableRow key={league.id} className="border-[#2d3748]">
                  <TableCell className="font-medium text-white">{league.name}</TableCell>
                  <TableCell>{league.winner || "-"}</TableCell>
                  <TableCell>{league.secondPlace || "-"}</TableCell>
                  <TableCell>{league.thirdPlace || "-"}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        league.status === "In Progress"
                          ? "bg-yellow-500"
                          : league.status === "Completed"
                            ? "bg-green-500"
                            : league.status === "Upcoming"
                              ? "bg-blue-500"
                              : "bg-gray-500"
                      }
                    >
                      {league.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {onView && (
                        <Button variant="ghost" size="icon" onClick={() => onView(league.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      {onEdit && (
                        <Button variant="ghost" size="icon" onClick={() => onEdit(league.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {onConfirm && (
                        <Button variant="ghost" size="icon" onClick={() => onConfirm(league.id)}>
                          <Check className="h-4 w-4" />
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
                            <DropdownMenuItem className="text-red-500" onClick={() => onDelete(league.id)}>
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
