"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowUpDown } from "lucide-react"

interface Change {
  id: string
  entityType: "champion" | "item" | "rune" | "spell"
  entityName: string
  property: string
  oldValue: string
  newValue: string
  timestamp: Date
}

const mockChanges: Change[] = [
  {
    id: "1",
    entityType: "champion",
    entityName: "Ahri",
    property: "health",
    oldValue: "526",
    newValue: "530",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    id: "2",
    entityType: "item",
    entityName: "B.F. Sword",
    property: "cost",
    oldValue: "1300",
    newValue: "1350",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: "3",
    entityType: "rune",
    entityName: "Press the Attack",
    property: "description",
    oldValue: "...",
    newValue: "Updated description",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
  },
]

export function RecentChanges() {
  const [changes] = useState<Change[]>(mockChanges)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const sortedChanges = [...changes].sort((a, b) => {
    if (sortDirection === "desc") {
      return b.timestamp.getTime() - a.timestamp.getTime()
    } else {
      return a.timestamp.getTime() - b.timestamp.getTime()
    }
  })

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

    let interval = seconds / 3600
    if (interval > 1) {
      return Math.floor(interval) + " hours ago"
    }

    interval = seconds / 60
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago"
    }

    return Math.floor(seconds) + " seconds ago"
  }

  const getEntityTypeColor = (type: string) => {
    switch (type) {
      case "champion":
        return "bg-blue-500"
      case "item":
        return "bg-yellow-500"
      case "rune":
        return "bg-purple-500"
      case "spell":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          className="text-xs"
          onClick={() => setSortDirection(sortDirection === "desc" ? "asc" : "desc")}
        >
          <ArrowUpDown className="h-3 w-3 mr-1" />
          {sortDirection === "desc" ? "Newest first" : "Oldest first"}
        </Button>
      </div>
      <div className="space-y-3">
        {sortedChanges.map((change) => (
          <div key={change.id} className="flex items-start space-x-2 text-sm">
            <Badge variant="outline" className={getEntityTypeColor(change.entityType)}>
              {change.entityType}
            </Badge>
            <div className="flex-1">
              <p className="font-medium">{change.entityName}</p>
              <p className="text-muted-foreground">
                Changed {change.property} from {change.oldValue} to {change.newValue}
              </p>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {formatTimeAgo(change.timestamp)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
