"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Edit, MapPin } from "lucide-react"
import type { Match } from "@/types/match"

interface MatchDetailProps {
  match: Match
  onEdit?: () => void
  onBack?: () => void
}

export function MatchDetail({ match, onEdit, onBack }: MatchDetailProps) {
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
    <Card className="bg-[#1a2233] border-[#2d3748]">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-white">Match Details</CardTitle>
            <CardDescription>
              {match.leagueName} - {match.seasonName}
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            {onEdit && (
              <Button variant="outline" size="sm" onClick={onEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Match
              </Button>
            )}
            {onBack && (
              <Button variant="outline" size="sm" onClick={onBack}>
                Back to Matches
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center py-6">
            <div className="flex items-center justify-center w-full">
              <div className="flex-1 text-right">
                <h3 className="text-xl font-bold text-white">{match.homeTeam}</h3>
                <p className="text-sm text-muted-foreground">Home</p>
              </div>

              <div className="mx-6 text-center">
                {match.status === "completed" ? (
                  <div className="text-3xl font-bold text-white">
                    {match.homeScore} - {match.awayScore}
                  </div>
                ) : (
                  <Badge className={getStatusColor(match.status)}>{match.status}</Badge>
                )}
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">{match.awayTeam}</h3>
                <p className="text-sm text-muted-foreground">Away</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#131a29] p-4 rounded-md">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="text-white">{match.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="text-white">{match.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Venue</p>
                <p className="text-white">{match.venue}</p>
              </div>
            </div>
          </div>

          {match.status === "completed" && match.stats && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Match Statistics</h3>

              <div className="space-y-3">
                {Object.entries(match.stats).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-3 items-center">
                    <div className="text-right text-white">{value.home}</div>
                    <div className="text-center text-sm text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </div>
                    <div className="text-white">{value.away}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
