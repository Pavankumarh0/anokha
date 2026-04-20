"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { GlowCard } from "./ui/glow-card"

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 696 316" fill="none">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="rgba(250,204,21,1)"
            strokeWidth={path.width}
            strokeOpacity={0.04 + path.id * 0.008}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

const technicalEvents = [
  { id: "EVT-01", title: "Watt's the Link?", icon: "⚡", desc: "Electrical connections challenge", type: "technical" as const, poster: "/event_posters/watts the link.jpeg" },
  { id: "EVT-02", title: "Hunt.exe", icon: "💻", desc: "Cyber treasure hunt", type: "technical" as const, poster: "/event_posters/Hunt.exe.jpg" },
  { id: "EVT-03", title: "DevKreeda: The Game Jam", icon: "🎮", desc: "Build a game in 24hrs", type: "technical" as const, poster: "/event_posters/dev kreeda.jpeg" },
  { id: "EVT-04", title: "MindRush", icon: "🧠", desc: "Technical quiz showdown", type: "technical" as const, poster: "/event_posters/mind rush.jpeg" },
  { id: "EVT-05", title: "Startup Battlefront", icon: "🚀", desc: "Pitch your startup idea", type: "technical" as const, poster: "/event_posters/startup battlefront.jpg" },
  { id: "EVT-06", title: "Rana Yantram", icon: "🤖", desc: "Robot football war", type: "technical" as const, poster: "/event_posters/ranayantra.png" },
  { id: "EVT-07", title: "KALPANA – App Prototype", icon: "📱", desc: "Design the next big app", type: "technical" as const, poster: "/event_posters/kalpana.png" },
  { id: "EVT-08", title: "Chain of Minds", icon: "🔗", desc: "Collaborative problem solving", type: "technical" as const, poster: "/event_posters/chain of minds.jpeg" },
  { id: "EVT-09", title: "Green Pitch", icon: "🦾", desc: "Build and showcase your bot", type: "technical" as const, poster: "/event_posters/green pitch.jpeg" },
  { id: "EVT-10", title: "Poster Presentation", icon: "📋", desc: "Present your research", type: "technical" as const, poster: "/event_posters/poster_presentation.jpeg" },
  { id: "EVT-11", title: "Reverse Engineering", icon: "🔧", desc: "Tear it apart, understand it", type: "technical" as const, poster: "/event_posters/reverse-engineering.jpg" },
]

const nonTechnicalEvents = [
  { id: "NTE-01", title: "Sense & Surprise", icon: "🎲", desc: "Mystery challenge", type: "non-technical" as const, poster: "/event_posters/sense and suprise.jpeg" },
  { id: "NTE-02", title: "The End Game", icon: "♟️", desc: "Ultimate strategy showdown", type: "non-technical" as const, poster: "/event_posters/the endgame.jpeg" },
  { id: "NTE-03", title: "KshanaCinema – Short Film", icon: "🎬", desc: "60-second story", type: "non-technical" as const, poster: "/event_posters/kshana-cinim a.jpeg" },
  { id: "NTE-04", title: "Decepta: Trust Nothing", icon: "🕵️", desc: "Deception game", type: "non-technical" as const, poster: "/event_posters/decepta- trust nothing.jpeg" },
  { id: "NTE-05", title: "Mukha-Nakha", icon: "🎨", desc: "Face painting - wearable art", type: "non-technical" as const, poster: "/event_posters/mukha-nakha.jpg" },
  { id: "NTE-06", title: "Galactic Gambit", icon: "🌌", desc: "Space strategy game", type: "non-technical" as const, poster: "/event_posters/Galactic Gambit .png" },
  { id: "NTE-07", title: "Mafia: Trust No One", icon: "🃏", desc: "Social deduction", type: "non-technical" as const, poster: "/event_posters/Mafia - trust no one.jpeg" },
  { id: "NTE-08", title: "Logo Designing", icon: "✏️", desc: "Brand it in 90 mins", type: "non-technical" as const, poster: "/event_posters/ecoemblem.jpeg" },
  { id: "NTE-09", title: "Photography", icon: "📷", desc: "Capture the moment", type: "non-technical" as const, poster: "/event_posters/photography.png" },
  { id: "NTE-10", title: "Hasya-Krida", icon: "🎤", desc: "Roast the crowd", type: "non-technical" as const, poster: "/event_posters/hasya-krida.png" },
  { id: "NTE-11", title: "Vyuha Sphere: Debate", icon: "🗣️", desc: "Argue your truth", type: "non-technical" as const, poster: "/event_posters/vuya sphere.png" },
  { id: "NTE-12", title: "Painting", icon: "🖌️", desc: "Canvas storytelling", type: "non-technical" as const, poster: "/event_posters/painting.png" },
]

const allEvents = [...technicalEvents, ...nonTechnicalEvents]

type EventCardProps = {
  event: typeof allEvents[0]
}

function EventCard({ event }: EventCardProps) {
  const router = useRouter()
  const isTechnical = event.type === "technical"
  const isGreen = 'green' in event && event.green === true
  const glowColor = isGreen ? "green" : isTechnical ? "orange" : "yellow"
  const textColor = isGreen ? "text-green-400" : isTechnical ? "text-secondary" : "text-yellow-400"

  return (
    <GlowCard
      glowColor={glowColor}
      className={`bg-[#0A0F1E]/95 group overflow-hidden ${event.poster ? "cursor-pointer" : ""}`}
      onClick={event.poster ? () => router.push(`/events/${event.id}`) : undefined}
    >
      <div className="flex flex-col flex-1 p-2">
        {/* Event Meta Badge */}
        <div className="flex justify-between items-start mb-6">
          <div className={`px-2 py-0.5 rounded border ${isTechnical ? "border-secondary/30 bg-secondary/10 text-secondary" : "border-yellow-400/30 bg-yellow-400/10 text-yellow-400"} text-[9px] font-bold tracking-tighter uppercase`}>
            {isTechnical ? "Technical" : "Non-Technical"}
          </div>
          <span className={`text-[10px] font-mono ${textColor} opacity-60 tracking-widest`}>
            #{event.id}
          </span>
        </div>

        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 transition-transform group-hover:scale-110 ${
            isGreen ? "bg-green-400/10 border border-green-400/20" : isTechnical ? "bg-secondary/10 border border-secondary/20" : "bg-yellow-400/10 border border-yellow-400/20"
          }`}
        >
          {event.icon}
        </div>

        <div className="flex-1">
          <h3 className={`text-xl font-bold mb-2 font-[family-name:var(--font-space-grotesk)] transition-colors ${isGreen ? "text-green-400" : "text-white group-hover:text-primary"}`}>
            {event.title}
          </h3>
          <p className="text-sm text-muted-foreground/70 leading-relaxed mb-6">
            {event.desc}
          </p>
        </div>

        {/* Action Link */}
        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
          <span className={`text-[9px] font-black tracking-[0.2em] ${textColor} uppercase group-hover:underline`}>
            {event.poster ? "View Poster →" : "Coming Soon"}
          </span>
          <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isGreen ? "bg-green-400" : isTechnical ? "bg-secondary" : "bg-yellow-400"}`} />
        </div>
      </div>
    </GlowCard>
  )
}

export function Events() {
  const [activeTab, setActiveTab] = useState<"all" | "technical" | "non-technical">("all")

  const filteredEvents = activeTab === "all"
    ? allEvents
    : allEvents.filter(e => e.type === activeTab)

  return (
    <section id="events" className="relative py-20 md:py-32 overflow-hidden">
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 border border-yellow-400/20 rounded-full bg-yellow-400/5 mb-6">
            <p className="text-[10px] font-semibold text-yellow-400 tracking-[0.3em] uppercase">ANOKHA 2026</p>
          </div>
          <h2 className="text-4xl md:text-7xl font-black mb-6 font-[family-name:var(--font-space-grotesk)] tracking-tight">
            <span className="text-white">EXPLORE </span>
            <span className="text-yellow-400 italic">EVENTS</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From technical challenges to creative showdowns — find your stage at ANOKHA 2026.
          </p>
        </motion.div>

        {/* Tab Toggle */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-slate-900/50 rounded-xl p-1.5 border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-2.5 rounded-lg font-bold text-xs transition-all duration-300 ${
                activeTab === "all"
                  ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              ALL EVENTS
            </button>
            <button
              onClick={() => setActiveTab("technical")}
              className={`px-6 py-2.5 rounded-lg font-bold text-xs transition-all duration-300 ${
                activeTab === "technical"
                  ? "bg-secondary text-white shadow-[0_0_20px_rgba(255,122,24,0.3)]"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              TECHNICAL
            </button>
            <button
              onClick={() => setActiveTab("non-technical")}
              className={`px-6 py-2.5 rounded-lg font-bold text-xs transition-all duration-300 ${
                activeTab === "non-technical"
                  ? "bg-yellow-400 text-black shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              NON-TECHNICAL
            </button>
          </div>
        </div>

        {/* Unified Grid */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {filteredEvents.map((event, index) => (
                <motion.div 
                  key={event.id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: (index % 3) * 0.1 }}
                  className="h-full"
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </section>
  )
}
