"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Award,
  Bookmark,
  BookOpen,
  Code,
  Crown,
  Download,
  FileText,
  Heart,
  ImageIcon,
  Layers,
  LayoutGrid,
  PanelLeft,
  Plus,
  Search,
  Share2,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Video,
  Clock,
  Eye,
  Archive,
  ArrowUpDown,
  MoreHorizontal,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdvertiserSearch } from "@/components/advertiser-search"

// Sample data for ads
const ads = [
  {
    name: "Summer Sale Campaign",
    icon: <Video className="text-violet-500" />,
    description: "Video ad promoting summer discounts",
    category: "Video",
    recent: true,
    new: false,
    status: "active",
    reach: 12500,
  },
  {
    name: "Product Launch",
    icon: <ImageIcon className="text-orange-500" />,
    description: "Image carousel for new product line",
    category: "Image",
    recent: true,
    new: false,
    status: "active",
    reach: 8700,
  },
  {
    name: "Brand Awareness",
    icon: <Video className="text-pink-500" />,
    description: "Video ad for brand recognition",
    category: "Video",
    recent: true,
    new: false,
    status: "inactive",
    reach: 15200,
  },
  {
    name: "Webinar Promo",
    icon: <Sparkles className="text-blue-500" />,
    description: "Lead generation for upcoming webinar",
    category: "Video",
    recent: false,
    new: false,
    status: "inactive",
    reach: 6300,
  },
  {
    name: "Holiday Special",
    icon: <ImageIcon className="text-red-500" />,
    description: "Seasonal promotion campaign",
    category: "Image",
    recent: false,
    new: false,
    status: "inactive",
    reach: 9100,
  },
  {
    name: "App Install",
    icon: <LayoutGrid className="text-fuchsia-500" />,
    description: "Mobile app download campaign",
    category: "Video",
    recent: false,
    new: true,
    status: "active",
    reach: 4500,
  },
  {
    name: "Retargeting Ad",
    icon: <TrendingUp className="text-teal-500" />,
    description: "Re-engage website visitors",
    category: "Image",
    recent: false,
    new: false,
    status: "active",
    reach: 3200,
  },
  {
    name: "Newsletter Signup",
    icon: <FileText className="text-red-600" />,
    description: "Lead generation for email list",
    category: "Image",
    recent: false,
    new: false,
    status: "inactive",
    reach: 2100,
  },
  {
    name: "Flash Sale",
    icon: <Sparkles className="text-emerald-500" />,
    description: "Limited time offer promotion",
    category: "Video",
    recent: false,
    new: true,
    status: "active",
    reach: 7800,
  },
  {
    name: "Testimonial Ad",
    icon: <Users className="text-indigo-500" />,
    description: "Customer success story video",
    category: "Video",
    recent: false,
    new: true,
    status: "active",
    reach: 5600,
  },
  {
    name: "Contest Promo",
    icon: <Award className="text-amber-500" />,
    description: "Engagement campaign with prizes",
    category: "Image",
    recent: false,
    new: false,
    status: "inactive",
    reach: 11200,
  },
  {
    name: "Free Trial Offer",
    icon: <Crown className="text-purple-500" />,
    description: "SaaS free trial promotion",
    category: "Video",
    recent: false,
    new: false,
    status: "active",
    reach: 4900,
  },
]

// Sample data for saved advertisers
const savedAdvertisers = [
  {
    name: "Eric Steigner",
    category: "Marketing & Coaching",
    modified: "2 hours ago",
    icon: <Users className="text-violet-500" />,
    tracked: true,
    totalAds: 12,
    activeAds: 3,
  },
  {
    name: "Digital Marketing Pro",
    category: "E-Commerce",
    modified: "Yesterday",
    icon: <TrendingUp className="text-orange-500" />,
    tracked: true,
    totalAds: 45,
    activeAds: 12,
  },
  {
    name: "Fitness Academy",
    category: "Health & Fitness",
    modified: "3 days ago",
    icon: <Award className="text-pink-500" />,
    tracked: false,
    totalAds: 28,
    activeAds: 8,
  },
  {
    name: "Tech Startup Inc",
    category: "Technology",
    modified: "Last week",
    icon: <Sparkles className="text-blue-500" />,
    tracked: true,
    totalAds: 67,
    activeAds: 15,
  },
  {
    name: "Beauty Brand Co",
    category: "Beauty & Cosmetics",
    modified: "2 weeks ago",
    icon: <Heart className="text-red-500" />,
    tracked: false,
    totalAds: 89,
    activeAds: 22,
  },
  {
    name: "Online Course Hub",
    category: "Education",
    modified: "3 weeks ago",
    icon: <BookOpen className="text-fuchsia-500" />,
    tracked: true,
    totalAds: 34,
    activeAds: 7,
  },
  {
    name: "SaaS Solutions",
    category: "Software",
    modified: "Last month",
    icon: <Code className="text-teal-500" />,
    tracked: false,
    totalAds: 56,
    activeAds: 18,
  },
]

// Sample data for campaigns
const campaigns = [
  {
    name: "Q4 Holiday Campaign",
    description: "Black Friday and Christmas promotions",
    progress: 75,
    dueDate: "December 31, 2025",
    adsCount: 24,
    totalReach: 125000,
  },
  {
    name: "Product Launch 2025",
    description: "New product line advertising strategy",
    progress: 60,
    dueDate: "March 15, 2025",
    adsCount: 18,
    totalReach: 89000,
  },
  {
    name: "Brand Awareness",
    description: "Increase brand recognition in EU market",
    progress: 90,
    dueDate: "February 28, 2025",
    adsCount: 32,
    totalReach: 234000,
  },
  {
    name: "Lead Generation",
    description: "Collect leads for webinar series",
    progress: 40,
    dueDate: "April 20, 2025",
    adsCount: 12,
    totalReach: 56000,
  },
]

// Sample data for analytics reports
const reports = [
  {
    title: "Ad Performance Analysis",
    description: "Detailed breakdown of ad performance metrics",
    duration: "Updated daily",
    level: "Overview",
    category: "Performance",
    views: "24K",
  },
  {
    title: "Audience Insights Report",
    description: "Demographics and behavior analysis of target audiences",
    duration: "Updated weekly",
    level: "Detailed",
    category: "Audience",
    views: "56K",
  },
  {
    title: "Competitor Comparison",
    description: "Compare your ads with competitor strategies",
    duration: "Updated monthly",
    level: "Advanced",
    category: "Competitive",
    views: "32K",
  },
  {
    title: "ROI Calculator",
    description: "Estimate return on investment for ad campaigns",
    duration: "Real-time",
    level: "Basic",
    category: "Financial",
    views: "18K",
  },
  {
    title: "Trend Analysis",
    description: "Identify trending ad formats and messaging",
    duration: "Updated weekly",
    level: "Intermediate",
    category: "Trends",
    views: "41K",
  },
]

// Sample data for top performing ads
const topPerformers = [
  {
    title: "Summer Sale Video Ad",
    advertiser: "Fashion Brand",
    reach: 125000,
    engagement: 8.5,
    image: "/placeholder.svg?height=300&width=400",
    time: "2 days ago",
  },
  {
    title: "Product Launch Carousel",
    advertiser: "Tech Startup",
    reach: 89000,
    engagement: 12.3,
    image: "/placeholder.svg?height=300&width=400",
    time: "1 week ago",
  },
  {
    title: "Brand Story Video",
    advertiser: "Lifestyle Co",
    reach: 234000,
    engagement: 6.7,
    image: "/placeholder.svg?height=300&width=400",
    time: "3 days ago",
  },
  {
    title: "Limited Offer Banner",
    advertiser: "E-Commerce Shop",
    reach: 56000,
    engagement: 15.2,
    image: "/placeholder.svg?height=300&width=400",
    time: "5 days ago",
  },
]

interface SearchHistoryItem {
  id: string
  advertiserName: string
  advertiserId?: string
  category?: string
  totalAds?: number
  activeAds?: number
  searchedAt: string
}

export function FacebookAdsAnalyzer() {
  const [activeTab, setActiveTab] = useState("home")
  const [recentSearches, setRecentSearches] = useState<SearchHistoryItem[]>([])
  const [loadingSearches, setLoadingSearches] = useState(true)
  const router = useRouter()

  // Letzte Suchen aus der Datenbank laden
  useEffect(() => {
    const fetchRecentSearches = async () => {
      try {
        const response = await fetch("/api/search-history")
        if (response.ok) {
          const data = await response.json()
          setRecentSearches(data)
        }
      } catch (error) {
        console.error("Fehler beim Laden der Suchen:", error)
      } finally {
        setLoadingSearches(false)
      }
    }
    fetchRecentSearches()
  }, [])

  // Zeitformat für "vor X Minuten/Stunden/Tagen"
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return "Gerade eben"
    if (diffMins < 60) return `Vor ${diffMins} Minute${diffMins > 1 ? "n" : ""}`
    if (diffHours < 24) return `Vor ${diffHours} Stunde${diffHours > 1 ? "n" : ""}`
    if (diffDays < 7) return `Vor ${diffDays} Tag${diffDays > 1 ? "en" : ""}`
    return date.toLocaleDateString("de-DE")
  }

  return (
    <Tabs defaultValue="home" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <TabsList className="grid w-full max-w-[600px] grid-cols-5 rounded-2xl p-1">
                <TabsTrigger value="home" className="rounded-xl data-[state=active]:rounded-xl">
                  Übersicht
                </TabsTrigger>
                <TabsTrigger value="apps" className="rounded-xl data-[state=active]:rounded-xl">
                  Alle Anzeigen
                </TabsTrigger>
                <TabsTrigger value="files" className="rounded-xl data-[state=active]:rounded-xl">
                  Werbetreibende
                </TabsTrigger>
                <TabsTrigger value="projects" className="rounded-xl data-[state=active]:rounded-xl">
                  Kampagnen
                </TabsTrigger>
                <TabsTrigger value="learn" className="rounded-xl data-[state=active]:rounded-xl">
                  Berichte
                </TabsTrigger>
              </TabsList>
              <div className="hidden md:flex gap-2">
                <Button variant="outline" className="rounded-2xl">
                  <Search className="mr-2 h-4 w-4" />
                  Suchen
                </Button>
                <Button className="rounded-2xl">
                  <Plus className="mr-2 h-4 w-4" />
                  Werbetreibenden hinzufügen
                </Button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TabsContent value="home" className="space-y-8 mt-0">
                  {/* Suchkomponente */}
                  <AdvertiserSearch />

                  {/* Letzte Suchen */}
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <section className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">Letzte Suchen</h2>
                        <Button variant="ghost" className="rounded-2xl" onClick={() => setActiveTab("files")}>
                          Alle anzeigen
                        </Button>
                      </div>
                      <div className="rounded-3xl border">
                        <div className="grid grid-cols-1 divide-y">
                          {loadingSearches ? (
                            <div className="p-8 text-center text-muted-foreground">
                              Lade Suchen...
                            </div>
                          ) : recentSearches.length === 0 ? (
                            <div className="p-8 text-center text-muted-foreground">
                              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                              <p>Noch keine Suchen vorhanden</p>
                              <p className="text-sm">Suche nach einem Werbetreibenden, um zu starten</p>
                            </div>
                          ) : (
                            recentSearches.slice(0, 5).map((search) => (
                              <motion.div
                                key={search.id}
                                whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                                className="flex items-center justify-between p-4 cursor-pointer"
                                onClick={() => router.push(`/dashboard/advertiser/${encodeURIComponent(search.advertiserName)}`)}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold">
                                    {search.advertiserName.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="font-medium">{search.advertiserName}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {search.category || "Werbetreibender"} • {formatTimeAgo(search.searchedAt)}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {search.activeAds && (
                                    <Badge variant="outline" className="rounded-xl">
                                      {search.activeAds} aktiv
                                    </Badge>
                                  )}
                                  <Button variant="ghost" size="sm" className="rounded-xl">
                                    Ansehen
                                  </Button>
                                </div>
                              </motion.div>
                            ))
                          )}
                        </div>
                      </div>
                    </section>

                    <section className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">Aktive Kampagnen</h2>
                        <Button variant="ghost" className="rounded-2xl" onClick={() => setActiveTab("projects")}>
                          Alle anzeigen
                        </Button>
                      </div>
                      <div className="rounded-3xl border">
                        <div className="grid grid-cols-1 divide-y">
                          {campaigns.slice(0, 3).map((campaign) => (
                            <motion.div
                              key={campaign.name}
                              whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                              className="p-4"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium">{campaign.name}</h3>
                                <Badge variant="outline" className="rounded-xl">
                                  Fällig {campaign.dueDate}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{campaign.description}</p>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span>Fortschritt</span>
                                  <span>{campaign.progress}%</span>
                                </div>
                                <Progress value={campaign.progress} className="h-2 rounded-xl" />
                              </div>
                              <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Layers className="mr-1 h-4 w-4" />
                                  {campaign.adsCount} Anzeigen
                                </div>
                                <div className="flex items-center">
                                  <TrendingUp className="mr-1 h-4 w-4" />
                                  {campaign.totalReach.toLocaleString()} Reichweite
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </section>
                  </div>

                  <section className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">Top Performer</h2>
                      <Button variant="ghost" className="rounded-2xl">
                        Erkunden
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {topPerformers.map((ad) => (
                        <motion.div key={ad.title} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                          <Card className="overflow-hidden rounded-3xl">
                            <div className="aspect-[4/3] overflow-hidden bg-muted">
                              <img
                                src={ad.image || "/placeholder.svg"}
                                alt={ad.title}
                                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                              />
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-semibold">{ad.title}</h3>
                              <p className="text-sm text-muted-foreground">von {ad.advertiser}</p>
                              <div className="mt-2 flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                  <Eye className="h-4 w-4 text-blue-500" />
                                  {ad.reach.toLocaleString()}
                                  <TrendingUp className="ml-2 h-4 w-4 text-green-500" />
                                  {ad.engagement}%
                                </div>
                                <span className="text-muted-foreground">{ad.time}</span>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                </TabsContent>

                <TabsContent value="apps" className="space-y-8 mt-0">
                  <section>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden rounded-3xl bg-gradient-to-r from-pink-600 via-red-600 to-orange-600 p-8 text-white"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                          <h2 className="text-3xl font-bold">Ad Library Explorer</h2>
                          <p className="max-w-[600px] text-white/80">
                            Browse and analyze all discovered Facebook ads from various advertisers.
                          </p>
                        </div>
                        <Button className="w-fit rounded-2xl bg-white text-red-700 hover:bg-white/90">
                          <Download className="mr-2 h-4 w-4" />
                          Export Results
                        </Button>
                      </div>
                    </motion.div>
                  </section>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <Button variant="outline" className="rounded-2xl">
                      All Formats
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      Video
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      Image
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      Carousel
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      Active Only
                    </Button>
                    <div className="flex-1"></div>
                    <div className="relative w-full md:w-auto mt-3 md:mt-0">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search ads..."
                        className="w-full rounded-2xl pl-9 md:w-[200px]"
                      />
                    </div>
                  </div>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Trending Ads</h2>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {ads
                        .filter((ad) => ad.new)
                        .map((ad) => (
                          <motion.div key={ad.name} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                            <Card className="overflow-hidden rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
                              <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                                    {ad.icon}
                                  </div>
                                  <Badge className="rounded-xl bg-amber-500">Trending</Badge>
                                </div>
                              </CardHeader>
                              <CardContent className="pb-2">
                                <CardTitle className="text-lg">{ad.name}</CardTitle>
                                <CardDescription>{ad.description}</CardDescription>
                                <div className="mt-2">
                                  <div className="flex items-center justify-between text-sm">
                                    <span>Reach</span>
                                    <span>{ad.reach.toLocaleString()}</span>
                                  </div>
                                  <Progress value={(ad.reach / 15000) * 100} className="h-2 mt-1 rounded-xl" />
                                </div>
                              </CardContent>
                              <CardFooter>
                                <Button variant="secondary" className="w-full rounded-2xl">
                                  View Details
                                </Button>
                              </CardFooter>
                            </Card>
                          </motion.div>
                        ))}
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">All Ads</h2>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {ads.map((ad) => (
                        <motion.div key={ad.name} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                          <Card className="overflow-hidden rounded-3xl border hover:border-primary/50 transition-all duration-300">
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                                  {ad.icon}
                                </div>
                                <Badge variant={ad.status === "active" ? "default" : "outline"} className="rounded-xl">
                                  {ad.status === "active" ? "Active" : "Inactive"}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <CardTitle className="text-lg">{ad.name}</CardTitle>
                              <CardDescription>{ad.description}</CardDescription>
                            </CardContent>
                            <CardFooter className="flex gap-2">
                              <Button variant="secondary" className="flex-1 rounded-2xl">
                                View Details
                              </Button>
                              <Button variant="outline" size="icon" className="rounded-2xl">
                                <Bookmark className="h-4 w-4" />
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                </TabsContent>

                <TabsContent value="files" className="space-y-8 mt-0">
                  {/* Search Section */}
                  <AdvertiserSearch />

                  <div className="flex flex-wrap gap-3 mb-6">
                    <Button variant="outline" className="rounded-2xl">
                      <Users className="mr-2 h-4 w-4" />
                      All Advertisers
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <Eye className="mr-2 h-4 w-4" />
                      Tracked
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <Clock className="mr-2 h-4 w-4" />
                      Recent
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <Star className="mr-2 h-4 w-4" />
                      Favorites
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Top Performers
                    </Button>
                  </div>

                  <section className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">All Advertisers</h2>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-2xl">
                          <PanelLeft className="mr-2 h-4 w-4" />
                          Filter
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-2xl">
                          <ArrowUpDown className="mr-2 h-4 w-4" />
                          Sort
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-3xl border overflow-hidden">
                      <div className="bg-muted/50 p-3 hidden md:grid md:grid-cols-12 text-sm font-medium">
                        <div className="col-span-5">Advertiser</div>
                        <div className="col-span-2">Category</div>
                        <div className="col-span-2">Total Ads</div>
                        <div className="col-span-3">Last Updated</div>
                      </div>
                      <div className="divide-y">
                        {savedAdvertisers.map((advertiser) => (
                          <motion.div
                            key={advertiser.name}
                            whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                            className="p-3 md:grid md:grid-cols-12 items-center flex flex-col md:flex-row gap-3 md:gap-0"
                          >
                            <div className="col-span-5 flex items-center gap-3 w-full md:w-auto">
                              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted">
                                {advertiser.icon}
                              </div>
                              <div>
                                <p className="font-medium">{advertiser.name}</p>
                                {advertiser.tracked && (
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <Eye className="mr-1 h-3 w-3" />
                                    Tracking {advertiser.activeAds} active ads
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-span-2 text-sm md:text-base">{advertiser.category}</div>
                            <div className="col-span-2 text-sm md:text-base">{advertiser.totalAds} ads</div>
                            <div className="col-span-3 flex items-center justify-between w-full md:w-auto">
                              <span className="text-sm md:text-base">{advertiser.modified}</span>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </section>
                </TabsContent>

                <TabsContent value="projects" className="space-y-8 mt-0">
                  <section>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 p-8 text-white"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                          <h2 className="text-3xl font-bold">Campaign Tracker</h2>
                          <p className="max-w-[600px] text-white/80">
                            Monitor and organize your ad campaigns with detailed analytics.
                          </p>
                        </div>
                        <Button className="w-fit rounded-2xl bg-white text-indigo-700 hover:bg-white/90">
                          <Plus className="mr-2 h-4 w-4" />
                          New Campaign
                        </Button>
                      </div>
                    </motion.div>
                  </section>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <Button variant="outline" className="rounded-2xl">
                      <Layers className="mr-2 h-4 w-4" />
                      All Campaigns
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <Clock className="mr-2 h-4 w-4" />
                      Active
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Performing
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <Archive className="mr-2 h-4 w-4" />
                      Completed
                    </Button>
                    <div className="flex-1"></div>
                    <div className="relative w-full md:w-auto mt-3 md:mt-0">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search campaigns..."
                        className="w-full rounded-2xl pl-9 md:w-[200px]"
                      />
                    </div>
                  </div>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Active Campaigns</h2>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {campaigns.map((campaign) => (
                        <motion.div key={campaign.name} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                          <Card className="overflow-hidden rounded-3xl border hover:border-primary/50 transition-all duration-300">
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <CardTitle>{campaign.name}</CardTitle>
                                <Badge variant="outline" className="rounded-xl">
                                  Due {campaign.dueDate}
                                </Badge>
                              </div>
                              <CardDescription>{campaign.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span>Progress</span>
                                  <span>{campaign.progress}%</span>
                                </div>
                                <Progress value={campaign.progress} className="h-2 rounded-xl" />
                              </div>
                              <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Layers className="mr-1 h-4 w-4" />
                                  {campaign.adsCount} ads
                                </div>
                                <div className="flex items-center">
                                  <TrendingUp className="mr-1 h-4 w-4" />
                                  {campaign.totalReach.toLocaleString()} reach
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="flex gap-2">
                              <Button variant="secondary" className="flex-1 rounded-2xl">
                                View Campaign
                              </Button>
                              <Button variant="outline" size="icon" className="rounded-2xl">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                      <motion.div whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                        <Card className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed p-8 hover:border-primary/50 transition-all duration-300">
                          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                            <Plus className="h-6 w-6" />
                          </div>
                          <h3 className="text-lg font-medium">Create New Campaign</h3>
                          <p className="mb-4 text-center text-sm text-muted-foreground">
                            Start tracking a new ad campaign or use a template
                          </p>
                          <Button className="rounded-2xl">New Campaign</Button>
                        </Card>
                      </motion.div>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Campaign Templates</h2>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      <Card className="overflow-hidden rounded-3xl">
                        <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white">
                          <h3 className="text-lg font-medium">Brand Awareness</h3>
                          <p className="text-sm text-white/80">Reach and brand recognition campaign</p>
                        </div>
                        <CardFooter className="flex justify-between p-4">
                          <Badge variant="outline" className="rounded-xl">
                            Popular
                          </Badge>
                          <Button variant="ghost" size="sm" className="rounded-xl">
                            Use Template
                          </Button>
                        </CardFooter>
                      </Card>
                      <Card className="overflow-hidden rounded-3xl">
                        <div className="aspect-video bg-gradient-to-br from-amber-500 to-red-600 p-6 text-white">
                          <h3 className="text-lg font-medium">Lead Generation</h3>
                          <p className="text-sm text-white/80">Capture leads and grow email list</p>
                        </div>
                        <CardFooter className="flex justify-between p-4">
                          <Badge variant="outline" className="rounded-xl">
                            New
                          </Badge>
                          <Button variant="ghost" size="sm" className="rounded-xl">
                            Use Template
                          </Button>
                        </CardFooter>
                      </Card>
                      <Card className="overflow-hidden rounded-3xl">
                        <div className="aspect-video bg-gradient-to-br from-green-500 to-teal-600 p-6 text-white">
                          <h3 className="text-lg font-medium">E-Commerce Sales</h3>
                          <p className="text-sm text-white/80">Drive sales and conversions</p>
                        </div>
                        <CardFooter className="flex justify-between p-4">
                          <Badge variant="outline" className="rounded-xl">
                            Featured
                          </Badge>
                          <Button variant="ghost" size="sm" className="rounded-xl">
                            Use Template
                          </Button>
                        </CardFooter>
                      </Card>
                      <Card className="overflow-hidden rounded-3xl">
                        <div className="aspect-video bg-gradient-to-br from-pink-500 to-rose-600 p-6 text-white">
                          <h3 className="text-lg font-medium">Retargeting</h3>
                          <p className="text-sm text-white/80">Re-engage past visitors</p>
                        </div>
                        <CardFooter className="flex justify-between p-4">
                          <Badge variant="outline" className="rounded-xl">
                            Popular
                          </Badge>
                          <Button variant="ghost" size="sm" className="rounded-xl">
                            Use Template
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </section>
                </TabsContent>

                <TabsContent value="learn" className="space-y-8 mt-0">
                  <section>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-8 text-white"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                          <h2 className="text-3xl font-bold">Analytics & Reports</h2>
                          <p className="max-w-[600px] text-white/80">
                            Generate detailed reports and gain insights from your ad analysis.
                          </p>
                        </div>
                        <Button className="w-fit rounded-2xl bg-white text-emerald-700 hover:bg-white/90">
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate AI Report
                        </Button>
                      </div>
                    </motion.div>
                  </section>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <Button variant="outline" className="rounded-2xl">
                      <FileText className="mr-2 h-4 w-4" />
                      All Reports
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Performance
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <Users className="mr-2 h-4 w-4" />
                      Audience
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <Eye className="mr-2 h-4 w-4" />
                      Competitive
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Saved
                    </Button>
                    <div className="flex-1"></div>
                    <div className="relative w-full md:w-auto mt-3 md:mt-0">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search reports..."
                        className="w-full rounded-2xl pl-9 md:w-[200px]"
                      />
                    </div>
                  </div>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Available Reports</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {reports.slice(0, 3).map((report) => (
                        <motion.div key={report.title} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                          <Card className="overflow-hidden rounded-3xl">
                            <div className="aspect-video overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Button size="icon" variant="secondary" className="h-14 w-14 rounded-full">
                                  <FileText className="h-6 w-6" />
                                </Button>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                                <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl">
                                  {report.category}
                                </Badge>
                                <h3 className="mt-2 text-lg font-medium">{report.title}</h3>
                              </div>
                            </div>
                            <CardContent className="p-4">
                              <p className="text-sm text-muted-foreground">{report.description}</p>
                              <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  {report.duration}
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between border-t p-4">
                              <Badge variant="outline" className="rounded-xl">
                                {report.level}
                              </Badge>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Eye className="h-4 w-4" />
                                {report.views} views
                              </div>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">Recent Reports</h2>
                      <Button variant="ghost" className="rounded-2xl">
                        View All
                      </Button>
                    </div>
                    <div className="rounded-3xl border overflow-hidden">
                      <div className="divide-y">
                        {reports.slice(3, 5).map((report) => (
                          <motion.div
                            key={report.title}
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            className="p-4 flex flex-col md:flex-row gap-3"
                          >
                            <div className="flex-shrink-0">
                              <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <FileText className="h-8 w-8 text-white" />
                                </div>
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">{report.title}</h3>
                              <p className="text-sm text-muted-foreground">{report.description}</p>
                              <div className="mt-2 flex flex-wrap items-center gap-3">
                                <Badge variant="outline" className="rounded-xl">
                                  {report.level}
                                </Badge>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  {report.duration}
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Eye className="h-3 w-3" />
                                  {report.views} views
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Button variant="ghost" size="sm" className="rounded-xl">
                                View Report
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Report Types</h2>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                      <Card className="overflow-hidden rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Badge className="rounded-xl bg-blue-500">Popular</Badge>
                            <TrendingUp className="h-5 w-5 text-blue-500" />
                          </div>
                          <CardTitle className="mt-2">Performance Report</CardTitle>
                          <CardDescription>Analyze ad performance metrics and KPIs</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Real-time data</span>
                              <span>Free</span>
                            </div>
                            <Progress value={100} className="h-2 rounded-xl" />
                            <p className="text-xs text-muted-foreground">Available now</p>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="secondary" className="w-full rounded-2xl">
                            Generate Report
                          </Button>
                        </CardFooter>
                      </Card>

                      <Card className="overflow-hidden rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Badge className="rounded-xl bg-amber-500">Pro</Badge>
                            <Users className="h-5 w-5 text-amber-500" />
                          </div>
                          <CardTitle className="mt-2">Audience Insights</CardTitle>
                          <CardDescription>Deep dive into audience demographics and behavior</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Weekly updates</span>
                              <span>Pro</span>
                            </div>
                            <Progress value={100} className="h-2 rounded-xl" />
                            <p className="text-xs text-muted-foreground">Available now</p>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="secondary" className="w-full rounded-2xl">
                            Generate Report
                          </Button>
                        </CardFooter>
                      </Card>

                      <Card className="overflow-hidden rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Badge className="rounded-xl bg-purple-500">AI</Badge>
                            <Sparkles className="h-5 w-5 text-purple-500" />
                          </div>
                          <CardTitle className="mt-2">AI Strategy Report</CardTitle>
                          <CardDescription>AI-powered recommendations and strategy insights</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>AI-generated</span>
                              <span>Pro</span>
                            </div>
                            <Progress value={100} className="h-2 rounded-xl" />
                            <p className="text-xs text-muted-foreground">Available now</p>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="secondary" className="w-full rounded-2xl">
                            Generate Report
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </section>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
  )
}
