"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"

interface Champion {
  id: string
  name: string
  title: string
  stats: {
    health: number
    mana: number
    armor: number
    attackDamage: number
    attackSpeed: number
    moveSpeed: number
  }
}

const mockChampions: Champion[] = [
  {
    id: "1",
    name: "Ahri",
    title: "the Nine-Tailed Fox",
    stats: {
      health: 526,
      mana: 418,
      armor: 20.88,
      attackDamage: 53.04,
      attackSpeed: 0.668,
      moveSpeed: 330,
    },
  },
  {
    id: "2",
    name: "Darius",
    title: "the Hand of Noxus",
    stats: {
      health: 582.24,
      mana: 263,
      armor: 39,
      attackDamage: 64,
      attackSpeed: 0.625,
      moveSpeed: 340,
    },
  },
]

export function ChampionEditor() {
  const [champions] = useState<Champion[]>(mockChampions)
  const [selectedChampion, setSelectedChampion] = useState<Champion | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredChampions = champions.filter((champion) =>
    champion.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardContent className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search champions..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            {filteredChampions.map((champion) => (
              <Button
                key={champion.id}
                variant={selectedChampion?.id === champion.id ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedChampion(champion)}
              >
                {champion.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardContent className="p-4">
          {selectedChampion ? (
            <Tabs defaultValue="basic">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="stats">Stats</TabsTrigger>
                <TabsTrigger value="abilities">Abilities</TabsTrigger>
              </TabsList>
              <TabsContent value="basic" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue={selectedChampion.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" defaultValue={selectedChampion.title} />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="stats" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="health">Health</Label>
                      <span>{selectedChampion.stats.health}</span>
                    </div>
                    <Slider id="health" defaultValue={[selectedChampion.stats.health]} max={1000} step={1} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="mana">Mana</Label>
                      <span>{selectedChampion.stats.mana}</span>
                    </div>
                    <Slider id="mana" defaultValue={[selectedChampion.stats.mana]} max={1000} step={1} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="armor">Armor</Label>
                      <span>{selectedChampion.stats.armor}</span>
                    </div>
                    <Slider id="armor" defaultValue={[selectedChampion.stats.armor]} max={100} step={0.1} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="attackDamage">Attack Damage</Label>
                      <span>{selectedChampion.stats.attackDamage}</span>
                    </div>
                    <Slider
                      id="attackDamage"
                      defaultValue={[selectedChampion.stats.attackDamage]}
                      max={100}
                      step={0.1}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="abilities" className="pt-4">
                <p className="text-muted-foreground">Ability editor coming soon...</p>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Select a champion to edit</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
