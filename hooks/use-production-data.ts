"use client"

import { useState, useEffect, useCallback } from "react"
import type { Machine, ProductionData } from "@/lib/types"
import { mockMachines, mockProductionData } from "@/lib/mock-data"

export function useProductionData() {
  const [machines, setMachines] = useState<Machine[]>(mockMachines)
  const [productionData, setProductionData] = useState<ProductionData[]>(mockProductionData)
  const [isLoading, setIsLoading] = useState(false)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMachines((prevMachines) =>
        prevMachines.map((machine) => {
          // Randomly update machine status
          const statuses: Array<"operational" | "delay" | "fault" | "maintenance"> = [
            "operational",
            "delay",
            "fault",
            "maintenance",
          ]
          const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

          // 70% chance to stay operational
          const newStatus = Math.random() > 0.3 ? machine.status : randomStatus

          return {
            ...machine,
            status: newStatus,
            lastUpdated: new Date(),
            runtime: machine.runtime + Math.floor(Math.random() * 5),
            downtime: machine.downtime + (newStatus !== "operational" ? Math.floor(Math.random() * 3) : 0),
          }
        }),
      )
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const updateMachineStatus = useCallback((machineId: string, status: Machine["status"]) => {
    setMachines((prev) => prev.map((m) => (m.id === machineId ? { ...m, status, lastUpdated: new Date() } : m)))
  }, [])

  const addProductionData = useCallback((data: Omit<ProductionData, "id">) => {
    const newData: ProductionData = {
      ...data,
      id: `P${Date.now()}`,
    }
    setProductionData((prev) => [newData, ...prev])
  }, [])

  return {
    machines,
    productionData,
    isLoading,
    updateMachineStatus,
    addProductionData,
  }
}
