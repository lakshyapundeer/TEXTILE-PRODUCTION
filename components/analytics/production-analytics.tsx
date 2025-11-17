"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockMachines, mockProductionData, mockBGradeProducts } from "@/lib/mock-data"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export function ProductionAnalytics() {
  const totalOutput = mockProductionData.reduce((sum, p) => sum + p.outputUnits, 0)
  const avgQuality = (
    mockProductionData.reduce((sum, p) => sum + p.qualityScore, 0) / mockProductionData.length
  ).toFixed(1)
  const totalDefects = mockProductionData.reduce((sum, p) => sum + p.defectCount, 0)
  const totalBGrade = mockBGradeProducts.length

  const chartData = mockMachines.map((machine) => {
    const data = mockProductionData.find((p) => p.machineId === machine.id)
    return {
      name: machine.name.split(" ")[0],
      output: data?.outputUnits || 0,
      quality: data?.qualityScore || 0,
      defects: data?.defectCount || 0,
    }
  })

  const qualityTrendData = [
    { time: "00:00", quality: 88 },
    { time: "04:00", quality: 90 },
    { time: "08:00", quality: 92 },
    { time: "12:00", quality: 91 },
    { time: "16:00", quality: 93 },
    { time: "20:00", quality: 89 },
    { time: "24:00", quality: 92 },
  ]

  const stageData = [
    { name: "Spinning", value: mockMachines.filter((m) => m.stage === "spinning").length },
    { name: "Weaving", value: mockMachines.filter((m) => m.stage === "weaving").length },
    { name: "Dyeing", value: mockMachines.filter((m) => m.stage === "dyeing").length },
    { name: "Finishing", value: mockMachines.filter((m) => m.stage === "finishing").length },
  ]

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"]

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Total Output</p>
            <p className="text-3xl font-bold text-foreground">{totalOutput}</p>
            <p className="text-xs text-muted-foreground mt-2">units produced</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Avg Quality</p>
            <p className="text-3xl font-bold text-green-400">{avgQuality}%</p>
            <p className="text-xs text-muted-foreground mt-2">across all machines</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Total Defects</p>
            <p className="text-3xl font-bold text-yellow-400">{totalDefects}</p>
            <p className="text-xs text-muted-foreground mt-2">quality issues</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">B-Grade Products</p>
            <p className="text-3xl font-bold text-red-400">{totalBGrade}</p>
            <p className="text-xs text-muted-foreground mt-2">flagged items</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Production by Machine */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Production by Machine</CardTitle>
            <CardDescription>Output and quality metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
                <YAxis stroke="rgba(255,255,255,0.7)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                />
                <Legend />
                <Bar dataKey="output" fill="#3b82f6" name="Output Units" />
                <Bar dataKey="quality" fill="#10b981" name="Quality %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quality Trend */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Quality Trend</CardTitle>
            <CardDescription>Quality score over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={qualityTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.7)" />
                <YAxis stroke="rgba(255,255,255,0.7)" domain={[80, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                />
                <Line type="monotone" dataKey="quality" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Machines by Stage */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Machines by Stage</CardTitle>
            <CardDescription>Distribution across production stages</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Defect Distribution */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Defect Analysis</CardTitle>
            <CardDescription>Defects per machine</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
                <YAxis stroke="rgba(255,255,255,0.7)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                />
                <Bar dataKey="defects" fill="#ef4444" name="Defects" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
