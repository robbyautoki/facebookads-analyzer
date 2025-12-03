"use client"

import { motion } from "framer-motion"
import { Users, Globe, Target, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { SimpleAudience } from "@/types/ads"

interface AudienceInsightsProps {
  audience: SimpleAudience
  totalAds: number
}

export function AudienceInsights({ audience, totalAds }: AudienceInsightsProps) {
  // Calculate gender distribution percentages
  const genderData = audience.ageGenderBreakdown?.reduce(
    (acc, item) => {
      acc.female += item.female || 0
      acc.male += item.male || 0
      acc.unknown += item.unknown || 0
      return acc
    },
    { female: 0, male: 0, unknown: 0 }
  ) || { female: 0, male: 0, unknown: 0 }

  const totalGender = genderData.female + genderData.male + genderData.unknown
  const femalePercent = totalGender > 0 ? Math.round((genderData.female / totalGender) * 100) : 0
  const malePercent = totalGender > 0 ? Math.round((genderData.male / totalGender) * 100) : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Overview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="rounded-3xl h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Ads</span>
              <span className="text-2xl font-bold">{totalAds}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Est. Total Reach</span>
              <span className="text-2xl font-bold">
                {audience.totalReach ? audience.totalReach.toLocaleString() : "N/A"}
              </span>
            </div>
            {audience.gender && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Target Gender</span>
                <span className="font-medium capitalize">{audience.gender.toLowerCase()}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Age Distribution Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="rounded-3xl h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Age Targeting
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {audience.ageMin && audience.ageMax ? (
              <div className="text-center py-4">
                <div className="text-4xl font-bold text-primary">
                  {audience.ageMin} - {audience.ageMax}
                </div>
                <p className="text-muted-foreground mt-1">years old</p>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No age data available</p>
            )}

            {/* Age breakdown bars */}
            {audience.ageGenderBreakdown && audience.ageGenderBreakdown.length > 0 && (
              <div className="space-y-3">
                {audience.ageGenderBreakdown.map((item) => {
                  const total = (item.female || 0) + (item.male || 0) + (item.unknown || 0)
                  const maxTotal = Math.max(
                    ...audience.ageGenderBreakdown!.map(
                      (i) => (i.female || 0) + (i.male || 0) + (i.unknown || 0)
                    )
                  )
                  const percent = maxTotal > 0 ? (total / maxTotal) * 100 : 0

                  return (
                    <div key={item.ageRange} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.ageRange}</span>
                        <span className="text-muted-foreground">{total}</span>
                      </div>
                      <Progress value={percent} className="h-2 rounded-xl" />
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Gender Distribution Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="rounded-3xl h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Gender Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {totalGender > 0 ? (
              <>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Female</span>
                      <span>{femalePercent}%</span>
                    </div>
                    <Progress value={femalePercent} className="h-3 rounded-xl bg-pink-100">
                      <div
                        className="h-full bg-pink-500 rounded-xl transition-all"
                        style={{ width: `${femalePercent}%` }}
                      />
                    </Progress>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Male</span>
                      <span>{malePercent}%</span>
                    </div>
                    <Progress value={malePercent} className="h-3 rounded-xl bg-blue-100">
                      <div
                        className="h-full bg-blue-500 rounded-xl transition-all"
                        style={{ width: `${malePercent}%` }}
                      />
                    </Progress>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-500">
                      {genderData.female.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground">Female reach</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-500">
                      {genderData.male.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground">Male reach</p>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground text-center py-4">No gender data available</p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Countries Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="md:col-span-2 lg:col-span-3"
      >
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Geographic Targeting
            </CardTitle>
          </CardHeader>
          <CardContent>
            {audience.countries.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {audience.countries.map((country) => (
                  <div
                    key={country.name}
                    className="px-4 py-2 rounded-2xl bg-muted flex items-center gap-2"
                  >
                    <span className="font-medium">{country.name}</span>
                    {country.reach && (
                      <span className="text-sm text-muted-foreground">
                        ({country.reach} ads)
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No geographic targeting data available
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
