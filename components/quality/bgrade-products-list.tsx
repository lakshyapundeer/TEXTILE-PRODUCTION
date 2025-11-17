"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockBGradeProducts, mockMachines } from "@/lib/mock-data"
import { AlertTriangle, Filter } from "lucide-react"

export function BradeProductsList() {
  const [filterSeverity, setFilterSeverity] = useState<"all" | "low" | "medium" | "high">("all")

  const filteredProducts =
    filterSeverity === "all" ? mockBGradeProducts : mockBGradeProducts.filter((p) => p.severity === filterSeverity)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">B-Grade Products Log</CardTitle>
            <CardDescription>All flagged products and quality issues</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value as any)}
              className="px-3 py-1 bg-input border border-border rounded-md text-foreground text-sm"
            >
              <option value="all">All Severities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const machine = mockMachines.find((m) => m.id === product.machineId)
              return (
                <div
                  key={product.id}
                  className="p-4 bg-muted/30 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <AlertTriangle
                        className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                          product.severity === "high"
                            ? "text-red-400"
                            : product.severity === "medium"
                              ? "text-yellow-400"
                              : "text-blue-400"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{product.defectType.replace(/_/g, " ")}</p>
                        <p className="text-sm text-muted-foreground">{machine?.name}</p>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded border font-semibold ${getSeverityColor(product.severity)}`}
                    >
                      {product.severity.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Batch ID</p>
                      <p className="font-mono text-foreground">{product.batchId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-foreground capitalize">{product.location}</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 p-2 bg-muted/20 rounded border border-border">
                    {product.notes}
                  </p>

                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>ID: {product.id}</span>
                    <span>{product.timestamp.toLocaleString()}</span>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="text-center py-8">
              <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-muted-foreground">No B-Grade products found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
