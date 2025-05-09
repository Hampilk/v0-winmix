"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchBarProps {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  className?: string
}

export function SearchBar({ placeholder = "Search...", value, onChange, className = "" }: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-8 bg-[#131a29] border-[#2d3748]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
