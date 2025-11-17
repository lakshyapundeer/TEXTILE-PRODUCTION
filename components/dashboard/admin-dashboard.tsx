"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockMachines, mockProductionData, mockBGradeProducts } from "@/lib/mock-data"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export function AdminDashboard() {
  const totalOutput = mockProductionData.reduce((sum, p) => sum + p.outputUnits, 0)
  const avgQuality = (
    mockProductionData.reduce((sum, p) => sum + p.qualityScore, 0) / mockProductionData.length
  ).toFixed(1)
  const totalBGrade = mockBGradeProducts.length

  const chartData = mockMachines.map((machine) => {
    const data = mockProductionData.find((p) => p.machineId === machine.id)
    return {
      name: machine.name.split(" ")[0],
      output: data?.outputUnits || 0,
      quality: data?.qualityScore || 0,
    }
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Production Analytics</h1>
        <p className="text-muted-foreground">Complete production overview and analytics</p>
      </div>

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
            <p className="text-sm text-muted-foreground mb-1">B-Grade Products</p>
            <p className="text-3xl font-bold text-yellow-400">{totalBGrade}</p>
            <p className="text-xs text-muted-foreground mt-2">quality issues</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Total Machines</p>
            <p className="text-3xl font-bold text-primary">{mockMachines.length}</p>
            <p className="text-xs text-muted-foreground mt-2">in operation</p>
          </CardContent>
        </Card>
      </div>

      {/* Production Chart */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Production Performance</CardTitle>
          <CardDescription>Output and quality metrics by machine</CardDescription>
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

      {/* B-Grade Products */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">B-Grade Products Log</CardTitle>
          <CardDescription>Quality issues and defects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockBGradeProducts.map((product) => (
              <div key={product.id} className="p-3 bg-muted/30 rounded-lg border border-border">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-foreground">{product.defectType.replace(/_/g, " ")}</p>
                    <p className="text-xs text-muted-foreground">Batch: {product.batchId}</p>
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
                <p className="text-sm text-muted-foreground">{product.notes}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
