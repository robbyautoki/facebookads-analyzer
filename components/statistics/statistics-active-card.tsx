'use client'

import { Area, AreaChart } from 'recharts'
import { TrendingUp } from 'lucide-react'

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

// Simulated trend data for active ads
const generateActiveData = (active: number) => {
  const points = 12
  const data = []
  let value = active * 0.7

  for (let i = 0; i < points; i++) {
    value = value + (Math.random() - 0.4) * (active * 0.1)
    value = Math.max(0, Math.min(active * 1.2, value))
    data.push({
      point: i,
      active: Math.round(value)
    })
  }

  // End near actual value
  data[data.length - 1].active = active

  return data
}

const activeChartConfig = {
  active: {
    label: 'Aktiv',
    color: 'var(--chart-4)'
  }
} satisfies ChartConfig

interface StatisticsActiveCardProps {
  activeAds: number
}

const StatisticsActiveCard = ({ activeAds }: StatisticsActiveCardProps) => {
  const chartData = generateActiveData(activeAds)

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-colors">
      <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
        <TrendingUp className="h-4 w-4" />
        Aktive Anzeigen
      </div>

      <ChartContainer config={activeChartConfig} className="h-16 w-full mt-2">
        <AreaChart
          data={chartData}
          margin={{ left: 0, right: 0 }}
        >
          <defs>
            <linearGradient id="fillActive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="var(--chart-4)" stopOpacity={0.4} />
              <stop offset="90%" stopColor="var(--chart-4)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Area
            dataKey="active"
            type="natural"
            fill="url(#fillActive)"
            stroke="var(--chart-4)"
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>

      <div className="text-2xl font-bold text-white mt-2">{activeAds}</div>
    </div>
  )
}

export default StatisticsActiveCard
