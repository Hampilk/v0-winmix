"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"
import { LeagueTable } from "@/components/league-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Plus } from "lucide-react"
import { debounce } from "@/lib/utils"
import type { League } from "@/types/league"

interface LeagueTableWrapperProps {
  initialPage?: number
  initialSearch?: string
  initialStatus?: string
}

export function LeagueTableWrapper({
  initialPage = 1,
  initialSearch = "",
  initialStatus = "all",
}: LeagueTableWrapperProps) {
  const router = useRouter()
  const pathname = usePathname()

  const [leagues, setLeagues] = useState<League[]>([])
  const [filteredLeagues, setFilteredLeagues] = useState<League[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [page, setPage] = useState(initialPage)
  const [search, setSearch] = useState(initialSearch)
  const [status, setStatus] = useState(initialStatus)

  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredLeagues.length / itemsPerPage)

  // Update URL when filters change
  const updateUrl = useCallback(
    debounce((newSearch: string, newStatus: string, newPage: number) => {
      const params = new URLSearchParams()
      if (newSearch) params.set("search", newSearch)
      if (newStatus !== "all") params.set("status", newStatus)
      if (newPage > 1) params.set("page", newPage.toString())

      const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname
      router.push(newUrl, { scroll: false })
    }, 300),
    [pathname, router],
  )

  // Fetch leagues
  useEffect(() => {
    const fetchLeagues = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data
        const mockLeagues: League[] = [
          {
            id: "1",
            name: "Premier League",
            description: "English top division football league",
            sportType: "soccer",
            status: "active",
            seasons: [
              { id: "s1", name: "2023/2024", year: 2023 },
              { id: "s2", name: "2022/2023", year: 2022 },
            ],
          },
          {
            id: "2",
            name: "La Liga",
            description: "Spanish top division football league",
            sportType: "soccer",
            status: "active",
            seasons: [
              { id: "s3", name: "2023/2024", year: 2023 },
              { id: "s4", name: "2022/2023", year: 2022 },
            ],
          },
          {
            id: "3",
            name: "Bundesliga",
            description: "German top division football league",
            sportType: "soccer",
            status: "active",
            seasons: [{ id: "s5", name: "2023/2024", year: 2023 }],
          },
          {
            id: "4",
            name: "Serie A",
            description: "Italian top division football league",
            sportType: "soccer",
            status: "active",
            seasons: [{ id: "s6", name: "2023/2024", year: 2023 }],
          },
          {
            id: "5",
            name: "Ligue 1",
            description: "French top division football league",
            sportType: "soccer",
            status: "active",
            seasons: [{ id: "s7", name: "2023/2024", year: 2023 }],
          },
          {
            id: "6",
            name: "MLS",
            description: "Major League Soccer",
            sportType: "soccer",
            status: "inactive",
            seasons: [{ id: "s8", name: "2023", year: 2023 }],
          },
          {
            id: "7",
            name: "J1 League",
            description: "Japanese top division football league",
            sportType: "soccer",
            status: "archived",
            seasons: [{ id: "s9", name: "2023", year: 2023 }],
          },
        ]

        setLeagues(mockLeagues)
        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching leagues:", err)
        setError("Failed to load leagues. Please try again.")
        setIsLoading(false)
      }
    }

    fetchLeagues()
  }, [])

  // Apply filters
  useEffect(() => {
    let result = [...leagues]

    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(
        (league) =>
          league.name.toLowerCase().includes(searchLower) || league.description.toLowerCase().includes(searchLower),
      )
    }

    if (status !== "all") {
      result = result.filter((league) => league.status === status)
    }

    setFilteredLeagues(result)

    // If current page is now invalid, reset to page 1
    if (page > Math.ceil(result.length / itemsPerPage)) {
      setPage(1)
    }
  }, [leagues, search, status, page, itemsPerPage])

  // Update URL when filters change
  useEffect(() => {
    updateUrl(search, status, page)
  }, [search, status, page, updateUrl])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1) // Reset to first page on search
  }

  const handleStatusChange = (value: string) => {
    setStatus(value)
    setPage(1) // Reset to first page on status change
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleCreateLeague = () => {
    router.push("/league/editor/new")
  }

  const paginatedLeagues = filteredLeagues.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>All Leagues</CardTitle>
          <Button onClick={handleCreateLeague}>
            <Plus className="mr-2 h-4 w-4" />
            Create League
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search leagues..."
              className="w-[300px] pl-8"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <LeagueTable
          leagues={paginatedLeagues}
          isLoading={isLoading}
          error={error}
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </CardContent>
    </Card>
  )
}
