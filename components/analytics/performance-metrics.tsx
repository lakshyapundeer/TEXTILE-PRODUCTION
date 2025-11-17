"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockMachines } from "@/lib/mock-data"
import { TrendingUp, TrendingDown } from "lucide-react"

export function PerformanceMetrics() {
  const machineMetrics = mockMachines.map((machine) => {
    const efficiency = machine.runtime / (machine.runtime + machine.downtime)
    const trend = Math.random() > 0.5 ? "up" : "down"
    return {
      ...machine,
      efficiency: Math.round(efficiency * 100),
      trend,
      trendValue: Math.floor(Math.random() * 10) + 1,
    }
  })

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg">Machine Performance Metrics</CardTitle>
        <CardDescription>Efficiency and uptime statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Machine</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Stage</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Status</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Efficiency</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Runtime</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Downtime</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Trend</th>
              </tr>
            </thead>
            <tbody>
              {machineMetrics.map((machine) => (
                <tr key={machine.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-4 text-foreground font-semibold">{machine.name}</td>
                  <td className="py-3 px-4 text-muted-foreground capitalize">{machine.stage}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-xs px-2 py-1 rounded border ${
                        machine.status === "operational"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : machine.status === "delay"
                            ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                            : "bg-red-500/20 text-red-400 border-red-500/30"
                      }`}
                    >
                      {machine.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            machine.efficiency >= 80
                              ? "bg-green-500"
                              : machine.efficiency >= 60
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${machine.efficiency}%` }}
                        ></div>
                      </div>
                      <span className="text-foreground font-semibold">{machine.efficiency}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-foreground">{machine.runtime} min</td>
                  <td className="py-3 px-4 text-foreground">{machine.downtime} min</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      {machine.trend === "up" ? (
                        <>
                          <TrendingUp className="h-4 w-4 text-green-400" />
                          <span className="text-green-400">+{machine.trendValue}%</span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="h-4 w-4 text-red-400" />
                          <span className="text-red-400">-{machine.trendValue}%</span>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
