"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Edit, Trash } from "lucide-react"
import type { League } from "@/types/league"

interface LeagueDetailsProps {
  league: League
  onEdit?: () => void
  onDelete?: () => void
}

export function LeagueDetails({ league, onEdit, onDelete }: LeagueDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

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
    <Card className="bg-[#1a2233] border-[#2d3748]">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-white">{league.name}</CardTitle>
            <CardDescription>{league.description}</CardDescription>
            <div className="flex items-center mt-2 gap-2">
              <Badge className={getStatusColor(league.status)}>{league.status}</Badge>
              <span className="text-sm text-muted-foreground">ID: {league.id}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            {onEdit && (
              <Button variant="ghost" size="icon" onClick={onEdit}>
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button variant="ghost" size="icon" className="text-red-500" onClick={onDelete}>
                <Trash className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Sport Type</h3>
              <p className="text-white">{league.sportType || "Soccer"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Country</h3>
              <p className="text-white">{league.country || "International"}</p>
            </div>
          </div>

          {league.seasons && league.seasons.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Current Season</h3>
              <div className="bg-[#131a29] p-3 rounded-md">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-white">{league.seasons[0].name}</span>
                  </div>
                  <Badge variant="outline">{league.seasons[0].status}</Badge>
                </div>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-[#2d3748]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Start Date:</span>
                        <span className="text-white ml-2">{league.seasons[0].startDate}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">End Date:</span>
                        <span className="text-white ml-2">{league.seasons[0].endDate}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-xs w-full"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Show Less" : "Show More"}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
