'use client'

import { Line, LineChart } from 'recharts'
import { Eye } from 'lucide-react'

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

// Simulated reach trend data
const generateReachData = (totalReach: number) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun']
  const baseValue = totalReach / 6

  return months.map((month, i) => ({
    month,
    reach: Math.round(baseValue * (0.3 + (i * 0.15) + Math.random() * 0.3))
  }))
}

const reachChartConfig = {
  reach: {
    label: 'Reichweite',
    color: 'var(--chart-2)'
  }
} satisfies ChartConfig

interface StatisticsReachCardProps {
  reach?: number
}

const formatReach = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
  return value.toLocaleString()
}

const StatisticsReachCard = ({ reach }: StatisticsReachCardProps) => {
  const chartData = generateReachData(reach || 0)
  const displayValue = reach ? formatReach(reach) : '-'

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-colors">
      <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
        <Eye className="h-4 w-4" />
        Reichweite
      </div>

      <ChartContainer config={reachChartConfig} className="h-16 w-full mt-2">
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{ left: 6, right: 6 }}
        >
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line
            dataKey="reach"
            type="monotone"
            dot={false}
            stroke="var(--color-reach)"
            strokeWidth={2}
          />
        </LineChart>
      </ChartContainer>

      <div className="text-2xl font-bold text-white mt-2">{displayValue}</div>
    </div>
  )
}

export default StatisticsReachCard
