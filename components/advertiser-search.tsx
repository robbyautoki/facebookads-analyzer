"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Loader2, ArrowRight, CheckCircle, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AdvertiserSuggestion {
  name: string
  id: string
  region: string
  ads_count: {
    lower: number
    upper: number
  }
  is_verified: boolean
}

interface DomainSuggestion {
  name: string
}

interface AdvertiserSearchProps {
  variant?: "hero" | "compact"
}

// Hilfsfunktion: Domain aus Firmennamen ableiten
const getDomainFromName = (name: string): string | null => {
  // Bekannte Firmen-Mappings
  const knownDomains: Record<string, string> = {
    "nike": "nike.com",
    "apple": "apple.com",
    "tesla": "tesla.com",
    "amazon": "amazon.com",
    "google": "google.com",
    "meta": "meta.com",
    "facebook": "facebook.com",
    "microsoft": "microsoft.com",
    "shopify": "shopify.com",
    "adidas": "adidas.com",
    "netflix": "netflix.com",
    "spotify": "spotify.com",
    "uber": "uber.com",
    "airbnb": "airbnb.com",
  }

  // Name bereinigen (z.B. "Nike, Inc." → "nike")
  const cleanName = name.toLowerCase()
    .replace(/,?\s*(inc\.?|llc|ltd|gmbh|ag|corp\.?|corporation|s\.?r\.?l\.?|co\.?)$/i, "")
    .trim()

  // Prüfen ob bekannte Domain
  if (knownDomains[cleanName]) {
    return knownDomains[cleanName]
  }

  // Versuchen aus dem Namen eine Domain zu generieren
  const simpleName = cleanName.replace(/[^a-z0-9]/g, "")
  if (simpleName.length >= 2) {
    return `${simpleName}.com`
  }

  return null
}

// Favicon-Komponente mit Fallback
function FaviconImage({
  domain,
  name,
  className
}: {
  domain: string | null
  name: string
  className?: string
}) {
  const [hasError, setHasError] = useState(false)

  if (!domain || hasError) {
    return (
      <div className={`bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold ${className}`}>
        {name.charAt(0).toUpperCase()}
      </div>
    )
  }

  return (
    <div className={`bg-white flex items-center justify-center overflow-hidden ${className}`}>
      <img
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
        alt={name}
        width={28}
        height={28}
        onError={() => setHasError(true)}
        className="object-contain"
      />
    </div>
  )
}

export function AdvertiserSearch({ variant = "hero" }: AdvertiserSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [advertisers, setAdvertisers] = useState<AdvertiserSuggestion[]>([])
  const [domains, setDomains] = useState<DomainSuggestion[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Debounced search
  useEffect(() => {
    if (searchQuery.length < 2) {
      setAdvertisers([])
      setDomains([])
      setShowDropdown(false)
      return
    }

    const timer = setTimeout(async () => {
      setIsSearching(true)
      try {
        const response = await fetch(`/api/search-advertisers?q=${encodeURIComponent(searchQuery)}`)
        const data = await response.json()
        setAdvertisers(data.advertisers || [])
        setDomains(data.domains || [])
        setShowDropdown(true)
        setSelectedIndex(-1)
      } catch (error) {
        console.error("Search error:", error)
      } finally {
        setIsSearching(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setShowDropdown(false)
    const encodedQuery = encodeURIComponent(searchQuery.trim())
    router.push(`/dashboard/advertiser/${encodedQuery}`)
  }

  const handleSelectAdvertiser = (name: string) => {
    setSearchQuery(name)
    setShowDropdown(false)
    setIsLoading(true)
    const encodedQuery = encodeURIComponent(name)
    router.push(`/dashboard/advertiser/${encodedQuery}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const totalItems = advertisers.length + domains.length

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : prev))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault()
      if (selectedIndex < advertisers.length) {
        handleSelectAdvertiser(advertisers[selectedIndex].name)
      } else {
        handleSelectAdvertiser(domains[selectedIndex - advertisers.length].name)
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false)
    }
  }

  const formatAdsCount = (count: { lower: number; upper: number }) => {
    if (count.lower === count.upper) {
      return count.lower.toLocaleString()
    }
    return `${count.lower.toLocaleString()}-${count.upper.toLocaleString()}`
  }

  const renderDropdown = () => {
    if (!showDropdown || (advertisers.length === 0 && domains.length === 0)) {
      return null
    }

    return (
      <motion.div
        ref={dropdownRef}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 max-h-96 overflow-y-auto"
      >
        {advertisers.length > 0 && (
          <div className="p-2">
            <div className="px-3 py-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
              Werbetreibende
            </div>
            {advertisers.map((advertiser, index) => (
              <button
                key={advertiser.id}
                onClick={() => handleSelectAdvertiser(advertiser.name)}
                className={`w-full px-3 py-3 flex items-center gap-3 rounded-xl transition-colors ${
                  selectedIndex === index
                    ? "bg-blue-50 dark:bg-blue-950"
                    : "hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <FaviconImage
                  domain={getDomainFromName(advertiser.name)}
                  name={advertiser.name}
                  className="h-10 w-10 rounded-xl flex-shrink-0"
                />
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900 dark:text-white">
                      {advertiser.name}
                    </span>
                    {advertiser.is_verified && (
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      {formatAdsCount(advertiser.ads_count)} Anzeigen
                    </span>
                    <Badge variant="outline" className="text-xs rounded-lg">
                      {advertiser.region}
                    </Badge>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {domains.length > 0 && (
          <div className="p-2 border-t border-slate-100 dark:border-slate-800">
            <div className="px-3 py-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
              Domains
            </div>
            {domains.map((domain, index) => {
              const itemIndex = advertisers.length + index
              return (
                <button
                  key={domain.name}
                  onClick={() => handleSelectAdvertiser(domain.name)}
                  className={`w-full px-3 py-3 flex items-center gap-3 rounded-xl transition-colors ${
                    selectedIndex === itemIndex
                      ? "bg-blue-50 dark:bg-blue-950"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <FaviconImage
                    domain={domain.name}
                    name={domain.name}
                    className="h-10 w-10 rounded-xl flex-shrink-0"
                  />
                  <span className="font-medium text-slate-900 dark:text-white">
                    {domain.name}
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </motion.div>
    )
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSearch} className="relative flex gap-2 w-full max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="search"
            placeholder="Werbetreibenden suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => searchQuery.length >= 2 && setShowDropdown(true)}
            className="pl-9 rounded-2xl"
          />
          {isSearching && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
          )}
        </div>
        <Button type="submit" disabled={isLoading || !searchQuery.trim()} className="rounded-2xl">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Suchen"}
        </Button>
        <AnimatePresence>{renderDropdown()}</AnimatePresence>
      </form>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-visible rounded-3xl bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 border-0">
        <CardContent className="p-8 text-white">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Facebook Werbung durchsuchen</h2>
              <p className="text-white/80 max-w-xl">
                Gib einen Werbetreibenden ein, um dessen Facebook Werbeanzeigen zu entdecken, Strategien zu analysieren und Wettbewerbseinblicke zu gewinnen.
              </p>
            </div>

            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 z-10" />
                <Input
                  ref={inputRef}
                  type="search"
                  placeholder="Werbetreibenden eingeben (z.B. Tesla, Nike, Apple...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => searchQuery.length >= 2 && setShowDropdown(true)}
                  className="h-14 pl-12 pr-12 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 border-0 text-lg"
                />
                {isSearching && (
                  <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-slate-400" />
                )}
                <AnimatePresence>{renderDropdown()}</AnimatePresence>
              </div>
              <Button
                type="submit"
                disabled={isLoading || !searchQuery.trim()}
                className="h-14 px-8 rounded-2xl bg-white text-blue-700 hover:bg-white/90 font-semibold text-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Suche läuft...
                  </>
                ) : (
                  <>
                    Werbung analysieren
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            <div className="flex flex-wrap gap-2 text-sm">
              <span className="text-white/60">Beliebte Suchen:</span>
              {["Tesla", "Nike", "Apple", "Shopify", "Amazon"].map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    setSearchQuery(name)
                    setShowDropdown(false)
                  }}
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
