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
import {
  StatisticsAdsCard,
  StatisticsActiveCard,
  StatisticsReachCard,
  StatisticsLikesCard,
} from "@/components/statistics"
import type { AdvertiserAnalysis, SimpleAd } from "@/types/ads"

// Akzentfarbe basierend auf Kategorie (für Border und dezente Highlights)
const getCategoryAccent = (category?: string): { border: string; text: string; glow: string } => {
  if (!category) return { border: 'border-slate-700', text: 'text-slate-400', glow: 'shadow-slate-500/10' }

  const cat = category.toLowerCase()

  // Entertainment / Media
  if (cat.includes('entertainment') || cat.includes('media') || cat.includes('music') || cat.includes('video')) {
    return { border: 'border-violet-500/30', text: 'text-violet-400', glow: 'shadow-violet-500/20' }
  }
  // Technology / Software
  if (cat.includes('tech') || cat.includes('software') || cat.includes('app') || cat.includes('computer')) {
    return { border: 'border-cyan-500/30', text: 'text-cyan-400', glow: 'shadow-cyan-500/20' }
  }
  // E-commerce / Shopping
  if (cat.includes('commerce') || cat.includes('shop') || cat.includes('retail') || cat.includes('store')) {
    return { border: 'border-emerald-500/30', text: 'text-emerald-400', glow: 'shadow-emerald-500/20' }
  }
  // Finance / Business
  if (cat.includes('finance') || cat.includes('bank') || cat.includes('business') || cat.includes('consulting')) {
    return { border: 'border-amber-500/30', text: 'text-amber-400', glow: 'shadow-amber-500/20' }
  }
  // Health / Fitness
  if (cat.includes('health') || cat.includes('fitness') || cat.includes('medical') || cat.includes('wellness')) {
    return { border: 'border-emerald-500/30', text: 'text-emerald-400', glow: 'shadow-emerald-500/20' }
  }
  // Food / Restaurant
  if (cat.includes('food') || cat.includes('restaurant') || cat.includes('cafe') || cat.includes('drink')) {
    return { border: 'border-orange-500/30', text: 'text-orange-400', glow: 'shadow-orange-500/20' }
  }
  // Fashion / Beauty
  if (cat.includes('fashion') || cat.includes('beauty') || cat.includes('clothing') || cat.includes('apparel')) {
    return { border: 'border-pink-500/30', text: 'text-pink-400', glow: 'shadow-pink-500/20' }
  }
  // Gaming
  if (cat.includes('gaming') || cat.includes('game') || cat.includes('esport')) {
    return { border: 'border-purple-500/30', text: 'text-purple-400', glow: 'shadow-purple-500/20' }
  }
  // Education
  if (cat.includes('education') || cat.includes('school') || cat.includes('university') || cat.includes('learning')) {
    return { border: 'border-blue-500/30', text: 'text-blue-400', glow: 'shadow-blue-500/20' }
  }
  // Travel
  if (cat.includes('travel') || cat.includes('hotel') || cat.includes('tourism') || cat.includes('airline')) {
    return { border: 'border-sky-500/30', text: 'text-sky-400', glow: 'shadow-sky-500/20' }
  }
  // Crypto / Web3
  if (cat.includes('crypto') || cat.includes('web3') || cat.includes('blockchain') || cat.includes('nft')) {
    return { border: 'border-amber-500/30', text: 'text-amber-400', glow: 'shadow-amber-500/20' }
  }

  return { border: 'border-slate-700', text: 'text-slate-400', glow: 'shadow-slate-500/10' }
}

export default function AdvertiserResultsPage() {
  const params = useParams()
  const router = useRouter()
  const advertiserName = decodeURIComponent(params.name as string)

  const [data, setData] = useState<AdvertiserAnalysis | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedAd, setSelectedAd] = useState<SimpleAd | null>(null)
  const [watchlistSaved, setWatchlistSaved] = useState(false)
  const [fromCache, setFromCache] = useState(false)

  const fetchData = async (forceRefresh = false) => {
    setLoading(true)
    setError(null)
    setFromCache(false)

    try {
      const response = await fetch("/api/scrape-ads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ advertiserName, forceRefresh }),
      })

      const result = await response.json()

      if (!result.success) {
        setError(result.error || "Fehler beim Abrufen der Werbeanzeigen")
        return
      }

      setData(result.data)
      setFromCache(result.fromCache || false)

      // Suche in der Datenbank speichern (mit Cache-Daten wenn nicht aus Cache)
      try {
        await fetch("/api/search-history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            advertiserName: result.data.advertiser.name,
            advertiserId: result.data.advertiser.id,
            category: result.data.advertiser.category,
            totalAds: result.data.advertiser.totalAds,
            activeAds: result.data.advertiser.activeAds,
            // Nur cachen wenn frisch von der API (nicht aus Cache)
            ...(result.fromCache ? {} : { cachedData: result.data }),
          }),
        })
      } catch {
        // Fehler beim Speichern ignorieren - Hauptfunktion soll weiterlaufen
        console.error("Fehler beim Speichern der Suche")
      }
    } catch {
      setError("Netzwerkfehler. Bitte versuche es erneut.")
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

  // Ladezustand
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
          <h2 className="text-2xl font-semibold">Analysiere Werbung für &quot;{advertiserName}&quot;</h2>
          <p className="text-muted-foreground">
            Das kann einige Minuten dauern. Wir durchsuchen die Facebook Ads Library...
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          Daten werden abgerufen
        </div>
      </div>
    )
  }

  // Fehlerzustand
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Werbung konnte nicht abgerufen werden</h2>
          <p className="text-muted-foreground max-w-md">{error}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück
          </Button>
          <Button onClick={() => fetchData(true)}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Erneut versuchen
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
    <div className="space-y-6">
      {/* Zurück-Button */}
      <Button variant="ghost" onClick={() => router.back()} className="rounded-2xl">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Zurück zur Suche
      </Button>

      {/* Advertiser Header - Premium Dark Design mit Akzent-Border */}
      {(() => {
        const accent = getCategoryAccent(advertiser.category)
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className={`overflow-hidden rounded-3xl bg-slate-950 border-t-2 ${accent.border} relative`}>
              <CardContent className="p-8 relative">
                {/* Top Section: Profile + Info + Actions */}
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                  {/* Profile Photo */}
                  <div className="h-24 w-24 rounded-2xl bg-slate-800 overflow-hidden flex-shrink-0 border border-slate-700 shadow-xl">
                    {advertiser.profilePhoto ? (
                      <img
                        src={advertiser.profilePhoto}
                        alt={advertiser.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className={`h-full w-full flex items-center justify-center text-4xl font-bold bg-slate-800 ${accent.text}`}>
                        {advertiser.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h1 className="text-3xl font-bold text-white">{advertiser.name}</h1>
                      {advertiser.verification === "VERIFIED" && (
                        <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30">Verifiziert</Badge>
                      )}
                      {fromCache && (
                        <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Cache
                        </Badge>
                      )}
                    </div>
                    {advertiser.category && (
                      <p className={`font-medium ${accent.text}`}>{advertiser.category}</p>
                    )}
                    {advertiser.about && (
                      <p className="text-slate-400 text-sm line-clamp-2 max-w-2xl">{advertiser.about}</p>
                    )}
                    {/* Facebook Link */}
                    {advertiser.pageUrl && (
                      <a
                        href={advertiser.pageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Auf Facebook ansehen
                      </a>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      className="rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
                      onClick={() => fetchData(true)}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Aktualisieren
                    </Button>
                    <Button
                      size="sm"
                      className="rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
                      onClick={handleShare}
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Teilen
                    </Button>
                    <Button
                      size="sm"
                      className="rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
                      onClick={handleSaveToWatchlist}
                      disabled={watchlistSaved}
                    >
                      <Bookmark className={`mr-2 h-4 w-4 ${watchlistSaved ? "fill-current" : ""}`} />
                      {watchlistSaved ? "Gespeichert" : "Merken"}
                    </Button>
                    <Button
                      size="sm"
                      className="rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
                      onClick={handleExportCSV}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                    <Button
                      size="sm"
                      className="rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-semibold transition-all"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Bericht
                    </Button>
                  </div>
                </div>

                {/* Statistics Cards with Charts */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <StatisticsAdsCard totalAds={advertiser.totalAds} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <StatisticsActiveCard activeAds={advertiser.activeAds} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <StatisticsReachCard reach={audience.totalReach} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <StatisticsLikesCard likes={advertiser.likes} />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })()}

      {/* Hauptinhalt Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4 rounded-2xl p-1">
          <TabsTrigger value="all" className="rounded-xl">
            Alle ({ads.length})
          </TabsTrigger>
          <TabsTrigger value="active" className="rounded-xl">
            Aktiv ({activeAds.length})
          </TabsTrigger>
          <TabsTrigger value="inactive" className="rounded-xl">
            Inaktiv ({inactiveAds.length})
          </TabsTrigger>
          <TabsTrigger value="insights" className="rounded-xl">
            Einblicke
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
              Keine aktiven Werbeanzeigen gefunden
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
              Keine inaktiven Werbeanzeigen gefunden
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
  )
}
