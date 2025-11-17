"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { mockBGradeProducts, mockMachines } from "@/lib/mock-data"
import { Plus, AlertCircle } from "lucide-react"

export function QCStaffDashboard() {
  const [showForm, setShowForm] = useState(false)
  const [defectType, setDefectType] = useState("")
  const [severity, setSeverity] = useState<"low" | "medium" | "high">("medium")
  const [notes, setNotes] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setDefectType("")
      setNotes("")
      setSeverity("medium")
      setShowForm(false)
      setSubmitted(false)
    }, 2000)
  }

  const highSeverityCount = mockBGradeProducts.filter((p) => p.severity === "high").length
  const mediumSeverityCount = mockBGradeProducts.filter((p) => p.severity === "medium").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Quality Control</h1>
        <p className="text-muted-foreground">Manage B-Grade products and quality issues</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Total B-Grade</p>
            <p className="text-3xl font-bold text-foreground">{mockBGradeProducts.length}</p>
            <p className="text-xs text-muted-foreground mt-2">products flagged</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">High Severity</p>
            <p className="text-3xl font-bold text-red-400">{highSeverityCount}</p>
            <p className="text-xs text-muted-foreground mt-2">critical issues</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Medium Severity</p>
            <p className="text-3xl font-bold text-yellow-400">{mediumSeverityCount}</p>
            <p className="text-xs text-muted-foreground mt-2">attention needed</p>
          </CardContent>
        </Card>
      </div>

      {/* Add B-Grade Form */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Report B-Grade Product</CardTitle>
          <CardDescription>Flag products that don't meet quality standards</CardDescription>
        </CardHeader>
        <CardContent>
          {!showForm ? (
            <Button onClick={() => setShowForm(true)} className="w-full bg-primary hover:bg-primary/90 gap-2">
              <Plus className="h-4 w-4" />
              Report New B-Grade Product
            </Button>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="defect" className="text-foreground">
                  Defect Type
                </Label>
                <Input
                  id="defect"
                  placeholder="e.g., weaving_fault, dye_issue, tear"
                  value={defectType}
                  onChange={(e) => setDefectType(e.target.value)}
                  className="bg-input border-border text-foreground"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="severity" className="text-foreground">
                  Severity
                </Label>
                <select
                  id="severity"
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as "low" | "medium" | "high")}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-foreground">
                  Notes
                </Label>
                <textarea
                  id="notes"
                  placeholder="Describe the defect..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                  rows={3}
                  required
                />
              </div>

              {submitted && (
                <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-green-400" />
                  <p className="text-sm text-green-400">B-Grade product reported successfully!</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                  Submit Report
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowForm(false)}
                  variant="outline"
                  className="flex-1 border-border text-foreground hover:bg-muted"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      {/* B-Grade Products List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">B-Grade Products Log</CardTitle>
          <CardDescription>All flagged products and quality issues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockBGradeProducts.map((product) => (
              <div key={product.id} className="p-4 bg-muted/30 rounded-lg border border-border">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-foreground">{product.defectType.replace(/_/g, " ")}</p>
                    <p className="text-xs text-muted-foreground">
                      {mockMachines.find((m) => m.id === product.machineId)?.name}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded border ${
                      product.severity === "high"
                        ? "bg-red-500/20 text-red-400 border-red-500/30"
                        : product.severity === "medium"
                          ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                    }`}
                  >
                    {product.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{product.notes}</p>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Batch: {product.batchId}</span>
                  <span>{product.timestamp.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
