"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Search, Loader2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface AdvertiserSearchProps {
  variant?: "hero" | "compact"
}

export function AdvertiserSearch({ variant = "hero" }: AdvertiserSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsLoading(true)
    // Navigate to results page with search query
    const encodedQuery = encodeURIComponent(searchQuery.trim())
    router.push(`/dashboard/advertiser/${encodedQuery}`)
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search advertiser name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 rounded-2xl"
          />
        </div>
        <Button type="submit" disabled={isLoading || !searchQuery.trim()} className="rounded-2xl">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
        </Button>
      </form>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 border-0">
        <CardContent className="p-8 text-white">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Search Facebook Ads</h2>
              <p className="text-white/80 max-w-xl">
                Enter an advertiser name to discover their Facebook ads, analyze their strategies, and gain competitive insights.
              </p>
            </div>

            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  type="search"
                  placeholder="Enter advertiser name (e.g., Eric Steigner, Nike, Apple...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 pl-12 pr-4 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 border-0 text-lg"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading || !searchQuery.trim()}
                className="h-14 px-8 rounded-2xl bg-white text-blue-700 hover:bg-white/90 font-semibold text-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    Analyze Ads
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            <div className="flex flex-wrap gap-2 text-sm">
              <span className="text-white/60">Popular searches:</span>
              {["Eric Steigner", "Nike", "Apple", "Tesla", "Shopify"].map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setSearchQuery(name)}
                  className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
