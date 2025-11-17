"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockAlerts } from "@/lib/mock-data"
import { AlertTriangle, TrendingUp, Zap } from "lucide-react"
import { useProductionData } from "@/hooks/use-production-data"
import { ProductionMonitor } from "./production-monitor"
import { ProductionStages } from "./production-stages"

export function FloorManagerDashboard() {
  const { machines } = useProductionData()
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

  const operationalCount = machines.filter((m) => m.status === "operational").length
  const delayCount = machines.filter((m) => m.status === "delay").length
  const faultCount = machines.filter((m) => m.status === "fault").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Floor Overview</h1>
        <p className="text-muted-foreground">Monitor all machines on your floor</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Machines</p>
                <p className="text-3xl font-bold text-foreground">{machines.length}</p>
              </div>
              <Zap className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Operational</p>
                <p className="text-3xl font-bold text-green-400">{operationalCount}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Delays</p>
                <p className="text-3xl font-bold text-yellow-400">{delayCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Faults</p>
                <p className="text-3xl font-bold text-red-400">{faultCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Production Stages Overview */}
      <ProductionStages machines={machines} />

      {/* Real-Time Monitoring */}
      <ProductionMonitor machines={machines} />

      {/* Active Alerts */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Active Alerts</CardTitle>
          <CardDescription>Immediate attention required</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAlerts.filter((a) => !a.resolved).length > 0 ? (
              mockAlerts
                .filter((a) => !a.resolved)
                .map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border flex items-start gap-3 ${
                      alert.severity === "high"
                        ? "bg-red-500/10 border-red-500/30"
                        : "bg-yellow-500/10 border-yellow-500/30"
                    }`}
                  >
                    <AlertTriangle
                      className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                        alert.severity === "high" ? "text-red-400" : "text-yellow-400"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.timestamp.toLocaleString()}</p>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-muted-foreground text-center py-4">No active alerts</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
