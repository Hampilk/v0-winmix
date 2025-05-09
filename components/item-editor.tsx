"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"

interface Item {
  id: string
  name: string
  description: string
  cost: number
  stats: {
    [key: string]: number
  }
}

const mockItems: Item[] = [
  {
    id: "1",
    name: "B.F. Sword",
    description: "Greatly increases Attack Damage.",
    cost: 1300,
    stats: {
      attackDamage: 40,
    },
  },
  {
    id: "2",
    name: "Needlessly Large Rod",
    description: "Greatly increases Ability Power.",
    cost: 1250,
    stats: {
      abilityPower: 60,
    },
  },
]

export function ItemEditor() {
  const [items] = useState<Item[]>(mockItems)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredItems = items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardContent className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            {filteredItems.map((item) => (
              <Button
                key={item.id}
                variant={selectedItem?.id === item.id ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedItem(item)}
              >
                {item.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardContent className="p-4">
          {selectedItem ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={selectedItem.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" defaultValue={selectedItem.description} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">Cost</Label>
                <Input id="cost" type="number" defaultValue={selectedItem.cost} />
              </div>
              <div className="space-y-2">
                <Label>Stats</Label>
                {Object.entries(selectedItem.stats).map(([stat, value]) => (
                  <div key={stat} className="grid grid-cols-2 gap-4 items-center">
                    <Label htmlFor={stat}>{stat}</Label>
                    <Input id={stat} type="number" defaultValue={value} />
                  </div>
                ))}
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Select an item to edit</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
