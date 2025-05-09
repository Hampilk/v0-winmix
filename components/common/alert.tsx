"use client"

import { AlertCircle, CheckCircle, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface AlertProps {
  type: "success" | "error" | "info" | "warning"
  message: string
  onClose?: () => void
  className?: string
}

export default function Alert({ type, message, onClose, className }: AlertProps) {
  const getAlertStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-900 text-green-100"
      case "error":
        return "bg-red-900 text-red-100"
      case "warning":
        return "bg-yellow-900 text-yellow-100"
      case "info":
        return "bg-blue-900 text-blue-100"
      default:
        return "bg-gray-900 text-gray-100"
    }
  }

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5" />
      case "error":
        return <AlertCircle className="h-5 w-5" />
      case "warning":
        return <AlertCircle className="h-5 w-5" />
      case "info":
        return <Info className="h-5 w-5" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  return (
    <div className={cn("p-4 rounded-md flex items-start", getAlertStyles(), className)}>
      <div className="flex-shrink-0 mr-3">{getIcon()}</div>
      <div className="flex-1">{message}</div>
      {onClose && (
        <button
          type="button"
          className="ml-auto flex-shrink-0 -mr-1 -mt-1 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          onClick={onClose}
        >
          <span className="sr-only">Close</span>
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
