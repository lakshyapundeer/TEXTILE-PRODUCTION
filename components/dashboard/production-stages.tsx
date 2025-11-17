"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Machine } from "@/lib/types"

interface ProductionStagesProps {
  machines: Machine[]
}

export function ProductionStages({ machines }: ProductionStagesProps) {
  const stages = ["spinning", "weaving", "dyeing", "finishing"]

  const getMachinesByStage = (stage: string) => {
    return machines.filter((m) => m.stage === stage)
  }

  const getStageStatus = (stageMachines: Machine[]) => {
    if (stageMachines.length === 0) return "empty"
    const operational = stageMachines.filter((m) => m.status === "operational").length
    if (operational === stageMachines.length) return "operational"
    if (operational > 0) return "partial"
    return "fault"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-500/20 border-green-500/30 text-green-400"
      case "partial":
        return "bg-yellow-500/20 border-yellow-500/30 text-yellow-400"
      case "fault":
        return "bg-red-500/20 border-red-500/30 text-red-400"
      default:
        return "bg-muted/30 border-border text-muted-foreground"
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg">Production Stages</CardTitle>
        <CardDescription>Status overview by production stage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stages.map((stage) => {
            const stageMachines = getMachinesByStage(stage)
            const status = getStageStatus(stageMachines)
            const statusColor = getStatusColor(status)

            return (
              <div key={stage} className={`p-4 rounded-lg border-2 ${statusColor}`}>
                <p className="text-sm font-semibold mb-2 capitalize">{stage}</p>
                <p className="text-2xl font-bold mb-2">{stageMachines.length}</p>
                <div className="space-y-1">
                  {stageMachines.map((machine) => (
                    <div key={machine.id} className="text-xs flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          machine.status === "operational"
                            ? "bg-green-400"
                            : machine.status === "delay"
                              ? "bg-yellow-400"
                              : "bg-red-400"
                        }`}
                      ></div>
                      <span className="truncate">{machine.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
