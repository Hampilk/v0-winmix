"use client"

import { memo } from "react"
import { ArrowDown, ArrowUp, Minus } from "lucide-react"
import type { TeamForm } from "@/types/team"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface FormTableProps {
  teamForm?: TeamForm[]
}

const FORM_COLORS = {
  W: "bg-emerald-500 hover:bg-emerald-600",
  D: "bg-amber-500 hover:bg-amber-600",
  L: "bg-red-500 hover:bg-red-600",
} as const

const FormResult = memo<{ result?: "W" | "D" | "L" }>(({ result }) => {
  if (!result) return null

  return (
    <span className="w-6 h-6 flex items-center justify-center text-xs font-semibold text-white rounded transition-colors">
      <span className={`${FORM_COLORS[result]} px-2 py-1 rounded`}>
        {result === "W" ? "Win" : result === "D" ? "Draw" : "Loss"}
      </span>
    </span>
  )
})
FormResult.displayName = "FormResult"

const PositionIndicator = memo<{ position?: number; prevPosition?: number }>(({ position, prevPosition }) => {
  if (!prevPosition) return <span>{position}</span>

  const diff = prevPosition - position

  if (diff === 0) {
    return (
      <span className="flex items-center gap-1">
        <span>{position}</span>
        <Minus className="h-3 w-3 text-gray-400" />
      </span>
    )
  }

  return (
    <span className="flex items-center gap-1">
      <span>{position}</span>
      {diff > 0 ? <ArrowUp className="h-3 w-3 text-green-500" /> : <ArrowDown className="h-3 w-3 text-red-500" />}
      <span className="text-xs text-gray-400">{Math.abs(diff)}</span>
    </span>
  )
})
PositionIndicator.displayName = "PositionIndicator"

export function FormTable({ teamForm = [] }: FormTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Position</TableHead>
          <TableHead>Team</TableHead>
          <TableHead className="text-center">P</TableHead>
          <TableHead className="text-center">W</TableHead>
          <TableHead className="text-center">D</TableHead>
          <TableHead className="text-center">L</TableHead>
          <TableHead className="text-center">GF</TableHead>
          <TableHead className="text-center">GA</TableHead>
          <TableHead className="text-center">GD</TableHead>
          <TableHead className="text-center">Pts</TableHead>
          <TableHead className="text-center">Form</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teamForm.map((team) => (
          <TableRow key={team.id}>
            <TableCell>
              <PositionIndicator position={team.position} prevPosition={team.prevPosition} />
            </TableCell>
            <TableCell className="font-medium">{team.name}</TableCell>
            <TableCell className="text-center">{team.played}</TableCell>
            <TableCell className="text-center">{team.won}</TableCell>
            <TableCell className="text-center">{team.drawn}</TableCell>
            <TableCell className="text-center">{team.lost}</TableCell>
            <TableCell className="text-center">{team.goalsFor}</TableCell>
            <TableCell className="text-center">{team.goalsAgainst}</TableCell>
            <TableCell className="text-center">{team.goalDifference}</TableCell>
            <TableCell className="text-center font-bold">{team.points}</TableCell>
            <TableCell>
              <div className="flex gap-1 justify-center">
                {team.recentForm?.map((result, index) => (
                  <FormResult key={index} result={result} />
                ))}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
