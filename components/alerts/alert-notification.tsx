"use client"

import { useEffect, useState } from "react"
import type { Alert } from "@/lib/types"
import { AlertTriangle, X } from "lucide-react"

interface AlertNotificationProps {
  alert: Alert
  onDismiss: (id: string) => void
}

export function AlertNotification({ alert, onDismiss }: AlertNotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onDismiss(alert.id)
    }, 8000)

    return () => clearTimeout(timer)
  }, [alert.id, onDismiss])

  if (!isVisible) return null

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500/20 border-red-500/30 text-red-400"
      case "medium":
        return "bg-yellow-500/20 border-yellow-500/30 text-yellow-400"
      default:
        return "bg-blue-500/20 border-blue-500/30 text-blue-400"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "fault":
        return <AlertTriangle className="h-5 w-5" />
      case "quality":
        return <AlertTriangle className="h-5 w-5" />
      default:
        return <AlertTriangle className="h-5 w-5" />
    }
  }

  return (
    <div
      className={`p-4 rounded-lg border flex items-start gap-3 animate-in slide-in-from-top-2 ${getAlertColor(alert.severity)}`}
    >
      {getAlertIcon(alert.type)}
      <div className="flex-1">
        <p className="font-semibold">{alert.message}</p>
        <p className="text-xs opacity-75">{alert.timestamp.toLocaleTimeString()}</p>
      </div>
      <button
        onClick={() => {
          setIsVisible(false)
          onDismiss(alert.id)
        }}
        className="flex-shrink-0 hover:opacity-75 transition-opacity"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
