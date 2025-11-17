"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, FileText } from "lucide-react"

export function ReportGenerator() {
  const [reportType, setReportType] = useState("daily")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = (format: "pdf" | "excel") => {
    setIsGenerating(true)
    setTimeout(() => {
      // Simulate report generation
      const filename = `production-report-${reportType}-${Date.now()}.${format === "pdf" ? "pdf" : "xlsx"}`
      alert(`Report generated: ${filename}`)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Report Generator
        </CardTitle>
        <CardDescription>Generate production and performance reports</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="reportType" className="text-foreground">
              Report Type
            </Label>
            <select
              id="reportType"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
            >
              <option value="daily">Daily Report</option>
              <option value="weekly">Weekly Report</option>
              <option value="monthly">Monthly Report</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {reportType === "custom" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-foreground">
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-foreground">
                  End Date
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>
            </>
          )}

          <div className="flex items-end gap-2">
            <Button
              onClick={() => handleGenerateReport("pdf")}
              disabled={isGenerating}
              className="flex-1 bg-primary hover:bg-primary/90 gap-2"
            >
              <Download className="h-4 w-4" />
              {isGenerating ? "Generating..." : "PDF"}
            </Button>
            <Button
              onClick={() => handleGenerateReport("excel")}
              disabled={isGenerating}
              className="flex-1 bg-primary hover:bg-primary/90 gap-2"
            >
              <Download className="h-4 w-4" />
              {isGenerating ? "Generating..." : "Excel"}
            </Button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground mb-3">
            <span className="font-semibold text-foreground">Report includes:</span>
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Production output and quality metrics</li>
            <li>Machine efficiency and downtime analysis</li>
            <li>B-Grade product statistics</li>
            <li>Performance trends and comparisons</li>
            <li>Bottleneck and alert summaries</li>
            <li>Recommendations for optimization</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
