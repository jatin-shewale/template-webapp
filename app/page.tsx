"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Music, Sparkles, BarChart3, Share2, Headphones, Mic, ArrowRight, Zap, Play, Disc } from "lucide-react"
import { motion } from "framer-motion"

export default function HomePage() {
  const features = [
    {
      icon: Music,
      title: "Listening Archetype",
      description: "Discover your musical personality type from 8+ unique archetypes.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: BarChart3,
      title: "Genre DNA",
      description: "See exactly what genres make up your unique taste with a beautiful pie chart.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Mic,
      title: "Mood Spectrum",
      description: "Understand your energy, danceability, and emotional preferences.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Sparkles,
      title: "Music Alter Ego",
      description: "Reveal your secret musical persona based on your listening habits.",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Share2,
      title: "Shareable Card",
      description: "One-tap share your results as a beautiful image on social media.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Headphones,
      title: "Spotify Integration",
      description: "Secure OAuth connection to analyze your real listening data.",
      color: "from-indigo-500 to-blue-500",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          
          {/* Animated Blobs */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse delay-700"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-primary text-sm font-semibold tracking-wide border-primary/20 shadow-lg shadow-primary/10"
              >
                <Sparkles className="w-4 h-4" />
                <span>UNCOVER YOUR MUSICAL IDENTITY</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] text-white"
              >
                Your Music, <br />
                <span className="text-gradient">Your DNA.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl sm:text-2xl text-white/60 font-medium leading-relaxed max-w-2xl mx-auto"
              >
                Connect your Spotify to reveal your unique listening archetype, genre DNA, and mood spectrum with high-fidelity analytics.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6"
              >
                <Button
                  size="lg"
                  className="px-10 py-8 text-xl font-bold bg-primary hover:bg-primary/90 text-white rounded-2xl shadow-2xl shadow-primary/30 group"
                  asChild
                >
                  <Link href="/spotify/login">
                    Connect Spotify
                    <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-10 py-8 text-xl font-bold border-white/10 glass text-white hover:bg-white/5 rounded-2xl"
                  asChild
                >
                  <Link href="/wrapped">
                    <Play className="mr-2 w-5 h-5 fill-white" />
                    View Demo
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Hero Decorative Elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-40 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none"
          >
            <Disc className="w-[600px] h-[600px] text-white/10" />
          </motion.div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-32 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
                High Fidelity Analysis
              </h2>
              <div className="h-1.5 w-24 bg-primary mx-auto rounded-full"></div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {features.map((feature) => (
                <motion.div key={feature.title} variants={itemVariants}>
                  <Card className="group relative overflow-hidden p-8 h-full glass border-white/5 hover:border-primary/50 transition-all duration-500 rounded-[2rem]">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity blur-3xl`}></div>
                    
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-8 shadow-lg`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-white/50 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Archetypes Preview */}
        <section className="py-32 bg-slate-950/50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                    8 Unique <br />
                    <span className="text-primary">Archetypes</span>
                  </h2>
                  <p className="text-white/60 text-xl leading-relaxed">
                    From The Melomaniac to The Rager, discover which musical personality defines your listening habits. Our algorithm processes over 50 data points to find your match.
                  </p>
                  <ul className="space-y-4">
                    {["Detailed Traits", "Historical Accuracy", "Shareable Badges"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-white font-semibold">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                          <Zap className="w-3.5 h-3.5 text-primary" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4">
                  {["🎵", "🔥", "☁️", "📼", "🦎", "🧠", "💜", "🎧"].map((emoji, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="aspect-square rounded-[2rem] glass border-white/5 flex items-center justify-center text-5xl shadow-xl hover:shadow-primary/10 transition-all cursor-default"
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-40 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/10 blur-[150px]"></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="max-w-3xl mx-auto space-y-10">
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
                Ready to find your <br />
                <span className="text-gradient">Music Soul?</span>
              </h2>
              <Button
                size="lg"
                className="px-12 py-10 text-2xl font-bold bg-white text-black hover:bg-white/90 rounded-[2rem] shadow-2xl transition-all hover:scale-105"
                asChild
              >
                <Link href="/spotify/login">Get Started Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}