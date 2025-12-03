import {
  TrendingUpIcon,
  BarChart2Icon,
  PieChartIcon,
  LineChartIcon,
  ActivityIcon,
  BellIcon,
  LayoutDashboardIcon,
  FileBarChartIcon,
  UsersIcon,
  MapPinIcon,
  PhoneIcon
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'

import Header from '@/components/shadcn-studio/blocks/hero-section-31/header'
import HeroSection from '@/components/shadcn-studio/blocks/hero-section-31/hero-section-31'
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-navigation-01'

const navigationData: Navigation[] = [
  {
    title: 'Insights',
    contentClassName: '!w-141 grid-cols-2',
    splitItems: true,
    items: [
      {
        type: 'section',
        title: 'Analytics',
        items: [
          {
            title: 'Sales Analytics',
            href: '#',
            description: 'Track revenue and sales performance',
            icon: <TrendingUpIcon className='size-4' />
          },
          {
            title: 'Customer Insights',
            href: '#',
            description: 'Understand customer behavior patterns',
            icon: <UsersIcon className='size-4' />
          },
          {
            title: 'Trend Analysis',
            href: '#',
            description: 'Identify market trends and opportunities',
            icon: <LineChartIcon className='size-4' />
          },
          {
            title: 'Performance Metrics',
            href: '#',
            description: 'Monitor KPIs and business goals',
            icon: <BarChart2Icon className='size-4' />,
            badge: (
              <Badge className='border-none bg-green-600/10 text-green-600 dark:bg-green-400/10 dark:text-green-400'>
                Pro
              </Badge>
            )
          }
        ]
      },
      {
        type: 'section',
        title: 'Reporting',
        items: [
          {
            title: 'Real-time Reports',
            href: '#',
            description: 'Get instant updates on key metrics in real-time',
            icon: <ActivityIcon className='size-4' />
          },
          {
            title: 'Custom Dashboards',
            href: '#',
            description: 'Build personalized analytics views for your team',
            icon: <LayoutDashboardIcon className='size-4' />
          },
          {
            title: 'Data Visualization',
            href: '#',
            description: 'Transform data into visual stories with ease',
            icon: <PieChartIcon className='size-4' />
          },
          {
            title: 'Alert System',
            href: '#',
            description: 'Set up automated performance alerts',
            icon: <BellIcon className='size-4' />
          }
        ]
      }
    ]
  },
  {
    title: 'Dashboards',
    href: '#'
  },
  {
    title: 'About',
    contentClassName: '!w-38',
    items: [
      { title: 'Company', href: '#' },
      { title: 'Careers', href: '#' }
    ]
  },
  {
    title: 'Contacts',
    contentClassName: '!w-70',
    items: [
      {
        title: 'Get in Touch',
        href: '#',
        description: 'Reach out to our team',
        icon: <PhoneIcon className='size-4' />
      },
      {
        title: 'Office Locations',
        href: '#',
        description: 'Find our offices worldwide',
        icon: <MapPinIcon className='size-4' />
      },
      {
        title: 'Support Center',
        href: '#',
        description: 'Get help from our support team',
        icon: <FileBarChartIcon className='size-4' />
      }
    ]
  }
]

const HeroSectionPage = () => {
  return (
    <div className='flex flex-col'>
      {/* Header Section */}
      <Header navigationData={navigationData} />

      {/* Main Content */}
      <main className='flex flex-col'>
        <HeroSection />
      </main>
    </div>
  )
}

export default HeroSectionPage
