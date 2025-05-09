"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

/**
 * Index page component that redirects to the League Management page
 * Serves as the entry point for the application
 */
export default function Index() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the league management page on component mount
    router.push("/league/list")
  }, [router])

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-3 text-muted-foreground">Redirecting to Dashboard...</p>
      </div>
    </div>
  )
}
