"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowDown, ArrowUp, Minus } from "lucide-react"
import type { TeamStanding } from "@/types/team"

interface StandingsTableProps {
  standings: TeamStanding[]
}

export function StandingsTable({ standings = [] }: StandingsTableProps) {
  const getPositionIndicator = (position: number, prevPosition?: number) => {
    if (!prevPosition) return null

    const diff = prevPosition - position

    if (diff === 0) {
      return <Minus className="h-3 w-3 text-gray-400" />
    }

    if (diff > 0) {
      return <ArrowUp className="h-3 w-3 text-green-500" />
    }

    return <ArrowDown className="h-3 w-3 text-red-500" />
  }

  const getPositionClass = (position: number) => {
    // Highlight promotion and relegation positions
    if (position <= 4) return "text-green-500"
    if (position >= standings.length - 2) return "text-red-500"
    return ""
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-[#2d3748]">
          <TableHead className="text-muted-foreground">Pos</TableHead>
          <TableHead className="text-muted-foreground">Team</TableHead>
          <TableHead className="text-muted-foreground text-center">P</TableHead>
          <TableHead className="text-muted-foreground text-center">W</TableHead>
          <TableHead className="text-muted-foreground text-center">D</TableHead>
          <TableHead className="text-muted-foreground text-center">L</TableHead>
          <TableHead className="text-muted-foreground text-center">GF</TableHead>
          <TableHead className="text-muted-foreground text-center">GA</TableHead>
          <TableHead className="text-muted-foreground text-center">GD</TableHead>
          <TableHead className="text-muted-foreground text-center">Pts</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {standings.length === 0 ? (
          <TableRow className="border-[#2d3748]">
            <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
              No standings data available.
            </TableCell>
          </TableRow>
        ) : (
          standings.map((team) => (
            <TableRow key={team.id} className="border-[#2d3748]">
              <TableCell className={getPositionClass(team.position)}>
                <div className="flex items-center gap-1">
                  <span>{team.position}</span>
                  {getPositionIndicator(team.position, team.prevPosition)}
                </div>
              </TableCell>
              <TableCell className="font-medium text-white">{team.name}</TableCell>
              <TableCell className="text-center">{team.played}</TableCell>
              <TableCell className="text-center">{team.won}</TableCell>
              <TableCell className="text-center">{team.drawn}</TableCell>
              <TableCell className="text-center">{team.lost}</TableCell>
              <TableCell className="text-center">{team.goalsFor}</TableCell>
              <TableCell className="text-center">{team.goalsAgainst}</TableCell>
              <TableCell className="text-center">{team.goalDifference}</TableCell>
              <TableCell className="text-center font-bold text-white">{team.points}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
