// User and Authentication Types
export type UserRole = "operator" | "floor_manager" | "admin" | "qc_staff"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

// Production Data Types
export interface Machine {
  id: string
  name: string
  stage: ProductionStage
  status: MachineStatus
  floorId: string
  lastUpdated: Date
  runtime: number // in minutes
  downtime: number // in minutes
}

export type ProductionStage = "spinning" | "weaving" | "dyeing" | "finishing"
export type MachineStatus = "operational" | "delay" | "fault" | "maintenance"

export interface ProductionData {
  id: string
  machineId: string
  timestamp: Date
  outputUnits: number
  qualityScore: number
  defectCount: number
  bGradeCount: number
}

export interface BradeProduct {
  id: string
  machineId: string
  batchId: string
  defectType: string
  severity: "low" | "medium" | "high"
  location: string
  timestamp: Date
  qcStaffId: string
  notes: string
}

export interface Task {
  id: string
  operatorId: string
  machineId: string
  startTime: Date
  endTime: Date
  status: "pending" | "in_progress" | "completed"
  description: string
}

export interface Alert {
  id: string
  type: "bottleneck" | "fault" | "quality" | "maintenance"
  machineId: string
  message: string
  severity: "low" | "medium" | "high"
  timestamp: Date
  resolved: boolean
}

export interface PerformanceMetrics {
  machineId: string
  date: Date
  outputPerHour: number
  downtime: number
  efficiency: number
  defectRate: number
  bGradeRate: number
}
