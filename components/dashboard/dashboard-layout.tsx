"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Menu, LogOut, Bell } from "lucide-react"
import { useAlerts } from "@/hooks/use-alerts"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { unreadCount } = useAlerts()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showNotifications, setShowNotifications] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      operator: "Operator",
      floor_manager: "Floor Manager",
      admin: "Administrator",
      qc_staff: "QC Inspector",
    }
    return labels[role] || role
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            {sidebarOpen && <h1 className="text-lg font-bold text-sidebar-foreground">PLOD</h1>}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors"
            >
              <Menu className="h-5 w-5 text-sidebar-foreground" />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sidebarOpen && (
            <div className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-4">
              Navigation
            </div>
          )}
          <NavLink icon="📊" label="Dashboard" href="/dashboard" open={sidebarOpen} />
          {["floor_manager", "admin"].includes(user?.role || "") && (
            <>
              <NavLink icon="📅" label="Scheduling" href="/dashboard/scheduling" open={sidebarOpen} />
              <NavLink icon="📈" label="Analytics" href="/dashboard/analytics" open={sidebarOpen} />
            </>
          )}
          {["qc_staff", "floor_manager", "admin"].includes(user?.role || "") && (
            <NavLink icon="✓" label="Quality" href="/dashboard/quality" open={sidebarOpen} />
          )}
          <NavLink icon="🔔" label="Alerts" href="/dashboard/alerts" open={sidebarOpen} />
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          {sidebarOpen && (
            <div className="mb-4 p-3 bg-sidebar-accent/20 rounded-lg">
              <p className="text-xs text-sidebar-foreground/70">Logged in as</p>
              <p className="text-sm font-semibold text-sidebar-foreground truncate">{user?.name}</p>
              <p className="text-xs text-sidebar-foreground/60">{getRoleLabel(user?.role || "")}</p>
            </div>
          )}
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-center gap-2 text-sidebar-foreground border-sidebar-border hover:bg-sidebar-accent bg-transparent"
          >
            <LogOut className="h-4 w-4" />
            {sidebarOpen && "Logout"}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Production Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-muted rounded-lg transition-colors relative"
              >
                <Bell className="h-5 w-5 text-foreground" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>
              {showNotifications && unreadCount > 0 && (
                <div className="absolute right-0 mt-2 p-2 bg-card border border-border rounded-lg shadow-lg">
                  <p className="text-sm text-foreground font-semibold">{unreadCount} new alerts</p>
                  <Button
                    onClick={() => router.push("/dashboard/alerts")}
                    className="mt-2 w-full text-xs bg-primary hover:bg-primary/90"
                  >
                    View All
                  </Button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}

interface NavLinkProps {
  icon: string
  label: string
  href: string
  open: boolean
}

function NavLink({ icon, label, href, open }: NavLinkProps) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
    >
      <span className="text-lg">{icon}</span>
      {open && <span className="text-sm font-medium">{label}</span>}
    </a>
  )
}
