import { SproutIcon, FlowerIcon } from 'lucide-react'

import Navbar from "@/components/shadcn-studio/blocks/navbar-component-05/navbar-component-05"
import HeroSection from "@/components/shadcn-studio/blocks/hero-section-31/hero-section-31"
import Features from "@/components/shadcn-studio/blocks/features-section-12/features-section-12"
import Pricing from "@/components/shadcn-studio/blocks/pricing-component-04/pricing-component-04"
import Footer from "@/components/shadcn-studio/blocks/footer-component-02/footer-component-02"

const navigationData = [
  { title: 'Funktionen', href: '#funktionen' },
  { title: 'Preise', href: '#preise' },
  { title: 'Über uns', href: '#ueber-uns' },
]

const pricingPlans = [
  {
    icon: SproutIcon,
    title: 'Starter',
    description: 'Perfekt für Einsteiger und kleine Teams',
    price: 29,
    period: '/Monat',
    buttonText: 'Jetzt starten',
    features: ['100 Anzeigen-Analysen/Monat', 'Bis zu 5 Wettbewerber tracken', 'Basis Export-Funktionen', 'E-Mail Support']
  },
  {
    icon: FlowerIcon,
    title: 'Professional',
    description: 'Für Agenturen und wachsende Teams',
    price: 79,
    period: '/Monat',
    buttonText: 'Professional wählen',
    features: ['Unbegrenzte Anzeigen-Analysen', 'Bis zu 25 Wettbewerber tracken', 'Erweiterte Export-Funktionen', 'Prioritäts-Support'],
    extraFeatures: ['Echtzeit-Benachrichtigungen', 'Team-Zugänge (bis zu 5)', 'API-Zugriff'],
    isPopular: true
  }
]

export default function LandingPage() {
  return (
    <>
      <Navbar navigationData={navigationData} />
      <HeroSection />
      <Features />
      <Pricing plans={pricingPlans} />
      <Footer />
    </>
  )
}
