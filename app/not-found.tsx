import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0d1117]">
      <div className="container flex flex-col items-center justify-center px-5 text-center">
        <AlertTriangle className="h-16 w-16 text-yellow-500 mb-6" />
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">404</h1>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Page Not Found</h2>
        <p className="mt-4 text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or never
          existed.
        </p>
        <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button asChild>
            <Link href="/">Return to Dashboard</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/settings">Check Settings</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
