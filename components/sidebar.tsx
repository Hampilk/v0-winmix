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
import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + "/")
  }

  return (
    <UISidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <Trophy className="h-6 w-6 text-primary" />
          <div className="flex flex-col">
            <h2 className="text-lg font-bold tracking-tight">V-SPORTS ANALYTICS</h2>
            <p className="text-xs text-muted-foreground">2023-2024 Season</p>
          </div>
        </div>
        <div className="px-4 py-2">
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
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/")}>
                  <Link href="/">
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/league/list")}>
                  <Link href="/league/list">
                    <Trophy className="h-4 w-4" />
                    <span>Leagues</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/matches")}>
                  <Link href="/matches">
                    <Calendar className="h-4 w-4" />
                    <span>Matches</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/analysis")}>
                  <Link href="/analysis">
                    <BarChart3 className="h-4 w-4" />
                    <span>Analysis</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/advanced-pattern")}>
                  <Link href="/advanced-pattern">
                    <Network className="h-4 w-4" />
                    <span>Advanced Pattern</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>League Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/league/analytics")}>
                  <Link href="/league/analytics">
                    <LineChart className="h-4 w-4" />
                    <span>League Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/league/management")}>
                  <Link href="/league/management">
                    <Database className="h-4 w-4" />
                    <span>League Management</span>
                    <span className="ml-auto rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium leading-none text-primary-foreground">
                      NEW
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/league/stats")}>
                  <Link href="/league/stats">
                    <PieChart className="h-4 w-4" />
                    <span>League Stats</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/league/editor")}>
                  <Link href="/league/editor">
                    <List className="h-4 w-4" />
                    <span>League Editor</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/integrations")}>
                  <Link href="/integrations">
                    <TrendingUp className="h-4 w-4" />
                    <span>Integrations</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/predictions")}>
                  <Link href="/predictions">
                    <ChevronDown className="h-4 w-4" />
                    <span>Predictions</span>
                    <span className="ml-auto rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium leading-none text-primary-foreground">
                      NEW
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/settings")}>
                  <Link href="/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
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
      </SidebarFooter>
      <SidebarRail />
    </UISidebar>
  )
}

export function DashboardSidebar() {
  return (
    <SidebarProvider>
      <AppSidebar />
    </SidebarProvider>
  )
}

// Export Sidebar component for backward compatibility
export const Sidebar = DashboardSidebar
