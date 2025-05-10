import type { Metadata } from "next"
import { Suspense } from "react"
import { LeagueTableWrapper } from "@/components/league-table-wrapper"
import { DashboardHeader } from "@/components/dashboard-header"
import { Sidebar } from "@/components/sidebar"
import { LeagueListSkeleton } from "./loading"
import { ErrorBoundary } from "@/components/error-boundary"

export const metadata: Metadata = {
  title: "Leagues | V-Sports Analytics",
  description: "View and manage your sports leagues",
}

export default function LeagueListView({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  // Extract search parameters with defaults
  const page = typeof searchParams?.page === "string" ? Number.parseInt(searchParams.page) : 1
  const search = typeof searchParams?.search === "string" ? searchParams.search : ""
  const status = typeof searchParams?.status === "string" ? searchParams.status : "all"

  return (
    <div className="flex min-h-screen bg-[#0d1117]">
      <Sidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">Leagues</h1>
              <p className="text-muted-foreground">View and manage all your sports leagues in one place.</p>
            </div>

            <ErrorBoundary
              fallback={
                <div className="p-4 bg-red-900/20 rounded-md text-red-400">
                  Error loading leagues. Please try again later.
                </div>
              }
            >
              <Suspense fallback={<LeagueListSkeleton />}>
                <LeagueTableWrapper initialPage={page} initialSearch={search} initialStatus={status} />
              </Suspense>
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </div>
  )
}
