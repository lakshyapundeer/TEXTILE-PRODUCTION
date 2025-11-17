"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { mockMachines, mockProductionData } from "@/lib/mock-data"
import { AlertCircle, Plus } from "lucide-react"

export function OperatorDashboard() {
  const [selectedMachine, setSelectedMachine] = useState(mockMachines[0])
  const [outputUnits, setOutputUnits] = useState("")
  const [qualityScore, setQualityScore] = useState("")
  const [defectCount, setDefectCount] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setOutputUnits("")
      setQualityScore("")
      setDefectCount("")
      setSubmitted(false)
    }, 2000)
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Production Data</h1>
        <p className="text-muted-foreground">Add production data for your assigned machines</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Machine Selection */}
        <Card className="lg:col-span-1 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">My Machines</CardTitle>
            <CardDescription>Select a machine to report</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockMachines.slice(0, 2).map((machine) => (
              <button
                key={machine.id}
                onClick={() => setSelectedMachine(machine)}
                className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                  selectedMachine.id === machine.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <p className="font-semibold text-foreground">{machine.name}</p>
                <p className={`text-xs px-2 py-1 rounded w-fit mt-1 border ${getStatusColor(machine.status)}`}>
                  {machine.status.toUpperCase()}
                </p>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Production Data Form */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Report Production Data</CardTitle>
            <CardDescription>Submit today's production metrics for {selectedMachine.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="output" className="text-foreground">
                    Output Units
                  </Label>
                  <Input
                    id="output"
                    type="number"
                    placeholder="e.g., 150"
                    value={outputUnits}
                    onChange={(e) => setOutputUnits(e.target.value)}
                    className="bg-input border-border text-foreground"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quality" className="text-foreground">
                    Quality Score (%)
                  </Label>
                  <Input
                    id="quality"
                    type="number"
                    placeholder="e.g., 95"
                    min="0"
                    max="100"
                    value={qualityScore}
                    onChange={(e) => setQualityScore(e.target.value)}
                    className="bg-input border-border text-foreground"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defects" className="text-foreground">
                    Defect Count
                  </Label>
                  <Input
                    id="defects"
                    type="number"
                    placeholder="e.g., 2"
                    value={defectCount}
                    onChange={(e) => setDefectCount(e.target.value)}
                    className="bg-input border-border text-foreground"
                    required
                  />
                </div>
              </div>

              {submitted && (
                <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-green-400" />
                  <p className="text-sm text-green-400">Production data submitted successfully!</p>
                </div>
              )}

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                <Plus className="h-4 w-4" />
                Submit Production Data
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Recent Data */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Recent Production Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockProductionData.map((data) => (
              <div key={data.id} className="p-3 bg-muted/30 rounded-lg border border-border">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-foreground">
                      {mockMachines.find((m) => m.id === data.machineId)?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{data.timestamp.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">{data.outputUnits} units</p>
                    <p className="text-sm text-green-400">Quality: {data.qualityScore}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
