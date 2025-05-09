"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Edit, Trash2, Eye } from "lucide-react"

// Sample data for patterns
const samplePatterns = [
  {
    id: "1",
    name: "Offensive Formation Alpha",
    type: "offensive",
    complexity: "high",
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-06-20T14:45:00Z",
  },
  {
    id: "2",
    name: "Defensive Counter Beta",
    type: "defensive",
    complexity: "medium",
    createdAt: "2023-04-10T09:15:00Z",
    updatedAt: "2023-06-18T11:20:00Z",
  },
  {
    id: "3",
    name: "Transition Play Gamma",
    type: "transition",
    complexity: "low",
    createdAt: "2023-06-05T16:45:00Z",
    updatedAt: "2023-06-15T13:10:00Z",
  },
  {
    id: "4",
    name: "Set Piece Delta",
    type: "set-piece",
    complexity: "medium",
    createdAt: "2023-03-22T08:30:00Z",
    updatedAt: "2023-06-10T09:55:00Z",
  },
  {
    id: "5",
    name: "Counter Attack Epsilon",
    type: "counter",
    complexity: "high",
    createdAt: "2023-05-30T14:20:00Z",
    updatedAt: "2023-06-05T15:40:00Z",
  },
]

interface Pattern {
  id: string
  name: string
  type: string
  complexity: string
  createdAt: string
  updatedAt: string
}

interface PatternListProps {
  patterns?: Pattern[]
  onSelect?: (pattern: Pattern) => void
  onDelete?: (patternId: string) => void
  onEdit?: (pattern: Pattern) => void
}

export function PatternList({
  patterns = samplePatterns,
  onSelect = () => {},
  onDelete = () => {},
  onEdit = () => {},
}: PatternListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPatterns = patterns.filter(
    (pattern) =>
      pattern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pattern.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "offensive":
        return "bg-blue-500"
      case "defensive":
        return "bg-red-500"
      case "transition":
        return "bg-purple-500"
      case "set-piece":
        return "bg-orange-500"
      case "counter":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pattern Library</CardTitle>
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search patterns..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Complexity</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatterns.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                  No patterns found. Try adjusting your search.
                </TableCell>
              </TableRow>
            ) : (
              filteredPatterns.map((pattern) => (
                <TableRow key={pattern.id}>
                  <TableCell className="font-medium">{pattern.name}</TableCell>
                  <TableCell>
                    <Badge className={`${getTypeColor(pattern.type)} text-white`}>
                      {pattern.type.charAt(0).toUpperCase() + pattern.type.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getComplexityColor(pattern.complexity)} text-white`}>
                      {pattern.complexity.charAt(0).toUpperCase() + pattern.complexity.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(pattern.updatedAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => onSelect(pattern)} title="View Pattern">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => onEdit(pattern)} title="Edit Pattern">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => onDelete(pattern.id)} title="Delete Pattern">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
