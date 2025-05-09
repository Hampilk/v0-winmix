"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"

interface Spell {
  id: string
  name: string
  description: string
  cooldown: number
  range: number
}

const mockSpells: Spell[] = [
  {
    id: "1",
    name: "Flash",
    description: "Teleports your champion a short distance toward your cursor's location.",
    cooldown: 300,
    range: 400,
  },
  {
    id: "2",
    name: "Ignite",
    description: "Ignites target enemy champion, dealing true damage over 5 seconds and applying Grievous Wounds.",
    cooldown: 180,
    range: 600,
  },
]

export function SpellEditor() {
  const [spells] = useState<Spell[]>(mockSpells)
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSpells = spells.filter((spell) => spell.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardContent className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search spells..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            {filteredSpells.map((spell) => (
              <Button
                key={spell.id}
                variant={selectedSpell?.id === spell.id ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedSpell(spell)}
              >
                {spell.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardContent className="p-4">
          {selectedSpell ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={selectedSpell.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" defaultValue={selectedSpell.description} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cooldown">Cooldown (seconds)</Label>
                  <Input id="cooldown" type="number" defaultValue={selectedSpell.cooldown} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="range">Range</Label>
                  <Input id="range" type="number" defaultValue={selectedSpell.range} />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Select a spell to edit</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
