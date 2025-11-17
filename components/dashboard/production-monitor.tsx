"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Machine } from "@/lib/types"
import { Activity, AlertTriangle, CheckCircle, Zap } from "lucide-react"

interface ProductionMonitorProps {
  machines: Machine[]
}

export function ProductionMonitor({ machines }: ProductionMonitorProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "delay":
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />
      case "fault":
        return <AlertTriangle className="h-5 w-5 text-red-400" />
      default:
        return <Zap className="h-5 w-5 text-blue-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "delay":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "fault":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    }
  }

  const getEfficiency = (machine: Machine) => {
    const total = machine.runtime + machine.downtime
    return total > 0 ? Math.round((machine.runtime / total) * 100) : 0
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Real-Time Production Monitoring
            </CardTitle>
            <CardDescription>Live status of all production machines</CardDescription>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
            Live
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {machines.map((machine) => {
            const efficiency = getEfficiency(machine)
            return (
              <div
                key={machine.id}
                className="p-4 bg-muted/30 rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    {getStatusIcon(machine.status)}
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{machine.name}</p>
                      <p className="text-xs text-muted-foreground">{machine.stage.toUpperCase()}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(machine.status)}`}>
                    {machine.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Runtime</p>
                    <p className="text-sm font-semibold text-foreground">{machine.runtime} min</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Downtime</p>
                    <p className="text-sm font-semibold text-foreground">{machine.downtime} min</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Efficiency</p>
                    <p className="text-sm font-semibold text-green-400">{efficiency}%</p>
                  </div>
                </div>

                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      machine.status === "operational"
                        ? "bg-green-500"
                        : machine.status === "delay"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                    style={{ width: `${efficiency}%` }}
                  ></div>
                </div>

                <p className="text-xs text-muted-foreground mt-2">
                  Last updated: {machine.lastUpdated.toLocaleTimeString()}
                </p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
