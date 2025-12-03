'use client'

import { Bar, BarChart } from 'recharts'
import { BarChart3 } from 'lucide-react'

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

// Simulated weekly ads data
const generateAdsData = (total: number) => {
  const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
  const baseValue = total / 7
  return days.map(day => ({
    day,
    ads: Math.round(baseValue * (0.5 + Math.random()))
  }))
}

const adsChartConfig = {
  ads: {
    label: 'Anzeigen',
    color: 'var(--chart-1)'
  }
} satisfies ChartConfig

interface StatisticsAdsCardProps {
  totalAds: number
}

const StatisticsAdsCard = ({ totalAds }: StatisticsAdsCardProps) => {
  const chartData = generateAdsData(totalAds)

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-colors">
      <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
        <BarChart3 className="h-4 w-4" />
        Anzeigen gesamt
      </div>

      <ChartContainer config={adsChartConfig} className="h-16 w-full mt-2">
        <BarChart
          accessibilityLayer
          data={chartData}
          barSize={8}
          margin={{ left: 0, right: 0 }}
        >
          <Bar
            dataKey="ads"
            fill="var(--color-ads)"
            background={{ fill: 'rgba(255,255,255,0.05)', radius: 8 }}
            radius={8}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        </BarChart>
      </ChartContainer>

      <div className="text-2xl font-bold text-white mt-2">{totalAds}</div>
    </div>
  )
}

export default StatisticsAdsCard
