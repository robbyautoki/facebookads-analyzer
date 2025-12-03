"use client"

import { motion } from "framer-motion"
import { Play, Image as ImageIcon, Calendar, ExternalLink } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { SimpleAd } from "@/types/ads"

interface AdCardProps {
  ad: SimpleAd
  onClick?: () => void
}

export function AdCard({ ad, onClick }: AdCardProps) {
  const hasVideo = Boolean(ad.videoUrl || ad.videoPreviewUrl)
  const thumbnailUrl = ad.videoPreviewUrl || ad.imageUrl

  // Platform badges
  const platformColors: Record<string, string> = {
    FACEBOOK: "bg-blue-500",
    INSTAGRAM: "bg-pink-500",
    MESSENGER: "bg-purple-500",
    AUDIENCE_NETWORK: "bg-orange-500",
    THREADS: "bg-slate-500",
  }

  return (
    <motion.div whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
      <Card
        className="overflow-hidden rounded-3xl border hover:border-primary/50 transition-all duration-300 cursor-pointer h-full flex flex-col"
        onClick={onClick}
      >
        {/* Thumbnail */}
        <div className="relative aspect-[4/3] bg-muted overflow-hidden">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={ad.title}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = "none"
              }}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-muted-foreground">
              <ImageIcon className="h-12 w-12" />
            </div>
          )}

          {/* Video indicator */}
          {hasVideo && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="h-12 w-12 rounded-full bg-white/90 flex items-center justify-center">
                <Play className="h-6 w-6 text-slate-900 ml-1" />
              </div>
            </div>
          )}

          {/* Status badge */}
          <div className="absolute top-3 right-3">
            <Badge
              variant={ad.isActive ? "default" : "outline"}
              className={`rounded-xl ${ad.isActive ? "bg-green-500" : "bg-slate-500"}`}
            >
              {ad.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>

          {/* Format badge */}
          {ad.displayFormat && (
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="rounded-xl">
                {ad.displayFormat}
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <CardContent className="flex-1 p-4 space-y-3">
          <h3 className="font-semibold line-clamp-1">{ad.title}</h3>

          {ad.body && (
            <p className="text-sm text-muted-foreground line-clamp-3">{ad.body}</p>
          )}

          {/* Platforms */}
          {ad.platforms.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {ad.platforms.slice(0, 3).map((platform) => (
                <span
                  key={platform}
                  className={`text-xs px-2 py-0.5 rounded-full text-white ${
                    platformColors[platform] || "bg-slate-500"
                  }`}
                >
                  {platform.replace("_", " ")}
                </span>
              ))}
              {ad.platforms.length > 3 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
                  +{ad.platforms.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Dates */}
          {ad.startDate && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>
                {ad.startDate}
                {ad.endDate && ` - ${ad.endDate}`}
              </span>
            </div>
          )}

          {/* Reach */}
          {ad.reach && (
            <div className="text-sm">
              <span className="font-medium">{ad.reach.toLocaleString()}</span>
              <span className="text-muted-foreground"> reach</span>
            </div>
          )}
        </CardContent>

        {/* Footer */}
        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button variant="secondary" className="flex-1 rounded-2xl" onClick={onClick}>
            View Details
          </Button>
          {ad.linkUrl && (
            <Button
              variant="outline"
              size="icon"
              className="rounded-2xl"
              onClick={(e) => {
                e.stopPropagation()
                window.open(ad.linkUrl, "_blank")
              }}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
