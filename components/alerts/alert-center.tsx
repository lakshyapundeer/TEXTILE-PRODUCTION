"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Alert } from "@/lib/types"
import { AlertTriangle, CheckCircle, Trash2, X } from "lucide-react"

interface AlertCenterProps {
  alerts: Alert[]
  onResolve: (id: string) => void
  onDismiss: (id: string) => void
  onClearAll: () => void
}

export function AlertCenter({ alerts, onResolve, onDismiss, onClearAll }: AlertCenterProps) {
  const activeAlerts = alerts.filter((a) => !a.resolved)
  const resolvedAlerts = alerts.filter((a) => a.resolved)

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Alert Center</CardTitle>
            <CardDescription>Production alerts and notifications</CardDescription>
          </div>
          {activeAlerts.length > 0 && (
            <Button
              onClick={onClearAll}
              variant="outline"
              className="border-border text-foreground hover:bg-muted gap-2 bg-transparent"
            >
              <Trash2 className="h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Active Alerts */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Active Alerts ({activeAlerts.length})</h3>
          <div className="space-y-2">
            {activeAlerts.length > 0 ? (
              activeAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border flex items-start gap-3 ${getAlertColor(alert.severity)}`}
                >
                  <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{alert.message}</p>
                    <p className="text-xs opacity-75">{alert.timestamp.toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => onResolve(alert.id)}
                    className="flex-shrink-0 hover:opacity-75 transition-opacity"
                  >
                    <CheckCircle className="h-5 w-5" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm text-center py-4">No active alerts</p>
            )}
          </div>
        </div>

        {/* Resolved Alerts */}
        {resolvedAlerts.length > 0 && (
          <div className="pt-4 border-t border-border">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">
              Resolved Alerts ({resolvedAlerts.length})
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {resolvedAlerts.slice(0, 5).map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 rounded-lg border border-border/50 bg-muted/20 flex items-start gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-muted-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground/70">{alert.timestamp.toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => onDismiss(alert.id)}
                    className="flex-shrink-0 hover:opacity-75 transition-opacity"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
