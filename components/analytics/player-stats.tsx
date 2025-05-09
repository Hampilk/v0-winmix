"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample data for the player stats
const playerStatsData = [
  {
    id: "1",
    name: "John Smith",
    position: "Forward",
    team: "Team Alpha",
    goals: 12,
    assists: 5,
    rating: 8.4,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Michael Johnson",
    position: "Midfielder",
    team: "Team Bravo",
    goals: 8,
    assists: 10,
    rating: 8.2,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "David Williams",
    position: "Defender",
    team: "Team Charlie",
    goals: 2,
    assists: 3,
    rating: 7.9,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Robert Brown",
    position: "Midfielder",
    team: "Team Alpha",
    goals: 6,
    assists: 8,
    rating: 7.8,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "James Davis",
    position: "Forward",
    team: "Team Delta",
    goals: 10,
    assists: 3,
    rating: 7.7,
    image: "/placeholder.svg?height=40&width=40",
  },
]

export function PlayerStats() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Player</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Team</TableHead>
          <TableHead>Goals</TableHead>
          <TableHead>Assists</TableHead>
          <TableHead>Rating</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {playerStatsData.map((player) => (
          <TableRow key={player.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={player.image || "/placeholder.svg"} alt={player.name} />
                  <AvatarFallback>{player.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="font-medium">{player.name}</div>
              </div>
            </TableCell>
            <TableCell>{player.position}</TableCell>
            <TableCell>{player.team}</TableCell>
            <TableCell>{player.goals}</TableCell>
            <TableCell>{player.assists}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Progress value={player.rating * 10} className="h-2 w-16" />
                <span>{player.rating.toFixed(1)}</span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
