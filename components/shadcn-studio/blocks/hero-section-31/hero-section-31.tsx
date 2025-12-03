'use client'

import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

import { MotionPreset } from '@/components/ui/motion-preset'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import UserOrderCard from '@/components/shadcn-studio/blocks/widget-user-order'
import AnatomyDetectedCard from '@/components/shadcn-studio/blocks/chart-anatomy-detected'

import { Marquee } from '@/components/ui/marquee'
import { GlowEffect } from '@/components/ui/glow-effect'
import { BackgroundBeams } from '@/components/ui/background-beams'

// Chart data
const userViewsChartData = [
  { views: 800, fill: 'color-mix(in oklab, var(--primary) 10%, var(--card))' },
  { views: 1800, fill: 'color-mix(in oklab, var(--primary) 10%, var(--card))' },
  { views: 1400, fill: 'color-mix(in oklab, var(--primary) 10%, var(--card))' },
  { views: 2780, fill: 'var(--primary)' },
  { views: 900, fill: 'color-mix(in oklab, var(--primary) 10%, var(--card))' },
  { views: 600, fill: 'color-mix(in oklab, var(--primary) 10%, var(--card))' },
  { views: 1900, fill: 'color-mix(in oklab, var(--primary) 10%, var(--card))' },
  { views: 1200, fill: 'color-mix(in oklab, var(--primary) 10%, var(--card))' }
]

const HeroSection = () => {
  return (
    <section className='relative flex-1 bg-slate-900'>
      <div className='relative flex flex-col py-12 sm:py-16 lg:py-24'>
        <div className='mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 max-xl:justify-center sm:gap-16 sm:px-6 lg:gap-24 lg:px-8 xl:grid-cols-2'>
          <div className='flex flex-col justify-between gap-8'>
            <div className='flex flex-col gap-8'>
              <div className='flex flex-col justify-between gap-4'>
                <MotionPreset fade slide={{ direction: 'up', offset: 50 }} transition={{ duration: 0.5 }}>
                  <Badge variant='outline' className='text-sm font-normal border-blue-500/50 text-blue-400 bg-blue-500/10'>
                    Live Ad Tracking
                  </Badge>
                </MotionPreset>
                <MotionPreset
                  fade
                  slide={{ direction: 'up', offset: 50 }}
                  blur
                  transition={{ duration: 0.5 }}
                  delay={0.3}
                >
                  <h1 className='text-2xl font-semibold sm:text-3xl lg:text-5xl text-white'>
                    Discover Winning Facebook Ads
                  </h1>
                </MotionPreset>
                <MotionPreset
                  fade
                  slide={{ direction: 'up', offset: 50 }}
                  blur
                  transition={{ duration: 0.5 }}
                  delay={0.5}
                >
                  <p className='text-slate-300 text-xl'>
                    Analyze competitor ads, track advertisers, and uncover the strategies behind successful Facebook campaigns.
                  </p>
                </MotionPreset>
                <MotionPreset
                  component='div'
                  fade
                  slide={{ direction: 'up', offset: 50 }}
                  blur
                  transition={{ duration: 0.5 }}
                  delay={0.7}
                  className='flex flex-wrap items-center gap-4'
                >
                  <Button
                    asChild
                    size='lg'
                    className='group relative w-fit overflow-hidden rounded-lg text-base bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                  >
                    <Link href='/sign-up'>
                      Start Free Trial
                      <ArrowRightIcon className='transition-transform duration-300 group-hover:translate-x-1' />
                    </Link>
                  </Button>
                  <Button
                    className='bg-white/10 text-white hover:bg-white/20 border-white/20 rounded-lg text-base'
                    variant='outline'
                    size='lg'
                    asChild
                  >
                    <Link href='/sign-in'>Sign In</Link>
                  </Button>
                </MotionPreset>
              </div>
              <MotionPreset
                fade
                slide={{ direction: 'up', offset: 50 }}
                transition={{ duration: 0.5 }}
                delay={0.9}
                className='space-y-4 ps-2'
              >
                <div className='flex items-center gap-4'>
                  <svg width='18' height='16' viewBox='0 0 18 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M17.7816 1.48437C14.2784 5.33255 10.9893 9.87536 8.41171 14.4347C7.87393 15.3861 6.85127 15.9588 5.75957 15.9125C5.75002 15.9121 5.7401 15.9118 5.73018 15.9114C4.66932 15.8692 3.71424 15.2484 3.24883 14.294C2.42893 12.615 1.25237 10.8327 0.202532 9.33392C-0.182788 8.78366 0.000875781 8.02291 0.590808 7.70185C0.602916 7.69523 0.615052 7.68901 0.62716 7.68238C2.07371 6.90069 3.881 7.3808 4.75194 8.77519C5.06786 9.28102 5.36834 9.79638 5.65227 10.3213C8.06126 6.97416 10.7751 3.8713 13.7399 1.07259C14.7309 0.137353 16.1051 -0.198769 17.3709 0.113478C17.9822 0.264088 18.2055 1.01895 17.7816 1.48437Z'
                      fill='#22C55E'
                    />
                  </svg>
                  <p className='text-slate-200'>Real-time ad monitoring</p>
                </div>
                <div className='flex items-center gap-4'>
                  <svg width='18' height='16' viewBox='0 0 18 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M17.7816 1.48437C14.2784 5.33255 10.9893 9.87536 8.41171 14.4347C7.87393 15.3861 6.85127 15.9588 5.75957 15.9125C5.75002 15.9121 5.7401 15.9118 5.73018 15.9114C4.66932 15.8692 3.71424 15.2484 3.24883 14.294C2.42893 12.615 1.25237 10.8327 0.202532 9.33392C-0.182788 8.78366 0.000875781 8.02291 0.590808 7.70185C0.602916 7.69523 0.615052 7.68901 0.62716 7.68238C2.07371 6.90069 3.881 7.3808 4.75194 8.77519C5.06786 9.28102 5.36834 9.79638 5.65227 10.3213C8.06126 6.97416 10.7751 3.8713 13.7399 1.07259C14.7309 0.137353 16.1051 -0.198769 17.3709 0.113478C17.9822 0.264088 18.2055 1.01895 17.7816 1.48437Z'
                      fill='#22C55E'
                    />
                  </svg>
                  <p className='text-slate-200'>Competitor ad analysis</p>
                </div>
                <div className='flex items-center gap-4'>
                  <svg width='18' height='16' viewBox='0 0 18 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M17.7816 1.48437C14.2784 5.33255 10.9893 9.87536 8.41171 14.4347C7.87393 15.3861 6.85127 15.9588 5.75957 15.9125C5.75002 15.9121 5.7401 15.9118 5.73018 15.9114C4.66932 15.8692 3.71424 15.2484 3.24883 14.294C2.42893 12.615 1.25237 10.8327 0.202532 9.33392C-0.182788 8.78366 0.000875781 8.02291 0.590808 7.70185C0.602916 7.69523 0.615052 7.68901 0.62716 7.68238C2.07371 6.90069 3.881 7.3808 4.75194 8.77519C5.06786 9.28102 5.36834 9.79638 5.65227 10.3213C8.06126 6.97416 10.7751 3.8713 13.7399 1.07259C14.7309 0.137353 16.1051 -0.198769 17.3709 0.113478C17.9822 0.264088 18.2055 1.01895 17.7816 1.48437Z'
                      fill='#22C55E'
                    />
                  </svg>
                  <p className='text-slate-200'>Trend & performance insights</p>
                </div>
              </MotionPreset>
            </div>

            <div className='space-y-3.5 px-4 py-2'>
              <MotionPreset
                component='p'
                fade
                slide={{ direction: 'up', offset: 50 }}
                delay={1.1}
                transition={{ duration: 0.5 }}
                className='text-muted-foreground'
              >
                <span className='text-slate-400'>Trusted by leading marketers worldwide</span>
              </MotionPreset>
              <MotionPreset
                fade
                slide={{ direction: 'up', offset: 50 }}
                delay={1.2}
                transition={{ duration: 0.5 }}
                className='relative'
              >
                <div className='from-background pointer-events-none absolute inset-y-0 left-0 z-1 w-15 bg-gradient-to-r via-85% to-transparent' />
                <div className='from-background pointer-events-none absolute inset-y-0 right-0 z-1 w-15 bg-gradient-to-l via-85% to-transparent' />
                <Marquee pauseOnHover duration={20} reverse gap={4.3} className='*:items-center'>
                  <img
                    src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/um-logo.png'
                    alt='University of Mississippi'
                    className='h-7.5 w-auto shrink-0 object-contain opacity-60 invert dark:invert-0'
                  />
                  <img
                    src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/star-helth-logo.png'
                    alt='Star Health'
                    className='h-9 w-auto shrink-0 object-contain opacity-60 invert dark:invert-0'
                  />
                  <img
                    src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/dhl-logo.png'
                    alt='DHL'
                    className='h-4 w-auto shrink-0 object-contain opacity-60 invert dark:invert-0'
                  />
                  <img
                    src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/sense-arena-logo.png'
                    alt='Sense Arena'
                    className='h-11 w-auto shrink-0 object-contain opacity-60 invert dark:invert-0'
                  />
                  <img
                    src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/shemaroo-logo.png'
                    alt='Shemaroo'
                    className='h-10 w-auto shrink-0 object-contain opacity-60 invert dark:invert-0'
                  />
                  <img
                    src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/mercedes-benz-logo.png'
                    alt='Mercedes Benz'
                    className='h-7.5 w-auto shrink-0 object-contain opacity-60 invert dark:invert-0'
                  />
                </Marquee>
              </MotionPreset>
            </div>
          </div>

          <div className='flex items-center justify-center'>
            <div className='relative max-xl:max-w-135 md:mt-8 md:ml-3 md:grow'>
              <div className='w-fit -rotate-10'>
                <GlowEffect
                  colors={['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981']}
                  mode='colorShift'
                  blur='medium'
                  className='opacity-60'
                />
                <AnatomyDetectedCard
                  title='Ad Performance'
                  subTitle='Competitor ad engagement exceeding industry benchmarks.'
                  chartData={userViewsChartData}
                  productReach={96.5}
                  predictedValue={78}
                  className='relative w-full max-w-85'
                />
              </div>
              <div className='ms-auto -mt-50 rotate-6 md:w-fit'>
                <GlowEffect
                  colors={['#8B5CF6', '#EC4899', '#3B82F6', '#06B6D4']}
                  mode='colorShift'
                  blur='medium'
                  className='opacity-60'
                />
                <UserOrderCard className='relative ms-auto w-full max-w-85' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <BackgroundBeams className='right-0 -z-1 h-full w-1/2 max-xl:hidden' />
    </section>
  )
}

export default HeroSection
