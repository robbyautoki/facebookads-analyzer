"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Download,
  Share2,
  Bookmark,
  FileText,
  Loader2,
  AlertCircle,
  RefreshCw,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdCard } from "@/components/ad-card"
import { AudienceInsights } from "@/components/audience-insights"
import { AdDetailModal } from "@/components/ad-detail-modal"
import type { AdvertiserAnalysis, SimpleAd } from "@/types/ads"

export default function AdvertiserResultsPage() {
  const params = useParams()
  const router = useRouter()
  const advertiserName = decodeURIComponent(params.name as string)

  const [data, setData] = useState<AdvertiserAnalysis | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedAd, setSelectedAd] = useState<SimpleAd | null>(null)
  const [watchlistSaved, setWatchlistSaved] = useState(false)

  // Background gradient component
  const GradientBackground = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
    </div>
  )

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/scrape-ads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ advertiserName }),
      })

      const result = await response.json()

      if (!result.success) {
        setError(result.error || "Failed to fetch ads")
        return
      }

      setData(result.data)
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advertiserName])

  const handleExportCSV = () => {
    if (!data) return

    const headers = ["Title", "Body", "Status", "Start Date", "End Date", "Platforms", "CTA", "Link"]
    const rows = data.ads.map((ad) => [
      ad.title,
      ad.body.replace(/"/g, '""'),
      ad.isActive ? "Active" : "Inactive",
      ad.startDate || "",
      ad.endDate || "",
      ad.platforms.join(", "),
      ad.ctaText || "",
      ad.linkUrl || "",
    ])

    const csvContent = [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${advertiserName.replace(/\s+/g, "_")}_ads_export.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleSaveToWatchlist = () => {
    if (!data) return

    const watchlist = JSON.parse(localStorage.getItem("advertiser_watchlist") || "[]")
    const exists = watchlist.find((item: { id: string }) => item.id === data.advertiser.id)

    if (!exists) {
      watchlist.push({
        id: data.advertiser.id,
        name: data.advertiser.name,
        category: data.advertiser.category,
        savedAt: new Date().toISOString(),
      })
      localStorage.setItem("advertiser_watchlist", JSON.stringify(watchlist))
      setWatchlistSaved(true)
    }
  }

  const handleShare = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      alert("Link copied to clipboard!")
    } catch {
      // Fallback
      const input = document.createElement("input")
      input.value = url
      document.body.appendChild(input)
      input.select()
      document.execCommand("copy")
      document.body.removeChild(input)
      alert("Link copied to clipboard!")
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="h-16 w-16 text-primary" />
        </motion.div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Analyzing Ads for &quot;{advertiserName}&quot;</h2>
          <p className="text-muted-foreground">
            This may take a few minutes. We&apos;re scanning the Facebook Ads Library...
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          Scraping in progress
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Unable to fetch ads</h2>
          <p className="text-muted-foreground max-w-md">{error}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <Button onClick={fetchData}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (!data) return null

  const { advertiser, ads, audience } = data
  const activeAds = ads.filter((ad) => ad.isActive)
  const inactiveAds = ads.filter((ad) => !ad.isActive)

  return (
    <>
      <GradientBackground />
      <div className="min-h-screen p-6 md:p-8 space-y-6">
      {/* Back button */}
      <Button variant="ghost" onClick={() => router.back()} className="rounded-2xl">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Search
      </Button>

      {/* Advertiser Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-0">
          <CardContent className="p-8 text-white">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* Profile Photo */}
              <div className="h-20 w-20 rounded-2xl bg-white/10 overflow-hidden flex-shrink-0">
                {advertiser.profilePhoto ? (
                  <img
                    src={advertiser.profilePhoto}
                    alt={advertiser.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-3xl font-bold">
                    {advertiser.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-3xl font-bold">{advertiser.name}</h1>
                  {advertiser.verification === "VERIFIED" && (
                    <Badge className="bg-blue-500">Verified</Badge>
                  )}
                </div>
                {advertiser.category && (
                  <p className="text-white/70">{advertiser.category}</p>
                )}
                {advertiser.about && (
                  <p className="text-white/60 text-sm line-clamp-2">{advertiser.about}</p>
                )}
                <div className="flex flex-wrap gap-4 text-sm">
                  {advertiser.likes && (
                    <span className="text-white/70">{advertiser.likes.toLocaleString()} Likes</span>
                  )}
                  <span className="text-white/70">{advertiser.totalAds} Total Ads</span>
                  <span className="text-green-400">{advertiser.activeAds} Active</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  className="rounded-2xl border-white/20 text-white hover:bg-white/10"
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  className="rounded-2xl border-white/20 text-white hover:bg-white/10"
                  onClick={handleSaveToWatchlist}
                  disabled={watchlistSaved}
                >
                  <Bookmark className={`mr-2 h-4 w-4 ${watchlistSaved ? "fill-current" : ""}`} />
                  {watchlistSaved ? "Saved" : "Save"}
                </Button>
                <Button
                  variant="outline"
                  className="rounded-2xl border-white/20 text-white hover:bg-white/10"
                  onClick={handleExportCSV}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
                <Button className="rounded-2xl bg-white text-slate-900 hover:bg-white/90">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </div>

            {/* View on Facebook */}
            {advertiser.pageUrl && (
              <a
                href={advertiser.pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm text-white/60 hover:text-white transition-colors"
              >
                View on Facebook
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4 rounded-2xl p-1">
          <TabsTrigger value="all" className="rounded-xl">
            All ({ads.length})
          </TabsTrigger>
          <TabsTrigger value="active" className="rounded-xl">
            Active ({activeAds.length})
          </TabsTrigger>
          <TabsTrigger value="inactive" className="rounded-xl">
            Inactive ({inactiveAds.length})
          </TabsTrigger>
          <TabsTrigger value="insights" className="rounded-xl">
            Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {ads.map((ad) => (
              <AdCard key={ad.id} ad={ad} onClick={() => setSelectedAd(ad)} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          {activeAds.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No active ads found
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {activeAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} onClick={() => setSelectedAd(ad)} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="inactive" className="mt-6">
          {inactiveAds.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No inactive ads found
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {inactiveAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} onClick={() => setSelectedAd(ad)} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="insights" className="mt-6">
          <AudienceInsights audience={audience} totalAds={ads.length} />
        </TabsContent>
      </Tabs>

        {/* Ad Detail Modal */}
        <AdDetailModal ad={selectedAd} onClose={() => setSelectedAd(null)} />
      </div>
    </>
  )
}
