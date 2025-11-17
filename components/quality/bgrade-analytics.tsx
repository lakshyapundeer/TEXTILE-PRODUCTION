"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockBGradeProducts } from "@/lib/mock-data"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

export function BradeAnalytics() {
  const highSeverity = mockBGradeProducts.filter((p) => p.severity === "high").length
  const mediumSeverity = mockBGradeProducts.filter((p) => p.severity === "medium").length
  const lowSeverity = mockBGradeProducts.filter((p) => p.severity === "low").length

  const defectTypeData = mockBGradeProducts.reduce(
    (acc, product) => {
      const existing = acc.find((item) => item.name === product.defectType)
      if (existing) {
        existing.value += 1
      } else {
        acc.push({ name: product.defectType.replace(/_/g, " "), value: 1 })
      }
      return acc
    },
    [] as Array<{ name: string; value: number }>,
  )

  const COLORS = ["#ef4444", "#eab308", "#3b82f6"]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          <p className="text-3xl font-bold text-red-400">{highSeverity}</p>
          <p className="text-xs text-muted-foreground mt-2">critical issues</p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground mb-1">Medium Severity</p>
          <p className="text-3xl font-bold text-yellow-400">{mediumSeverity}</p>
          <p className="text-xs text-muted-foreground mt-2">attention needed</p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground mb-1">Low Severity</p>
          <p className="text-3xl font-bold text-blue-400">{lowSeverity}</p>
          <p className="text-xs text-muted-foreground mt-2">minor issues</p>
        </CardContent>
      </Card>

      {/* Defect Type Chart */}
      <Card className="bg-card border-border md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Defect Types</CardTitle>
          <CardDescription>Distribution of defect types</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={defectTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
              >
                {defectTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Severity Distribution */}
      <Card className="bg-card border-border md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Severity Distribution</CardTitle>
          <CardDescription>B-Grade products by severity level</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={[
                  { name: "High", value: highSeverity },
                  { name: "Medium", value: mediumSeverity },
                  { name: "Low", value: lowSeverity },
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
              >
                <Cell fill="#ef4444" />
                <Cell fill="#eab308" />
                <Cell fill="#3b82f6" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
