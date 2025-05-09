"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handleFirstPage = () => {
    onPageChange(1)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const handleLastPage = () => {
    onPageChange(totalPages)
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are fewer than maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Always show first page
      pageNumbers.push(1)

      // Calculate start and end of page range
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if at the beginning
      if (currentPage <= 2) {
        end = 4
      }

      // Adjust if at the end
      if (currentPage >= totalPages - 1) {
        start = totalPages - 3
      }

      // Add ellipsis if needed
      if (start > 2) {
        pageNumbers.push("...")
      }

      // Add page numbers
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i)
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pageNumbers.push("...")
      }

      // Always show last page
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button variant="outline" size="icon" onClick={handleFirstPage} disabled={currentPage === 1}>
        <ChevronsLeft className="h-4 w-4" />
        <span className="sr-only">First page</span>
      </Button>
      <Button variant="outline" size="icon" onClick={handlePreviousPage} disabled={currentPage === 1}>
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>

      {getPageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <Button key={index} variant={currentPage === page ? "default" : "outline"} onClick={() => onPageChange(page)}>
            {page}
          </Button>
        ) : (
          <span key={index} className="px-2">
            {page}
          </span>
        ),
      )}

      <Button variant="outline" size="icon" onClick={handleNextPage} disabled={currentPage === totalPages}>
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
      <Button variant="outline" size="icon" onClick={handleLastPage} disabled={currentPage === totalPages}>
        <ChevronsRight className="h-4 w-4" />
        <span className="sr-only">Last page</span>
      </Button>
    </div>
  )
}
