"use client"

import { useState, type ReactNode } from "react"
import { motion } from "framer-motion"
import {
  Bell,
  Bookmark,
  ChevronDown,
  Cloud,
  FileText,
  Grid,
  Home,
  Layers,
  Menu,
  MessageSquare,
  PanelLeft,
  Search,
  Settings,
  TrendingUp,
  Users,
  X,
} from "lucide-react"

import { UserButton } from "@clerk/nextjs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

// Sidebar Navigations-Elemente
const sidebarItems = [
  {
    title: "Dashboard",
    icon: <Home className="h-5 w-5" />,
    isActive: true,
  },
  {
    title: "Werbeanzeigen",
    icon: <Grid className="h-5 w-5" />,
    badge: "12",
    items: [
      { title: "Alle Anzeigen", url: "#" },
      { title: "Video Anzeigen", url: "#" },
      { title: "Bild Anzeigen", url: "#", badge: "8" },
      { title: "Karussell Anzeigen", url: "#" },
    ],
  },
  {
    title: "Werbetreibende",
    icon: <Users className="h-5 w-5" />,
    items: [
      { title: "Gespeichert", url: "#", badge: "7" },
      { title: "Verfolgt", url: "#" },
      { title: "Kürzlich angesehen", url: "#" },
      { title: "Top Performer", url: "#" },
    ],
  },
  {
    title: "Kampagnen",
    icon: <Layers className="h-5 w-5" />,
    badge: "4",
    items: [
      { title: "Aktive Kampagnen", url: "#", badge: "4" },
      { title: "Abgeschlossen", url: "#" },
      { title: "Vorlagen", url: "#" },
    ],
  },
  {
    title: "Analysen",
    icon: <TrendingUp className="h-5 w-5" />,
    items: [
      { title: "Performance", url: "#" },
      { title: "Zielgruppen Einblicke", url: "#" },
      { title: "Wettbewerbsanalyse", url: "#" },
      { title: "Trends", url: "#" },
    ],
  },
  {
    title: "Berichte",
    icon: <FileText className="h-5 w-5" />,
    items: [
      { title: "Erstellte Berichte", url: "#" },
      { title: "Geplant", url: "#" },
      { title: "Export Verlauf", url: "#" },
    ],
  },
  {
    title: "Gespeicherte Suchen",
    icon: <Bookmark className="h-5 w-5" />,
    items: [
      { title: "Letzte Suchen", url: "#" },
      { title: "Gespeicherte Filter", url: "#" },
      { title: "Beobachtungslisten", url: "#" },
    ],
  },
]

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [notifications] = useState(5)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

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
        transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar - Mobile */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-background transition-transform duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col border-r">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                <TrendingUp className="size-5" />
              </div>
              <div>
                <h2 className="font-semibold">Schnellzugriff</h2>
                <p className="text-xs text-muted-foreground">Navigation</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="px-3 py-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Suchen..." className="w-full rounded-2xl bg-muted pl-9 pr-4 py-2" />
            </div>
          </div>

          <ScrollArea className="flex-1 px-3 py-2">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <div key={item.title} className="mb-1">
                  <button
                    className={cn(
                      "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium",
                      item.isActive ? "bg-primary/10 text-primary" : "hover:bg-muted",
                    )}
                    onClick={() => item.items && toggleExpanded(item.title)}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    {item.badge && (
                      <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    {item.items && (
                      <ChevronDown
                        className={cn(
                          "ml-2 h-4 w-4 transition-transform",
                          expandedItems[item.title] ? "rotate-180" : "",
                        )}
                      />
                    )}
                  </button>

                  {item.items && expandedItems[item.title] && (
                    <div className="mt-1 ml-6 space-y-1 border-l pl-3">
                      {item.items.map((subItem) => (
                        <a
                          key={subItem.title}
                          href={subItem.url}
                          className="flex items-center justify-between rounded-2xl px-3 py-2 text-sm hover:bg-muted"
                        >
                          {subItem.title}
                          {subItem.badge && (
                            <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                              {subItem.badge}
                            </Badge>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t p-3">
            <div className="space-y-1">
              <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
                <Settings className="h-5 w-5" />
                <span>Einstellungen</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar - Desktop */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden border-r bg-background transition-all duration-300 ease-in-out md:block",
          sidebarOpen ? "w-64" : "w-16",
        )}
      >
        <div className="flex h-full flex-col">
          <div className={cn("p-4", !sidebarOpen && "flex justify-center")}>
            <div className="flex items-center gap-3">
              <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                <TrendingUp className="size-5" />
              </div>
              {sidebarOpen && (
                <div>
                  <h2 className="font-semibold">Schnellzugriff</h2>
                  <p className="text-xs text-muted-foreground">Navigation</p>
                </div>
              )}
            </div>
          </div>

          {sidebarOpen && (
            <div className="px-3 py-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Suchen..." className="w-full rounded-2xl bg-muted pl-9 pr-4 py-2" />
              </div>
            </div>
          )}

          <ScrollArea className="flex-1 px-3 py-2">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <TooltipProvider key={item.title}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="mb-1">
                        <button
                          className={cn(
                            "flex w-full items-center rounded-2xl px-3 py-2 text-sm font-medium",
                            item.isActive ? "bg-primary/10 text-primary" : "hover:bg-muted",
                            !sidebarOpen && "justify-center",
                          )}
                          onClick={() => item.items && sidebarOpen && toggleExpanded(item.title)}
                        >
                          <div className={cn("flex items-center", sidebarOpen && "gap-3")}>
                            {item.icon}
                            {sidebarOpen && <span>{item.title}</span>}
                          </div>
                          {sidebarOpen && item.badge && (
                            <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                              {item.badge}
                            </Badge>
                          )}
                          {sidebarOpen && item.items && (
                            <ChevronDown
                              className={cn(
                                "ml-2 h-4 w-4 transition-transform",
                                expandedItems[item.title] ? "rotate-180" : "",
                              )}
                            />
                          )}
                        </button>

                        {sidebarOpen && item.items && expandedItems[item.title] && (
                          <div className="mt-1 ml-6 space-y-1 border-l pl-3">
                            {item.items.map((subItem) => (
                              <a
                                key={subItem.title}
                                href={subItem.url}
                                className="flex items-center justify-between rounded-2xl px-3 py-2 text-sm hover:bg-muted"
                              >
                                {subItem.title}
                                {subItem.badge && (
                                  <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                                    {subItem.badge}
                                  </Badge>
                                )}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </TooltipTrigger>
                    {!sidebarOpen && <TooltipContent side="right">{item.title}</TooltipContent>}
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t p-3">
            <div className="space-y-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className={cn(
                      "flex w-full items-center rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted",
                      !sidebarOpen && "justify-center"
                    )}>
                      <Settings className="h-5 w-5" />
                      {sidebarOpen && <span className="ml-3">Einstellungen</span>}
                    </button>
                  </TooltipTrigger>
                  {!sidebarOpen && <TooltipContent side="right">Einstellungen</TooltipContent>}
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>

      {/* Hauptinhalt */}
      <div className={cn("min-h-screen transition-all duration-300 ease-in-out", sidebarOpen ? "md:pl-64" : "md:pl-16")}>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <PanelLeft className="h-5 w-5" />
          </Button>
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold">Facebook Ads Analyzer</h1>
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-2xl">
                      <Cloud className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Cloud Speicher</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-2xl">
                      <MessageSquare className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Nachrichten</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-2xl relative">
                      <Bell className="h-5 w-5" />
                      {notifications > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                          {notifications}
                        </span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Benachrichtigungen</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9 border-2 border-primary"
                  }
                }}
              />
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
