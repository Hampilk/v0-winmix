"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Calendar,
  ChevronDown,
  Clock,
  Database,
  Home,
  LineChart,
  List,
  Network,
  PieChart,
  Search,
  Settings,
  TrendingUp,
  Trophy,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function DashboardSidebar() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + "/")
  }

  return (
    <div className="fixed inset-y-0 left-0 z-20 flex h-full w-64 flex-col border-r bg-background">
      {/* Header */}
      <div className="border-b px-4 py-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-primary" />
          <div className="flex flex-col">
            <h2 className="text-lg font-bold tracking-tight">V-SPORTS ANALYTICS</h2>
            <p className="text-xs text-muted-foreground">2023-2024 Season</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-background pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <Link
            href="/dashboard"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
              isActive("/dashboard") ? "bg-accent text-accent-foreground" : "text-muted-foreground",
            )}
          >
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/leagues"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
              isActive("/leagues") ? "bg-accent text-accent-foreground" : "text-muted-foreground",
            )}
          >
            <Trophy className="h-4 w-4" />
            <span>Leagues</span>
          </Link>
          <Link
            href="/matches"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
              isActive("/matches") ? "bg-accent text-accent-foreground" : "text-muted-foreground",
            )}
          >
            <Calendar className="h-4 w-4" />
            <span>Matches</span>
          </Link>
          <Link
            href="/analysis"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
              isActive("/analysis") ? "bg-accent text-accent-foreground" : "text-muted-foreground",
            )}
          >
            <BarChart3 className="h-4 w-4" />
            <span>Analysis</span>
          </Link>
          <Link
            href="/advanced-pattern"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
              isActive("/advanced-pattern") ? "bg-accent text-accent-foreground" : "text-muted-foreground",
            )}
          >
            <Network className="h-4 w-4" />
            <span>Advanced Pattern</span>
          </Link>

          {/* League Tools Section */}
          <div className="mt-6 px-3 py-2">
            <h3 className="mb-2 text-xs font-semibold text-muted-foreground">LEAGUE TOOLS</h3>
          </div>
          <Link
            href="/league/analytics"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
              isActive("/league/analytics") ? "bg-accent text-accent-foreground" : "text-muted-foreground",
            )}
          >
            <LineChart className="h-4 w-4" />
            <span>League Analytics</span>
          </Link>
          <Link
            href="/league/management"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
              isActive("/league/management") ? "bg-accent text-accent-foreground" : "text-muted-foreground",
            )}
          >
            <Database className="h-4 w-4" />
            <span>League Management</span>
            <span className="ml-auto rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium leading-none text-primary-foreground">
              NEW
            </span>
          </Link>
          <Link
            href="/league/stats"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
              isActive("/league/stats") ? "bg-accent text-accent-foreground" : "text-muted-foreground",
            )}
          >
            <PieChart className="h-4 w-4" />
            <span>League Stats</span>
          </Link>
          <Link
            href="/league/editor"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
              isActive("/league/editor") ? "bg-accent text-accent-foreground" : "text-muted-foreground",
            )}
          >
            <List className="h-4 w-4" />
            <span>League Editor</span>
          </Link>

          {/* System Section */}
          <div className="mt-6 px-3 py-2">
            <h3 className="mb-2 text-xs font-semibold text-muted-foreground">SYSTEM</h3>
          </div>
          <Link
            href="/integrations"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
              isActive("/integrations") ? "bg-accent text-accent-foreground" : "text-muted-foreground",
            )}
          >
            <TrendingUp className="h-4 w-4" />
            <span>Integrations</span>
          </Link>
          <Link
            href="/predictions"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
              isActive("/predictions") ? "bg-accent text-accent-foreground" : "text-muted-foreground",
            )}
          >
            <ChevronDown className="h-4 w-4" />
            <span>Predictions</span>
            <span className="ml-auto rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium leading-none text-primary-foreground">
              NEW
            </span>
          </Link>
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
              isActive("/settings") ? "bg-accent text-accent-foreground" : "text-muted-foreground",
            )}
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="rounded-lg border bg-card p-3 shadow-sm">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium leading-none">Next Analysis Update</p>
              <p className="text-xs text-muted-foreground">Today, 18:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// For backward compatibility
export const Sidebar = DashboardSidebar
