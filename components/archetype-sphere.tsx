"use client"

import { motion } from "framer-motion"
import { 
  Music, 
  Zap, 
  Cloud, 
  History, 
  RefreshCcw, 
  Cpu, 
  Heart, 
  Compass,
  Disc
} from "lucide-react"
import { ARCHETYPES } from "@/lib/personality/archetypes"

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

export function ArchetypeSphere() {
  return (
    <div className="relative w-80 h-80 mx-auto flex items-center justify-center">
      {/* Central Core */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        className="relative z-10 w-28 h-28 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_50px_-12px_rgba(var(--primary),0.5)]"
      >
        <div className="absolute inset-0 rounded-full border-t-2 border-primary/40 animate-spin" style={{ animationDuration: '3s' }}></div>
        <Disc className="w-14 h-14 text-primary" />
      </motion.div>

      {/* Orbiting Atoms */}
      {ARCHETYPES.map((archetype, index) => {
        const Icon = ICON_MAP[archetype.id as keyof typeof ICON_MAP] || Music
        const angle = (index / ARCHETYPES.length) * Math.PI * 2
        const radius = 120
        
        return (
          <motion.div
            key={archetype.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: Math.cos(angle) * radius,
              y: Math.sin(angle) * radius,
            }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
            className="absolute"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="group relative"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${archetype.color} p-0.5 shadow-lg transition-transform hover:scale-110`}>
                <div className="w-full h-full rounded-[0.9rem] bg-slate-950 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-white" />
                </div>
              </div>
              
              {/* Label on Hover */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap z-50">
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] bg-primary/90 px-3 py-1.5 rounded-full shadow-2xl">
                  {archetype.name}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )
      })}

      {/* Connection Lines (Orbits) */}
      <div className="absolute inset-0 rounded-full border border-primary/5 animate-spin" style={{ animationDuration: '30s' }}></div>
      <div className="absolute inset-0 rounded-full border border-accent/5 animate-spin" style={{ animationDuration: '45s', transform: 'scale(0.8) rotate(45deg)' }}></div>
      <div className="absolute inset-0 rounded-full border border-white/5 animate-spin" style={{ animationDuration: '60s', transform: 'scale(0.6) rotate(-45deg)' }}></div>
    </div>
  )
}
