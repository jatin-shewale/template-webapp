"use client"

import { useEffect, useState, useRef } from "react"
import { ArchetypeSphere } from "@/components/archetype-sphere"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { 
  Music, 
  Zap, 
  Cloud, 
  History, 
  RefreshCcw, 
  Cpu, 
  Heart, 
  Compass,
  Disc,
  ArrowLeft, 
  Share2, 
  Download, 
  Loader2, 
  Sparkles, 
  Mic2, 
  BarChart2,
  X
} from "lucide-react"
import html2canvas from "html2canvas"
import { PersonalityResult } from "@/lib/personality/analyzer"
import { MoodSpectrumChart } from "@/components/mood-spectrum-chart"
import { GenreDNAChart } from "@/components/genre-dna-chart"
import { motion, AnimatePresence } from "framer-motion"

const ICON_MAP = {
  "the-melomaniac": Music,
  "the-rager": Zap,
  "the-dreamer": Cloud,
  "the-nostalgic": History,
  "the-chameleon": RefreshCcw,
  "the-cerebral": Cpu,
  "the-soulful": Heart,
  "the-hipster": Compass,
}

export function WrappedClient() {
  const [result, setResult] = useState<PersonalityResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [sharing, setSharing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Try real API first, fall back to demo
    fetch("/api/spotify/analyze")
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated")
        return res.json()
      })
      .catch(() => {
        return fetch("/api/spotify/demo").then((res) => res.json())
      })
      .then((data) => {
        if (data.error) {
          setError(data.error)
        } else {
          setResult(data)
        }
      })
      .catch((err) => {
        setError("Failed to analyze your music")
        console.error(err)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleShare = async () => {
    if (!cardRef.current || sharing) return
    setSharing(true)

    try {
      // Small delay to ensure any layout shifts are settled
      await new Promise(resolve => setTimeout(resolve, 100))
      
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#020617", // Slate-950
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: 1200, // Ensure capture uses a consistent width
      })

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const a = document.createElement("a")
          a.href = url
          a.download = `sounddna-${result?.archetype.name.toLowerCase().replace(/\s+/g, '-')}.png`
          a.click()
          URL.revokeObjectURL(url)
        }
        setSharing(false)
      })
    } catch (err) {
      console.error("Share error:", err)
      setSharing(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-12">
          <ArchetypeSphere />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
            className="text-white text-2xl font-black tracking-widest uppercase"
          >
            Sequencing your SoundDNA...
          </motion.p>
        </div>
      </div>
    )
  }

  if (error || !result) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background px-6">
        <Card className="p-10 max-w-md w-full glass border-white/10 text-center space-y-6">
          <div className="w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center mx-auto">
            <X className="w-10 h-10 text-destructive" />
          </div>
          <h2 className="text-3xl font-bold text-white">Connection Required</h2>
          <p className="text-white/60 text-lg leading-relaxed">{error || "Please connect Spotify to continue"}</p>
          <Link href="/" className="block">
            <Button className="w-full py-6 text-lg bg-primary hover:bg-primary/90">Back to Home</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const { archetype, genreDNA, moodSpectrum, alterEgo, stats } = result
  const ArchetypeIcon = ICON_MAP[archetype.id as keyof typeof ICON_MAP] || Music

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/5 rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Button 
            onClick={handleShare} 
            disabled={sharing}
            className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {sharing ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Share2 className="w-4 h-4 mr-2" />
            )}
            {sharing ? "Preparing..." : "Share Identity"}
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10"
        >
          <div ref={cardRef} className="space-y-8 md:space-y-12 bg-slate-950 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 border border-white/10 relative overflow-hidden shadow-2xl">
            {/* Share Card Branding */}
            <div className="flex items-center justify-between mb-4 md:mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg md:text-xl tracking-tight text-white">SoundDNA</span>
              </div>
              <div className="text-white/30 text-[10px] md:text-xs font-mono uppercase tracking-widest hidden sm:block">
                Verification ID: {Math.random().toString(36).substring(7).toUpperCase()}
              </div>
            </div>

            <div className="text-center space-y-4 relative z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none scale-125 md:scale-150">
                <ArchetypeSphere />
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight relative z-20 break-words">Your Musical Identity</h1>
              <p className="text-primary font-bold uppercase tracking-[0.2em] text-[10px] md:text-sm relative z-20">Analysis Report</p>
            </div>

            {/* Main Archetype Card */}
            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-white/10 p-6 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-primary/20 rounded-full blur-[60px] md:blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
              <div className="text-center space-y-4 md:space-y-8 relative z-10">
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 12, stiffness: 100 }}
                  className="mb-2 md:mb-4 drop-shadow-2xl flex justify-center"
                >
                  <div className={`w-20 h-20 md:w-28 md:h-28 rounded-2xl md:rounded-3xl bg-gradient-to-br ${archetype.color || 'from-primary to-accent'} p-0.5 shadow-2xl`}>
                    <div className="w-full h-full rounded-[1.1rem] md:rounded-[1.4rem] bg-slate-950 flex items-center justify-center">
                      <ArchetypeIcon className="w-10 h-10 md:w-14 md:h-14 text-white" />
                    </div>
                  </div>
                </motion.div>
                <h2 className="text-3xl md:text-6xl font-black text-gradient uppercase tracking-tighter">
                  {result.musicalReading?.personalizedArchetype || archetype.name}
                </h2>
                <div className="flex flex-col items-center gap-4">
                  <p className="text-white/70 text-sm md:text-xl leading-relaxed max-w-xl mx-auto font-medium">
                    {archetype.description}
                  </p>
                  {result.musicalReading?.mainCharacterEnergy && (
                    <div className="px-4 py-1.5 bg-primary/20 border border-primary/30 rounded-full flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-primary" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                        {result.musicalReading.mainCharacterEnergy}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-4 md:mt-8">
                  {archetype.traits.map((trait, idx) => (
                    <motion.span
                      key={trait}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      className="px-3 md:px-5 py-1.5 md:py-2.5 glass text-primary rounded-full text-[10px] md:text-sm font-black border-primary/30 uppercase tracking-widest"
                    >
                      {trait}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Card>

            {/* AI Reading Section */}
            <AnimatePresence>
              {result.musicalReading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6 md:space-y-10"
                >
                  {/* Signature Track */}
                  {result.topTracks[0] && (
                    <Card className="bg-slate-900/40 border-white/10 p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] relative overflow-hidden group">
                      <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                        <div className="relative group/track shrink-0">
                          <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-2xl relative">
                            <Disc className="w-full h-full text-primary/20 absolute inset-0 animate-spin-slow" />
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                              <Music className="w-12 h-12 text-white" />
                            </div>
                          </div>
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
                            <Heart className="w-4 h-4 text-white fill-current" />
                          </div>
                        </div>
                        <div className="space-y-4 text-center md:text-left flex-1">
                          <div className="space-y-1">
                            <h3 className="text-[10px] md:text-xs font-black text-white/30 uppercase tracking-[0.3em]">Signature Track</h3>
                            <h4 className="text-xl md:text-3xl font-black text-white truncate max-w-[300px] md:max-w-none">
                              {result.topTracks[0].name}
                            </h4>
                            <p className="text-primary font-bold text-sm uppercase tracking-wide">
                              {result.topTracks[0].artists.join(", ")}
                            </p>
                          </div>
                          <p className="text-white/60 text-sm md:text-lg leading-relaxed italic border-l-2 border-primary/30 pl-4">
                            {result.musicalReading.signatureReason}
                          </p>
                        </div>
                      </div>
                    </Card>
                  )}

                  <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-white/10 p-8 rounded-[1.5rem] md:rounded-[2.5rem] relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>
                    <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                      <div className="w-16 h-16 rounded-full bg-slate-950 flex items-center justify-center border border-white/10 shrink-0">
                        <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                      </div>
                      <div className="space-y-2 text-center md:text-left">
                        <h3 className="text-[10px] md:text-xs font-black text-primary uppercase tracking-[0.3em]">AI Sonic Oracle</h3>
                        <p className="text-white text-lg md:text-xl font-medium leading-relaxed italic">
                          "{result.musicalReading.reading}"
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              {/* Alter Ego */}
              <Card className="bg-slate-900/40 border-white/10 p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] text-center space-y-4 md:space-y-6 group hover:bg-slate-900/60 transition-colors">
                <h3 className="text-[10px] md:text-xs font-black text-white/30 uppercase tracking-[0.3em]">Sonic Manifestation</h3>
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-5xl md:text-7xl drop-shadow-xl"
                >
                  {alterEgo.emoji}
                </motion.div>
                <div>
                  <h4 className="text-xl md:text-3xl font-black text-white tracking-tight">{alterEgo.name}</h4>
                  <p className="text-primary font-bold text-[10px] md:text-xs uppercase tracking-widest mt-1">{alterEgo.title}</p>
                </div>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed max-w-xs mx-auto italic">
                  "{alterEgo.description}"
                </p>
              </Card>

              {/* Stats Grid */}
              <Card className="bg-slate-900/40 border-white/10 p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col justify-center group hover:bg-slate-900/60 transition-colors">
                <h3 className="text-[10px] md:text-xs font-black text-white/30 uppercase tracking-[0.3em] text-center mb-6 md:mb-10">Vital Statistics</h3>
                <div className="grid grid-cols-3 gap-2 md:gap-6">
                  <div className="space-y-1 text-center">
                    <p className="text-2xl md:text-4xl font-black text-white tracking-tighter">{stats.uniqueGenres}</p>
                    <p className="text-white/30 text-[8px] md:text-[10px] font-black uppercase tracking-widest">Genres</p>
                  </div>
                  <div className="space-y-1 text-center">
                    <p className="text-2xl md:text-4xl font-black text-white tracking-tighter">{stats.uniqueArtists}</p>
                    <p className="text-white/30 text-[8px] md:text-[10px] font-black uppercase tracking-widest">Artists</p>
                  </div>
                  <div className="space-y-1 text-center">
                    <p className="text-2xl md:text-4xl font-black text-white tracking-tighter">{Math.round(stats.totalMinutesListened / 60)}h</p>
                    <p className="text-white/30 text-[8px] md:text-[10px] font-black uppercase tracking-widest">Time</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Visual Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
              <Card className="bg-slate-900/40 border-white/10 p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden group hover:bg-slate-900/60 transition-colors">
                <h3 className="text-[10px] md:text-xs font-black text-white/30 uppercase tracking-[0.3em] mb-6 md:mb-10 flex items-center gap-2">
                  <BarChart2 className="w-3 h-3 md:w-4 md:h-4 text-primary" /> Genre DNA
                </h3>
                <div className="min-h-[250px] md:min-h-[300px] flex items-center justify-center">
                  <GenreDNAChart data={genreDNA} />
                </div>
              </Card>

              <Card className="bg-slate-900/40 border-white/10 p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden group hover:bg-slate-900/60 transition-colors">
                <h3 className="text-[10px] md:text-xs font-black text-white/30 uppercase tracking-[0.3em] mb-6 md:mb-10 flex items-center gap-2">
                  <Mic2 className="w-3 h-3 md:w-4 md:h-4 text-accent" /> Mood Spectrum
                </h3>
                <div className="min-h-[250px] md:min-h-[300px] flex items-center justify-center">
                  <MoodSpectrumChart data={moodSpectrum} />
                </div>
              </Card>
            </div>
            
            {/* DNA Pattern Background Overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          </div>

          <div className="text-center">
            <Button 
              onClick={handleShare} 
              disabled={sharing}
              variant="outline" 
              className="border-white/10 glass text-white hover:bg-white/5 rounded-2xl px-10 py-8 text-xl font-black transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {sharing ? (
                <Loader2 className="w-6 h-6 mr-3 animate-spin" />
              ) : (
                <Download className="w-6 h-6 mr-3" />
              )}
              {sharing ? "Sequencing Report..." : "Download Full Report"}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}