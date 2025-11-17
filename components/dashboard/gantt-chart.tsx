"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Task } from "@/lib/types"
import { mockMachines } from "@/lib/mock-data"
import { Calendar } from "lucide-react"

interface GanttChartProps {
  tasks: Task[]
}

export function GanttChart({ tasks }: GanttChartProps) {
  const getTaskColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in_progress":
        return "bg-blue-500"
      case "pending":
        return "bg-gray-500"
      default:
        return "bg-gray-400"
    }
  }

  const getTaskPosition = (task: Task) => {
    const now = new Date()
    const dayStart = new Date(now)
    dayStart.setHours(0, 0, 0, 0)
    const dayEnd = new Date(dayStart)
    dayEnd.setDate(dayEnd.getDate() + 1)

    const taskStart = Math.max(
      0,
      ((task.startTime.getTime() - dayStart.getTime()) / (dayEnd.getTime() - dayStart.getTime())) * 100,
    )
    const taskEnd = Math.min(
      100,
      ((task.endTime.getTime() - dayStart.getTime()) / (dayEnd.getTime() - dayStart.getTime())) * 100,
    )

    return {
      left: `${taskStart}%`,
      width: `${Math.max(2, taskEnd - taskStart)}%`,
    }
  }

  const getTaskDuration = (task: Task) => {
    const duration = (task.endTime.getTime() - task.startTime.getTime()) / (1000 * 60)
    const hours = Math.floor(duration / 60)
    const minutes = Math.floor(duration % 60)
    return `${hours}h ${minutes}m`
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Task Schedule (Gantt Chart)
        </CardTitle>
        <CardDescription>Production tasks and machine assignments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => {
            const machine = mockMachines.find((m) => m.id === task.machineId)
            const position = getTaskPosition(task)

            return (
              <div key={task.id} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{machine?.name}</p>
                    <p className="text-xs text-muted-foreground">{task.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-foreground">{getTaskDuration(task)}</p>
                    <p
                      className={`text-xs px-2 py-0.5 rounded ${
                        task.status === "completed"
                          ? "bg-green-500/20 text-green-400"
                          : task.status === "in_progress"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {task.status.replace(/_/g, " ").toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="relative h-8 bg-muted/30 rounded-lg border border-border overflow-hidden">
                  <div
                    className={`absolute top-0 bottom-0 rounded ${getTaskColor(task.status)} opacity-80 hover:opacity-100 transition-opacity cursor-pointer flex items-center px-2`}
                    style={position}
                    title={`${task.description} - ${task.startTime.toLocaleTimeString()} to ${task.endTime.toLocaleTimeString()}`}
                  >
                    <span className="text-xs font-semibold text-white truncate">{task.id}</span>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Timeline reference */}
          <div className="mt-6 pt-4 border-t border-border">
            <div className="text-xs text-muted-foreground mb-2">Timeline (24-hour view)</div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>24:00</span>
            </div>
            <div className="flex gap-0 mt-1 h-1 bg-muted/20 rounded-full overflow-hidden">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="flex-1 border-r border-muted/40 last:border-r-0"></div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
