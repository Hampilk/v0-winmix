import type { Metadata } from "next"
import { LeagueTable } from "@/components/league-table"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/sidebar"

export const metadata: Metadata = {
  title: "Leagues | V-Sports Analytics",
  description: "View and manage your sports leagues",
}

export default function LeagueListView() {
  return (
    <div className="flex min-h-screen bg-[#0d1117]">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">Leagues</h1>
              <p className="text-muted-foreground">View and manage all your sports leagues in one place.</p>
            </div>
            <LeagueTable />
          </div>
        </main>
      </div>
    </div>
  )
}
