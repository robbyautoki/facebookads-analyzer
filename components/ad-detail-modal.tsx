"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Calendar,
  ExternalLink,
  Play,
  Image as ImageIcon,
  Copy,
  Check,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { SimpleAd } from "@/types/ads"

interface AdDetailModalProps {
  ad: SimpleAd | null
  onClose: () => void
}

export function AdDetailModal({ ad, onClose }: AdDetailModalProps) {
  const [copied, setCopied] = useState(false)

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (ad) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [ad])

  const handleCopyText = async () => {
    if (!ad?.body) return
    try {
      await navigator.clipboard.writeText(ad.body)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const textarea = document.createElement("textarea")
      textarea.value = ad.body
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const platformColors: Record<string, string> = {
    FACEBOOK: "bg-blue-500",
    INSTAGRAM: "bg-pink-500",
    MESSENGER: "bg-purple-500",
    AUDIENCE_NETWORK: "bg-orange-500",
    THREADS: "bg-slate-500",
  }

  const hasVideo = Boolean(ad?.videoUrl)
  const mediaUrl = ad?.videoPreviewUrl || ad?.imageUrl

  return (
    <AnimatePresence>
      {ad && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 z-50 bg-background rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">Ad Details</h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-xl">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <ScrollArea className="flex-1">
              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Media Section */}
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] bg-muted rounded-2xl overflow-hidden">
                    {mediaUrl ? (
                      <>
                        {hasVideo && ad.videoUrl ? (
                          <video
                            src={ad.videoUrl}
                            poster={ad.videoPreviewUrl}
                            controls
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <img
                            src={mediaUrl}
                            alt={ad.title}
                            className="h-full w-full object-contain"
                          />
                        )}
                      </>
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                        <ImageIcon className="h-16 w-16" />
                      </div>
                    )}

                    {hasVideo && !ad.videoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center">
                          <Play className="h-8 w-8 text-slate-900 ml-1" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-muted">
                      <div className="text-sm text-muted-foreground">Status</div>
                      <div className="font-semibold flex items-center gap-2 mt-1">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            ad.isActive ? "bg-green-500" : "bg-slate-400"
                          }`}
                        />
                        {ad.isActive ? "Active" : "Inactive"}
                      </div>
                    </div>
                    {ad.reach && (
                      <div className="p-4 rounded-2xl bg-muted">
                        <div className="text-sm text-muted-foreground">Est. Reach</div>
                        <div className="font-semibold mt-1">{ad.reach.toLocaleString()}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Details Section */}
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <h3 className="text-2xl font-bold">{ad.title}</h3>
                    {ad.ctaText && (
                      <Badge variant="secondary" className="mt-2 rounded-xl">
                        CTA: {ad.ctaText}
                      </Badge>
                    )}
                  </div>

                  {/* Platforms */}
                  {ad.platforms.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Platforms</div>
                      <div className="flex flex-wrap gap-2">
                        {ad.platforms.map((platform) => (
                          <Badge
                            key={platform}
                            className={`rounded-xl ${platformColors[platform] || "bg-slate-500"}`}
                          >
                            {platform.replace("_", " ")}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dates */}
                  {(ad.startDate || ad.endDate) && (
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Duration</div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {ad.startDate || "N/A"} - {ad.endDate || "Ongoing"}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Ad Body */}
                  {ad.body && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">Ad Copy</div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCopyText}
                          className="rounded-xl h-8"
                        >
                          {copied ? (
                            <>
                              <Check className="h-3 w-3 mr-1" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3 mr-1" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                      <div className="p-4 rounded-2xl bg-muted whitespace-pre-wrap text-sm max-h-64 overflow-y-auto">
                        {ad.body}
                      </div>
                    </div>
                  )}

                  {/* Link */}
                  {ad.linkUrl && (
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Destination URL</div>
                      <a
                        href={ad.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:underline break-all"
                      >
                        {ad.linkUrl}
                        <ExternalLink className="h-4 w-4 flex-shrink-0" />
                      </a>
                    </div>
                  )}

                  {/* Display Format */}
                  {ad.displayFormat && (
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Format</div>
                      <Badge variant="outline" className="rounded-xl">
                        {ad.displayFormat}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-4 border-t">
              <Button variant="outline" onClick={onClose} className="rounded-2xl">
                Close
              </Button>
              {ad.linkUrl && (
                <Button
                  className="rounded-2xl"
                  onClick={() => window.open(ad.linkUrl, "_blank")}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Link
                </Button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
