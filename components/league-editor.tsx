"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Save } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { League } from "@/types/league"

interface LeagueEditorProps {
  league?: Partial<League>
  isNew?: boolean
  onSave?: (league: Partial<League>) => Promise<void>
  onCancel?: () => void
}

export function LeagueEditor({ league = {}, isNew = false, onSave, onCancel }: LeagueEditorProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<Partial<League>>({
    name: "",
    description: "",
    sportType: "soccer",
    country: "",
    status: "active",
    ...league,
  })

  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)

    try {
      if (onSave) {
        await onSave(formData)
      }
      setIsSaving(false)

      if (isNew) {
        router.push("/league/list")
      }
    } catch (err) {
      console.error("Failed to save league:", err)
      setError("Failed to save league. Please try again.")
      setIsSaving(false)
    }
  }

  return (
    <Card className="bg-[#1a2233] border-[#2d3748]">
      <CardHeader>
        <CardTitle className="text-white">{isNew ? "Create New League" : "Edit League"}</CardTitle>
        <CardDescription>{isNew ? "Add a new league to the system" : "Update league information"}</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">League Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="bg-[#131a29] border-[#2d3748]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
                className="bg-[#131a29] border-[#2d3748]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="bg-[#131a29] border-[#2d3748]"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sportType">Sport Type</Label>
              <Select value={formData.sportType} onValueChange={(value) => handleChange("sportType", value)}>
                <SelectTrigger id="sportType" className="bg-[#131a29] border-[#2d3748]">
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

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger id="status" className="bg-[#131a29] border-[#2d3748]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSaving}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <span className="mr-2">Saving...</span>
                  <span className="animate-spin">⏳</span>
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {isNew ? "Create League" : "Save Changes"}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
