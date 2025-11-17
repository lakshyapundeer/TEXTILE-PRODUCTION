"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"

type UserRole = "operator" | "floor_manager" | "admin" | "qc_staff"

interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

export function LoginForm() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard")
    }
  }, [user, isLoading, router])

  // Demo credentials for testing
  const demoUsers: Record<string, { password: string; user: User }> = {
    "operator@textile.com": {
      password: "operator123",
      user: { id: "1", email: "operator@textile.com", name: "John Operator", role: "operator" },
    },
    "manager@textile.com": {
      password: "manager123",
      user: { id: "2", email: "manager@textile.com", name: "Sarah Manager", role: "floor_manager" },
    },
    "admin@textile.com": {
      password: "admin123",
      user: { id: "3", email: "admin@textile.com", name: "Admin User", role: "admin" },
    },
    "qc@textile.com": {
      password: "qc123",
      user: { id: "4", email: "qc@textile.com", name: "QC Inspector", role: "qc_staff" },
    },
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      // Demo authentication
      const demoUser = demoUsers[email]
      if (!demoUser || demoUser.password !== password) {
        setError("Invalid email or password")
        setIsSubmitting(false)
        return
      }

      localStorage.setItem("user", JSON.stringify(demoUser.user))

      // Give the auth context time to update
      setTimeout(() => {
        router.push("/dashboard")
      }, 200)
    } catch (err) {
      setError("An error occurred. Please try again.")
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl text-white">Textile Production Dashboard</CardTitle>
          <CardDescription className="text-slate-400">Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="operator@textile.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-700 rounded-md">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>

            <div className="mt-6 p-4 bg-slate-700/50 rounded-md border border-slate-600">
              <p className="text-xs text-slate-400 mb-3 font-semibold">Demo Credentials:</p>
              <div className="space-y-2 text-xs text-slate-300">
                <p>
                  <span className="font-semibold">Operator:</span> operator@textile.com / operator123
                </p>
                <p>
                  <span className="font-semibold">Floor Manager:</span> manager@textile.com / manager123
                </p>
                <p>
                  <span className="font-semibold">Admin:</span> admin@textile.com / admin123
                </p>
                <p>
                  <span className="font-semibold">QC Staff:</span> qc@textile.com / qc123
                </p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
