"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle, Sparkles, Zap, Shield, Music, Star, ArrowRight } from "lucide-react"
import { useSubscription } from "@/contexts/subscription-context"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "sonner"
import { motion } from "framer-motion"

export default function UpgradePage() {
  const { isPro, upgradeToPro, downgradeToFree, isLoading: subLoading } = useSubscription()
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleUpgrade = async () => {
    if (!user) {
      router.push("/auth/signup?returnUrl=/upgrade")
      return
    }

    setIsProcessing(true)
    try {
      await upgradeToPro()
      toast.success("Welcome to Pro! You now have access to all features.")
      router.push("/upgrade/success")
    } catch (error) {
      toast.error("Failed to upgrade. Please try again.")
      console.error(error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDowngrade = async () => {
    setIsProcessing(true)
    try {
      await downgradeToFree()
      toast.success("You've been downgraded to the Free plan.")
    } catch (error) {
      toast.error("Failed to downgrade. Please try again.")
      console.error(error)
    } finally {
      setIsProcessing(false)
    }
  }

  // Show current subscription if Pro
  if (isPro && !subLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center px-4 py-32 min-h-[calc(100vh-80px)]">
          <div className="max-w-2xl w-full text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-12"
            >
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/20">
                <Star className="w-12 h-12 text-primary fill-primary" />
              </div>
              <h1 className="text-5xl font-black text-white tracking-tight mb-4">
                You're a <span className="text-primary">PRO</span> Member
              </h1>
              <p className="text-xl text-white/50 font-medium">
                You've unlocked the full potential of your musical identity.
              </p>
            </motion.div>

            <div className="glass border-primary/20 rounded-[2.5rem] p-10 bg-gradient-to-br from-primary/10 to-transparent mb-12 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-primary font-bold uppercase tracking-widest text-xs mb-2">Current Identity</div>
                  <div className="text-3xl font-black text-white flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-primary" />
                    Pro Status
                  </div>
                </div>
                <div className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-bold border border-green-500/20">
                  Active
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Unlocked Benefits</h4>
                {[
                  "Unlimited SoundDNA Reports",
                  "Priority Data Processing",
                  "Advanced Genre Analytics",
                  "High-Resolution Card Exports"
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 text-white/70">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="px-10 py-8 text-xl font-bold bg-primary hover:bg-primary/90 rounded-2xl" asChild>
                <Link href="/profile">Manage Account</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-10 py-8 text-xl font-bold border-white/10 glass text-white hover:bg-white/5 rounded-2xl"
                onClick={handleDowngrade}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Downgrade"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-6 pt-40 pb-20">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-24 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-primary text-sm font-bold tracking-widest uppercase border-primary/20"
            >
              <Zap className="w-4 h-4" />
              <span>Elevate your identity</span>
            </motion.div>
            <h1 className="text-6xl md:text-7xl font-black text-white tracking-tight">
              Go <span className="text-primary">PRO.</span>
            </h1>
            <p className="text-xl text-white/50 font-medium max-w-2xl mx-auto">
              Unlock the complete genome of your musical taste with advanced analytics and premium features.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
            {/* Free Plan */}
            <div className="glass border-white/5 rounded-[2.5rem] p-10 space-y-10 opacity-60">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white/40 uppercase tracking-widest">Basic</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-white">$0</span>
                  <span className="text-white/40 font-bold uppercase tracking-widest text-xs">/ Forever</span>
                </div>
              </div>

              <div className="space-y-4 border-t border-white/5 pt-10">
                {[
                  "1 SoundDNA Report",
                  "Standard Processing",
                  "Basic Analytics",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-white/50">
                    <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
                      <CheckCircle className="w-3 h-3" />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full py-8 rounded-2xl border-white/10 text-white font-bold" disabled>
                Current Plan
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="relative glass border-primary/50 rounded-[3rem] p-12 space-y-10 bg-gradient-to-br from-primary/20 to-transparent shadow-2xl shadow-primary/20 scale-105 z-10">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest shadow-xl">
                MOST POPULAR
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-primary uppercase tracking-[0.2em]">Unlimited</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black text-white">$9.99</span>
                  <span className="text-white/40 font-bold uppercase tracking-widest text-xs">/ Month</span>
                </div>
              </div>

              <div className="space-y-6 border-t border-white/10 pt-10">
                {[
                  { icon: Zap, text: "Unlimited DNA Analysis" },
                  { icon: Shield, text: "Priority Server Access" },
                  { icon: Sparkles, text: "Deep Genre Insights" },
                  { icon: Star, text: "Exclusive Archetypes" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-4 text-white">
                    <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-bold">{item.text}</span>
                  </div>
                ))}
              </div>

              <Button
                className="w-full py-10 rounded-[1.5rem] bg-primary hover:bg-primary/90 text-white text-xl font-black shadow-2xl shadow-primary/30 group"
                onClick={handleUpgrade}
                disabled={isProcessing || authLoading || subLoading}
              >
                {isProcessing ? "Processing..." : "Get Pro Now"}
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          <div className="text-center space-y-4 opacity-40">
            <div className="flex items-center justify-center gap-2">
              <Music className="w-4 h-4" />
              <p className="text-sm font-bold uppercase tracking-widest">Demo Simulation Only</p>
            </div>
            <p className="text-xs">No real payment will be processed. Credits to Spotify for data access.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

