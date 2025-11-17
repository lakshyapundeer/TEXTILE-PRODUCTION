"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { mockMachines } from "@/lib/mock-data"
import { Plus, AlertCircle } from "lucide-react"

const DEFECT_TYPES = [
  "weaving_fault",
  "dye_issue",
  "tear",
  "stain",
  "color_mismatch",
  "thread_breakage",
  "loose_thread",
  "pattern_error",
  "shrinkage",
  "other",
]

export function BradeProductForm() {
  const [showForm, setShowForm] = useState(false)
  const [machineId, setMachineId] = useState(mockMachines[0].id)
  const [batchId, setBatchId] = useState("")
  const [defectType, setDefectType] = useState(DEFECT_TYPES[0])
  const [severity, setSeverity] = useState<"low" | "medium" | "high">("medium")
  const [location, setLocation] = useState("")
  const [notes, setNotes] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setBatchId("")
      setDefectType(DEFECT_TYPES[0])
      setSeverity("medium")
      setLocation("")
      setNotes("")
      setShowForm(false)
      setSubmitted(false)
    }, 2000)
  }

  return (
    <Card className="bg-card border-border sticky top-6">
      <CardHeader>
        <CardTitle className="text-lg">Report B-Grade Product</CardTitle>
        <CardDescription>Flag products that don't meet quality standards</CardDescription>
      </CardHeader>
      <CardContent>
        {!showForm ? (
          <Button onClick={() => setShowForm(true)} className="w-full bg-primary hover:bg-primary/90 gap-2">
            <Plus className="h-4 w-4" />
            Report Defect
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="machine" className="text-foreground text-sm">
                Machine
              </Label>
              <select
                id="machine"
                value={machineId}
                onChange={(e) => setMachineId(e.target.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground text-sm"
              >
                {mockMachines.map((machine) => (
                  <option key={machine.id} value={machine.id}>
                    {machine.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="batch" className="text-foreground text-sm">
                Batch ID
              </Label>
              <Input
                id="batch"
                placeholder="e.g., BATCH001"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                className="bg-input border-border text-foreground text-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="defect" className="text-foreground text-sm">
                Defect Type
              </Label>
              <select
                id="defect"
                value={defectType}
                onChange={(e) => setDefectType(e.target.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground text-sm"
              >
                {DEFECT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="severity" className="text-foreground text-sm">
                Severity
              </Label>
              <select
                id="severity"
                value={severity}
                onChange={(e) => setSeverity(e.target.value as "low" | "medium" | "high")}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground text-sm"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-foreground text-sm">
                Defect Location
              </Label>
              <Input
                id="location"
                placeholder="e.g., center, edge, corner"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-input border-border text-foreground text-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-foreground text-sm">
                Notes
              </Label>
              <textarea
                id="notes"
                placeholder="Describe the defect in detail..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground text-sm"
                rows={3}
                required
              />
            </div>

            {submitted && (
              <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-green-400" />
                <p className="text-xs text-green-400">Defect reported successfully!</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-sm">
                Submit Report
              </Button>
              <Button
                type="button"
                onClick={() => setShowForm(false)}
                variant="outline"
                className="flex-1 border-border text-foreground hover:bg-muted text-sm"
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
