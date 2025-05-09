"use client"

import { cn } from "@/lib/utils"

interface Tab {
  id: string
  label: string
}

interface TabGroupProps {
  tabs: Tab[]
  activeTab: string
  onChange: (tabId: string) => void
  className?: string
}

export default function TabGroup({ tabs, activeTab, onChange, className }: TabGroupProps) {
  return (
    <div className={cn("flex space-x-1 rounded-lg bg-muted p-1", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "flex flex-1 items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-all",
            activeTab === tab.id
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:bg-background/50 hover:text-foreground",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
