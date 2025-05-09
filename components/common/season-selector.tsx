"use client"

import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface Season {
  id: string
  name: string
  year?: number
}

interface SeasonSelectorProps {
  seasons: Season[]
  selectedSeason: string | null
  onChange: (seasonId: string) => void
  className?: string
}

export default function SeasonSelector({ seasons, selectedSeason, onChange, className }: SeasonSelectorProps) {
  const [open, setOpen] = useState(false)

  const selectedSeasonObj = seasons.find((season) => season.id === selectedSeason)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          {selectedSeasonObj ? selectedSeasonObj.name : "Select season..."}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search season..." />
          <CommandList>
            <CommandEmpty>No season found.</CommandEmpty>
            <CommandGroup>
              {seasons.map((season) => (
                <CommandItem
                  key={season.id}
                  value={season.id}
                  onSelect={() => {
                    onChange(season.id)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", selectedSeason === season.id ? "opacity-100" : "opacity-0")} />
                  {season.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
