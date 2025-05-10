"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardHeader } from "@/components/dashboard-header"

// Mock data and services until we implement the actual data fetching
const fetchLeagueById = async (id: string) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    id,
    name: "Premier League",
    description: "English top division",
    sportType: "soccer",
    status: "active",
    seasons: [],
  }
}

const createLeague = async (league: any) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return { ...league, id: "new-league-id" }
}

const updateLeague = async (id: string, league: any) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return { ...league, id }
}

// League Form Component
const LeagueForm = ({ league, onChange, onSubmit }: any) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(e)
      }}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">League Name</Label>
          <Input
            id="name"
            value={league.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="Enter league name"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={league.description}
            onChange={(e) => onChange("description", e.target.value)}
            placeholder="Enter league description"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="sportType">Sport Type</Label>
            <Select value={league.sportType} onValueChange={(value) => onChange("sportType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select sport type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="soccer">Soccer</SelectItem>
                <SelectItem value="basketball">Basketball</SelectItem>
                <SelectItem value="hockey">Hockey</SelectItem>
                <SelectItem value="baseball">Baseball</SelectItem>
                <SelectItem value="american-football">American Football</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={league.status} onValueChange={(value) => onChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </form>
  )
}

export default function LeagueEditorView() {
  const params = useParams<{ id: string }>()
  const id = params.id as string
  const router = useRouter()
  const isNewLeague = id === "new"

  const [league, setLeague] = useState<any>({
    name: "",
    description: "",
    sportType: "soccer",
    status: "active",
    seasons: [],
  })

  const [isLoading, setIsLoading] = useState(!isNewLeague)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    const getLeague = async () => {
      if (isNewLeague) {
        return
      }

      try {
        const data = await fetchLeagueById(id)
        setLeague(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch league:", error)
        setError("Failed to load league data. Please try again.")
        setIsLoading(false)
      }
    }

    getLeague()
  }, [id, isNewLeague])

  const handleFormChange = (key: string, value: any) => {
    setLeague((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)

    try {
      if (isNewLeague) {
        const newLeague = await createLeague(league)
        setSuccessMessage("League created successfully!")
        setTimeout(() => {
          router.push(`/league/management/${newLeague.id}`)
        }, 1500)
      } else {
        await updateLeague(id, league)
        setSuccessMessage("League updated successfully!")
      }
      setIsSaving(false)
    } catch (error) {
      console.error("Failed to save league:", error)
      setError("Failed to save league. Please try again.")
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    if (isNewLeague) {
      router.push("/league/list")
    } else {
      router.push(`/league/management/${id}`)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">League Editor</h1>
          <p className="text-muted-foreground">Edit league details and settings</p>
        </div>
        <Button>Save Changes</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>League Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Content for the League Editor page will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
