"use client"

import { MoodSpectrum } from "@/lib/personality/analyzer"
import { motion } from "framer-motion"

interface MoodSpectrumChartProps {
  data: MoodSpectrum
}

const moodLabels = {
  energy: { label: "Energy", emoji: "⚡", description: "Intensity & power" },
  danceability: { label: "Danceability", emoji: "💃", description: "Groove & rhythm" },
  acousticness: { label: "Acoustic", emoji: "🎸", description: "Natural sound" },
  valence: { label: "Positivity", emoji: "😊", description: "Emotional tone" },
  instrumentalness: { label: "Instrumental", emoji: "🎼", description: "Lyrics vs music" },
  speechiness: { label: "Vocals", emoji: "🎤", description: "Spoken word content" },
}

export function MoodSpectrumChart({ data }: MoodSpectrumChartProps) {
  const moodKeys = Object.keys(moodLabels) as (keyof typeof moodLabels)[]

  return (
    <div className="space-y-3 w-full">
      {moodKeys.map((key, idx) => {
        const value = data[key]
        const label = moodLabels[key]

        return (
          <motion.div 
            key={key} 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm md:text-base">{label.emoji}</span>
                <span className="text-white text-xs md:text-sm font-black uppercase tracking-wider truncate">{label.label}</span>
              </div>
              <span className="text-primary text-[10px] md:text-xs font-mono font-bold">{value}%</span>
            </div>
            <div className="h-1.5 md:h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: idx * 0.1 }}
              />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}