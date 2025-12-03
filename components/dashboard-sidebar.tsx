"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bookmark,
  ChevronDown,
  FileText,
  Grid,
  Home,
  Layers,
  Search,
  Settings,
  TrendingUp,
  Users,
  X,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const sidebarItems = [
  {
    title: "Dashboard",
    icon: <Home className="h-5 w-5" />,
    href: "/dashboard",
  },
  {
    title: "Ad Library",
    icon: <Grid className="h-5 w-5" />,
    badge: "12",
    items: [
      { title: "All Ads", href: "/dashboard?tab=apps" },
      { title: "Video Ads", href: "/dashboard?tab=apps&filter=video" },
      { title: "Image Ads", href: "/dashboard?tab=apps&filter=image", badge: "8" },
      { title: "Carousel Ads", href: "/dashboard?tab=apps&filter=carousel" },
    ],
  },
  {
    title: "Advertisers",
    icon: <Users className="h-5 w-5" />,
    items: [
      { title: "Search Advertisers", href: "/dashboard?tab=files" },
      { title: "Saved", href: "/dashboard?tab=files&filter=saved", badge: "7" },
      { title: "Tracked", href: "/dashboard?tab=files&filter=tracked" },
      { title: "Recently Viewed", href: "/dashboard?tab=files&filter=recent" },
    ],
  },
  {
    title: "Campaigns",
    icon: <Layers className="h-5 w-5" />,
    badge: "4",
    items: [
      { title: "Active Campaigns", href: "/dashboard?tab=projects", badge: "4" },
      { title: "Completed", href: "/dashboard?tab=projects&filter=completed" },
      { title: "Templates", href: "/dashboard?tab=projects&filter=templates" },
    ],
  },
  {
    title: "Analytics",
    icon: <TrendingUp className="h-5 w-5" />,
    items: [
      { title: "Performance", href: "/dashboard?tab=learn" },
      { title: "Audience Insights", href: "/dashboard?tab=learn&filter=audience" },
      { title: "Competitor Analysis", href: "/dashboard?tab=learn&filter=competitor" },
      { title: "Trends", href: "/dashboard?tab=learn&filter=trends" },
    ],
  },
  {
    title: "Reports",
    icon: <FileText className="h-5 w-5" />,
    items: [
      { title: "Generated Reports", href: "/dashboard/reports" },
      { title: "Scheduled", href: "/dashboard/reports?filter=scheduled" },
      { title: "Export History", href: "/dashboard/reports?filter=exports" },
    ],
  },
  {
    title: "Saved Searches",
    icon: <Bookmark className="h-5 w-5" />,
    items: [
      { title: "Recent Searches", href: "/dashboard/saved" },
      { title: "Saved Filters", href: "/dashboard/saved?filter=filters" },
      { title: "Watchlists", href: "/dashboard/saved?filter=watchlists" },
    ],
  },
]

interface DashboardSidebarProps {
  isOpen: boolean
  onClose?: () => void
  isMobile?: boolean
}

export function DashboardSidebar({ isOpen, onClose, isMobile = false }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const isActiveItem = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname.startsWith(href.split("?")[0])
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className={cn("p-4", !isOpen && !isMobile && "flex justify-center")}>
        <div className="flex items-center gap-3">
          <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
            <TrendingUp className="size-5" />
          </div>
          {(isOpen || isMobile) && (
            <div>
              <h2 className="font-semibold">Quick Actions</h2>
              <p className="text-xs text-muted-foreground">Navigation</p>
            </div>
          )}
        </div>
        {isMobile && onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="ml-auto">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {(isOpen || isMobile) && (
        <div className="px-3 py-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="w-full rounded-2xl bg-muted pl-9 pr-4 py-2" />
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
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={cn(
                          "flex w-full items-center rounded-2xl px-3 py-2 text-sm font-medium",
                          isActiveItem(item.href) ? "bg-primary/10 text-primary" : "hover:bg-muted",
                          !isOpen && !isMobile && "justify-center"
                        )}
                      >
                        <div className={cn("flex items-center", (isOpen || isMobile) && "gap-3")}>
                          {item.icon}
                          {(isOpen || isMobile) && <span>{item.title}</span>}
                        </div>
                      </Link>
                    ) : (
                      <>
                        <button
                          className={cn(
                            "flex w-full items-center rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted",
                            !isOpen && !isMobile && "justify-center"
                          )}
                          onClick={() => item.items && (isOpen || isMobile) && toggleExpanded(item.title)}
                        >
                          <div className={cn("flex items-center", (isOpen || isMobile) && "gap-3")}>
                            {item.icon}
                            {(isOpen || isMobile) && <span>{item.title}</span>}
                          </div>
                          {(isOpen || isMobile) && item.badge && (
                            <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                              {item.badge}
                            </Badge>
                          )}
                          {(isOpen || isMobile) && item.items && (
                            <ChevronDown
                              className={cn(
                                "ml-2 h-4 w-4 transition-transform",
                                expandedItems[item.title] ? "rotate-180" : ""
                              )}
                            />
                          )}
                        </button>

                        {(isOpen || isMobile) && item.items && expandedItems[item.title] && (
                          <div className="mt-1 ml-6 space-y-1 border-l pl-3">
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.title}
                                href={subItem.href}
                                className="flex items-center justify-between rounded-2xl px-3 py-2 text-sm hover:bg-muted"
                              >
                                {subItem.title}
                                {subItem.badge && (
                                  <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                                    {subItem.badge}
                                  </Badge>
                                )}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </TooltipTrigger>
                {!isOpen && !isMobile && <TooltipContent side="right">{item.title}</TooltipContent>}
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
                <button
                  className={cn(
                    "flex w-full items-center rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted",
                    !isOpen && !isMobile && "justify-center"
                  )}
                >
                  <Settings className="h-5 w-5" />
                  {(isOpen || isMobile) && <span className="ml-3">Settings</span>}
                </button>
              </TooltipTrigger>
              {!isOpen && !isMobile && <TooltipContent side="right">Settings</TooltipContent>}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-background transition-transform duration-300 ease-in-out md:hidden border-r",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-30 hidden border-r bg-background transition-all duration-300 ease-in-out md:block",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <SidebarContent />
    </div>
  )
}
