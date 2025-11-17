"use client"

import { useState, useEffect, useCallback } from "react"
import type { Alert } from "@/lib/types"
import { mockAlerts } from "@/lib/mock-data"

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)
  const [unreadCount, setUnreadCount] = useState(mockAlerts.filter((a) => !a.resolved).length)

  // Simulate new alerts
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly generate new alerts
      if (Math.random() > 0.7) {
        const alertTypes: Array<Alert["type"]> = ["bottleneck", "fault", "quality", "maintenance"]
        const severities: Array<Alert["severity"]> = ["low", "medium", "high"]
        const machineIds = ["M001", "M002", "M003", "M004", "M005"]

        const newAlert: Alert = {
          id: `A${Date.now()}`,
          type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
          machineId: machineIds[Math.floor(Math.random() * machineIds.length)],
          message: `New ${alertTypes[Math.floor(Math.random() * alertTypes.length)]} detected`,
          severity: severities[Math.floor(Math.random() * severities.length)],
          timestamp: new Date(),
          resolved: false,
        }

        setAlerts((prev) => [newAlert, ...prev])
        setUnreadCount((prev) => prev + 1)
      }
    }, 10000) // Check every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const resolveAlert = useCallback((alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, resolved: true } : alert)))
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }, [])

  const dismissAlert = useCallback((alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId))
  }, [])

  const clearAllAlerts = useCallback(() => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, resolved: true })))
    setUnreadCount(0)
  }, [])

  return {
    alerts,
    unreadCount,
    resolveAlert,
    dismissAlert,
    clearAllAlerts,
  }
}
