"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BarChart3, Eye, Search, Target, TrendingUp, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroSection from "@/components/shadcn-studio/blocks/hero-section-31/hero-section-31"

const features = [
  {
    icon: <Search className="h-6 w-6" />,
    title: "Ad Discovery",
    description: "Search and discover Facebook ads from any advertiser worldwide"
  },
  {
    icon: <Eye className="h-6 w-6" />,
    title: "Ad Monitoring",
    description: "Track competitors and get alerts when they launch new campaigns"
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Performance Analytics",
    description: "Analyze ad performance metrics and engagement data"
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Audience Insights",
    description: "Understand targeting strategies and audience demographics"
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Trend Analysis",
    description: "Identify trending creatives and winning ad formats"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Advertiser Database",
    description: "Access a comprehensive database of advertisers and their campaigns"
  }
]

const stats = [
  { value: "10M+", label: "Ads Tracked" },
  { value: "500K+", label: "Advertisers" },
  { value: "195", label: "Countries" },
  { value: "24/7", label: "Monitoring" }
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">FB Ads Analyzer</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-slate-400 mt-2">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to analyze ads
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Powerful tools to discover, track, and analyze Facebook ads from any advertiser
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center mb-4 text-blue-400">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-12 text-center border border-white/10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to discover winning ads?
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Join thousands of marketers who use FB Ads Analyzer to stay ahead of the competition.
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8">
              Get Started for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center text-slate-400">
          <p>&copy; 2024 FB Ads Analyzer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
