'use client'

import { Bar, BarChart, CartesianGrid } from 'recharts'

import { AlertTriangleIcon } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { type ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/chart'

import { cn } from '@/lib/utils'

type Props = {
  title: string
  subTitle: string
  chartData: {
    views: number
    fill: string
  }[]
  productReach: number
  predictedValue: number
  className?: string
}

const userViewsChartConfig = {
  views: {
    label: 'Impressionen verfolgt'
  }
} satisfies ChartConfig

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-primary text-primary-foreground mx-2 space-y-1 rounded-md px-3 py-1.5 shadow-lg'>
        <div className='text-xs'>{payload[0].value.toLocaleString()}</div>
        <div className='text-xs opacity-70'>Impressionen verfolgt</div>
      </div>
    )
  }

  return null
}

const AnatomyDetectedCard = ({ title, subTitle, chartData, productReach, predictedValue, className }: Props) => {
  return (
    <Card className={cn('gap-8', className)}>
      <CardHeader className='flex justify-between'>
        <div className='flex flex-col gap-1'>
          <span className='text-2xl font-semibold'>{title}</span>
          <span className='text-muted-foreground text-sm'>{subTitle}</span>
        </div>
        <Avatar className='size-12 rounded-md'>
          <AvatarFallback className='bg-primary/10 text-primary shrink-0 rounded-md'>
            <AlertTriangleIcon />
          </AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className='flex flex-1 flex-col gap-6'>
        <ChartContainer config={userViewsChartConfig} className='min-h-36 w-full flex-1'>
          <BarChart
            accessibilityLayer
            data={chartData}
            barSize={22.5}
            margin={{
              top: 7,
              left: -4,
              right: -4
            }}
          >
            <CartesianGrid strokeDasharray='4' stroke='var(--border)' vertical={false} />
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <Bar dataKey='views' radius={2} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='justify-between gap-2'>
        <div className='flex flex-col gap-1'>
          <span className='text-4xl font-semibold'>{productReach}%</span>
          <span className='text-muted-foreground text-sm'>Prognose {predictedValue}%</span>
        </div>
        <Button variant='outline' className='h-7 rounded-full px-2 py-1 text-xs'>
          Analyse ansehen
        </Button>
      </CardFooter>
    </Card>
  )
}

export default AnatomyDetectedCard
