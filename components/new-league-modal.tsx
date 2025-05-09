"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { League } from "@/types/league"

interface NewLeagueModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (league: Partial<League>) => Promise<void>
}

export function NewLeagueModal({ isOpen, onClose, onSave }: NewLeagueModalProps) {
  const [formData, setFormData] = useState<Partial<League>>({
    name: "",
    description: "",
    sportType: "soccer",
    country: "",
    status: "active",
  })

  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSubmit = async () => {
    if (!formData.name) {
      setError("League name is required")
      return
    }

    setIsSaving(true)
    setError(null)

    try {
      await onSave(formData)
      setIsSaving(false)
      onClose()

      // Reset form
      setFormData({
        name: "",
        description: "",
        sportType: "soccer",
        country: "",
        status: "active",
      })
    } catch (err) {
      console.error("Failed to save league:", err)
      setError("Failed to save league. Please try again.")
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1a2233] border-[#2d3748] text-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New League</DialogTitle>
          <DialogDescription>
            Add a new league to the system. Fill out the form below to create a league.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="col-span-3 bg-[#131a29] border-[#2d3748]"
              required
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="country" className="text-right">
              Country
            </Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => handleChange("country", e.target.value)}
              className="col-span-3 bg-[#131a29] border-[#2d3748]"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sportType" className="text-right">
              Sport Type
            </Label>
            <Select value={formData.sportType} onValueChange={(value) => handleChange("sportType", value)}>
              <SelectTrigger id="sportType" className="col-span-3 bg-[#131a29] border-[#2d3748]">
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

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
              <SelectTrigger id="status" className="col-span-3 bg-[#131a29] border-[#2d3748]">
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

          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="col-span-3 bg-[#131a29] border-[#2d3748]"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSaving}>
            {isSaving ? "Creating..." : "Create League"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
