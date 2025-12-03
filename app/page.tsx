import Navbar from "@/components/shadcn-studio/blocks/navbar-component-05/navbar-component-05"
import HeroSection from "@/components/shadcn-studio/blocks/hero-section-31/hero-section-31"
import Features from "@/components/shadcn-studio/blocks/features-section-12/features-section-12"

const navigationData = [
  { title: 'Funktionen', href: '#funktionen' },
  { title: 'Preise', href: '#preise' },
  { title: 'Über uns', href: '#ueber-uns' },
]

export default function LandingPage() {
  return (
    <>
      <Navbar navigationData={navigationData} />
      <HeroSection />
      <Features />
    </>
  )
}
