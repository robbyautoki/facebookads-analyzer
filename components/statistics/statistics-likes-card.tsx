'use client'

import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'
import { Heart } from 'lucide-react'

import { type ChartConfig, ChartContainer } from '@/components/ui/chart'

const likesChartConfig = {
  likes: {
    label: 'Likes',
    color: 'var(--chart-5)'
  }
} satisfies ChartConfig

interface StatisticsLikesCardProps {
  likes?: number
}

const formatLikes = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
  return value.toLocaleString()
}

const StatisticsLikesCard = ({ likes }: StatisticsLikesCardProps) => {
  const displayValue = likes ? formatLikes(likes) : '-'

  // Calculate percentage for radial chart (cap at 100%)
  const percentage = likes ? Math.min((likes / 100000) * 100, 100) : 0
  const endAngle = 90 + (percentage / 100) * 270

  const chartData = [{ likes: percentage, fill: 'var(--color-likes)' }]

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-colors">
      <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
        <Heart className="h-4 w-4" />
        Likes
      </div>

      <ChartContainer config={likesChartConfig} className="h-16 w-full mt-2">
        <RadialBarChart
          data={chartData}
          startAngle={90}
          endAngle={endAngle}
          innerRadius={35}
          outerRadius={20}
        >
          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="first:fill-white/10 last:fill-transparent"
            polarRadius={[32, 25]}
          />
          <RadialBar dataKey="likes" background={{ fill: 'rgba(255,255,255,0.05)' }} />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-white text-xs font-semibold"
                      >
                        {displayValue}
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>

      <div className="text-2xl font-bold text-white mt-2">{displayValue}</div>
    </div>
  )
}

export default StatisticsLikesCard
