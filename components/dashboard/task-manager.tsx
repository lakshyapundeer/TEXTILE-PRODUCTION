"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { mockMachines, mockTasks } from "@/lib/mock-data"
import { Plus, AlertCircle } from "lucide-react"

export function TaskManager() {
  const [showForm, setShowForm] = useState(false)
  const [machineId, setMachineId] = useState(mockMachines[0].id)
  const [description, setDescription] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setDescription("")
      setStartTime("")
      setEndTime("")
      setShowForm(false)
      setSubmitted(false)
    }, 2000)
  }

  const pendingTasks = mockTasks.filter((t) => t.status === "pending").length
  const inProgressTasks = mockTasks.filter((t) => t.status === "in_progress").length

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg">Task Management</CardTitle>
        <CardDescription>Create and manage production tasks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-muted/30 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">Pending Tasks</p>
            <p className="text-2xl font-bold text-foreground">{pendingTasks}</p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">In Progress</p>
            <p className="text-2xl font-bold text-blue-400">{inProgressTasks}</p>
          </div>
        </div>

        {!showForm ? (
          <Button onClick={() => setShowForm(true)} className="w-full bg-primary hover:bg-primary/90 gap-2">
            <Plus className="h-4 w-4" />
            Create New Task
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="machine" className="text-foreground">
                Machine
              </Label>
              <select
                id="machine"
                value={machineId}
                onChange={(e) => setMachineId(e.target.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
              >
                {mockMachines.map((machine) => (
                  <option key={machine.id} value={machine.id}>
                    {machine.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-foreground">
                Task Description
              </Label>
              <Input
                id="description"
                placeholder="e.g., Spinning batch A1-001"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-input border-border text-foreground"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime" className="text-foreground">
                  Start Time
                </Label>
                <Input
                  id="startTime"
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="bg-input border-border text-foreground"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime" className="text-foreground">
                  End Time
                </Label>
                <Input
                  id="endTime"
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="bg-input border-border text-foreground"
                  required
                />
              </div>
            </div>

            {submitted && (
              <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-green-400" />
                <p className="text-sm text-green-400">Task created successfully!</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                Create Task
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
  )
}
