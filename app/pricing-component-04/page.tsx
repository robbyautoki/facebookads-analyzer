import { FlowerIcon, SproutIcon } from 'lucide-react'

import Pricing from '@/components/shadcn-studio/blocks/pricing-component-04/pricing-component-04'

const plans = [
  {
    icon: SproutIcon,
    title: 'Essential Plan',
    description: 'Ideal for startups and small teams',
    price: 5,
    period: '/month',
    buttonText: 'Basic Access',
    features: ['1 user account', 'Up to 30 monthly transactions', '10 crypto pairs', 'Basic market analysis']
  },
  {
    icon: FlowerIcon,
    title: 'Advanced Plan',
    description: 'Designed for teams and businesses.',
    price: 49,
    period: '/month',
    buttonText: 'Premium Access',
    features: ['1 user account', 'Up to 30 monthly transactions', '10 crypto pairs', 'Basic market analysis'],
    extraFeatures: ['24/7 customer support', 'User-friendly mobile app', 'Strong data encryption'],
    isPopular: true
  }
]

const PricingPage = () => {
  return <Pricing plans={plans} />
}

export default PricingPage
