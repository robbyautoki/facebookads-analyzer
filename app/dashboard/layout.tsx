"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(120, 41, 190, 0.5) 0%, rgba(53, 71, 125, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 30% 70%, rgba(233, 30, 99, 0.5) 0%, rgba(81, 45, 168, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 70% 30%, rgba(76, 175, 80, 0.5) 0%, rgba(32, 119, 188, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 50% 50%, rgba(120, 41, 190, 0.5) 0%, rgba(53, 71, 125, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
          ],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <DashboardSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        isMobile={true}
      />

      {/* Desktop Sidebar */}
      <DashboardSidebar isOpen={sidebarOpen} />

      {/* Main Content */}
      <div
        className={cn(
          "min-h-screen transition-all duration-300 ease-in-out",
          sidebarOpen ? "md:pl-64" : "md:pl-16"
        )}
      >
        <DashboardHeader
          onMobileMenuToggle={() => setMobileMenuOpen(true)}
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
          notifications={5}
        />

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
