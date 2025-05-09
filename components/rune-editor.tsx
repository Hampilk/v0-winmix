"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"

interface Rune {
  id: string
  name: string
  description: string
  path: string
  tier: number
}

const mockRunes: Rune[] = [
  {
    id: "1",
    name: "Press the Attack",
    description:
      "Hitting an enemy champion 3 consecutive times makes them vulnerable, dealing bonus damage and causing them to take more damage from all sources for 6s.",
    path: "Precision",
    tier: 1,
  },
  {
    id: "2",
    name: "Electrocute",
    description: "Hitting a champion with 3 separate attacks or abilities within 3s deals bonus adaptive damage.",
    path: "Domination",
    tier: 1,
  },
]

export function RuneEditor() {
  const [runes] = useState<Rune[]>(mockRunes)
  const [selectedRune, setSelectedRune] = useState<Rune | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRunes = runes.filter((rune) => rune.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardContent className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search runes..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            {filteredRunes.map((rune) => (
              <Button
                key={rune.id}
                variant={selectedRune?.id === rune.id ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedRune(rune)}
              >
                {rune.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardContent className="p-4">
          {selectedRune ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={selectedRune.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" defaultValue={selectedRune.description} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="path">Path</Label>
                  <Input id="path" defaultValue={selectedRune.path} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tier">Tier</Label>
                  <Input id="tier" type="number" defaultValue={selectedRune.tier} />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Select a rune to edit</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
