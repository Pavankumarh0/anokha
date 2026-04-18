"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ElectricBorder from "./ui/electric-border"

const technicalEvents = [
  { id: "EVT-01", title: "Watt's the Link?", icon: "⚡", desc: "Electrical connections challenge", type: "technical" as const },
  { id: "EVT-02", title: "Hunt.exe", icon: "💻", desc: "Cyber treasure hunt", type: "technical" as const },
  { id: "EVT-03", title: "DevKreeda: The Game Jam", icon: "🎮", desc: "Build a game in 24hrs", type: "technical" as const },
  { id: "EVT-04", title: "MindRush", icon: "🧠", desc: "Technical quiz showdown", type: "technical" as const },
  { id: "EVT-05", title: "Startup Battlefront", icon: "🚀", desc: "Pitch your startup idea", type: "technical" as const },
  { id: "EVT-06", title: "Rana Yantram", icon: "🤖", desc: "Robot football war", type: "technical" as const },
  { id: "EVT-07", title: "KALPANA – App Prototype", icon: "📱", desc: "Design the next big app", type: "technical" as const },
  { id: "EVT-08", title: "Chain of Minds", icon: "🔗", desc: "Collaborative problem solving", type: "technical" as const },
  { id: "EVT-09", title: "Robot Design", icon: "🦾", desc: "Build and showcase your bot", type: "technical" as const },
  { id: "EVT-10", title: "Poster Presentation", icon: "📋", desc: "Present your research", type: "technical" as const },
  { id: "EVT-11", title: "Reverse Engineering", icon: "🔧", desc: "Tear it apart, understand it", type: "technical" as const },
]

const nonTechnicalEvents = [
  { id: "NTE-01", title: "Sense & Surprise", icon: "🎲", desc: "Mystery challenge", type: "non-technical" as const },
  { id: "NTE-02", title: "The End Game", icon: "♟️", desc: "Ultimate strategy showdown", type: "non-technical" as const },
  { id: "NTE-03", title: "KshanaCinema – Short Film", icon: "🎬", desc: "60-second story", type: "non-technical" as const },
  { id: "NTE-04", title: "Decepta: Trust Nothing", icon: "🕵️", desc: "Deception game", type: "non-technical" as const },
  { id: "NTE-05", title: "Mukha-Nakha", icon: "🎨", desc: "Face painting - wearable art", type: "non-technical" as const },
  { id: "NTE-06", title: "Galactic Gambit", icon: "🌌", desc: "Space strategy game", type: "non-technical" as const },
  { id: "NTE-07", title: "Mafia: Trust No One", icon: "🃏", desc: "Social deduction", type: "non-technical" as const },
  { id: "NTE-08", title: "Logo Designing", icon: "✏️", desc: "Brand it in 90 mins", type: "non-technical" as const },
  { id: "NTE-09", title: "Photography", icon: "📷", desc: "Capture the moment", type: "non-technical" as const },
  { id: "NTE-10", title: "Hasya-Krida", icon: "🎤", desc: "Roast the crowd", type: "non-technical" as const },
  { id: "NTE-11", title: "Vyuha Sphere: Debate", icon: "🗣️", desc: "Argue your truth", type: "non-technical" as const },
  { id: "NTE-12", title: "Painting", icon: "🖌️", desc: "Canvas storytelling", type: "non-technical" as const },
]

const allEvents = [...technicalEvents, ...nonTechnicalEvents]

type EventCardProps = {
  event: typeof allEvents[0]
}

function EventCard({ event }: EventCardProps) {
  const isTechnical = event.type === "technical"
  const electricColor = isTechnical ? "#FF7A18" : "#00EAFF"
  const textColor = isTechnical ? "text-secondary" : "text-accent"

  return (
    <ElectricBorder
      color={electricColor}
      speed={0.8}
      chaos={0.1}
      borderRadius={16}
      className="w-full h-full"
    >
      <div className="bg-[#0A0F1E]/95 backdrop-blur-md p-6 relative group overflow-hidden h-full flex flex-col">
        {/* Event Meta Badge */}
        <div className="flex justify-between items-start mb-6">
          <div className={`px-2 py-0.5 rounded border ${isTechnical ? "border-secondary/30 bg-secondary/10 text-secondary" : "border-accent/30 bg-accent/10 text-accent"} text-[9px] font-bold tracking-tighter uppercase`}>
            {isTechnical ? "Technical" : "Non-Technical"}
          </div>
          <span className={`text-[10px] font-mono ${textColor} opacity-60 tracking-widest`}>
            #{event.id}
          </span>
        </div>

        <div className="flex flex-col flex-1">
          {/* Icon */}
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 transition-transform group-hover:scale-110 ${
              isTechnical ? "bg-secondary/10 border border-secondary/20" : "bg-accent/10 border border-accent/20"
            }`}
          >
            {event.icon}
          </div>

          <div className="flex-1">
            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-space-grotesk)] group-hover:text-primary transition-colors">
              {event.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground/70 leading-relaxed mb-6">
              {event.desc}
            </p>
          </div>

          {/* Action Link */}
          <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
            <span className={`text-[9px] font-black tracking-[0.2em] ${textColor} uppercase group-hover:underline cursor-pointer`}>
              Initialize Protocol →
            </span>
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isTechnical ? "bg-secondary" : "bg-accent"}`}></div>
          </div>
        </div>
      </div>
    </ElectricBorder>
  )
}

export function Events() {
  const [activeTab, setActiveTab] = useState<"all" | "technical" | "non-technical">("all")

  const filteredEvents = activeTab === "all" 
    ? allEvents 
    : allEvents.filter(e => e.type === activeTab)

  return (
    <section id="events" className="relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 border border-accent/20 rounded-full bg-accent/5 mb-6">
            <p className="text-[10px] font-mono text-accent tracking-[0.3em] uppercase">Status: Matrix Online</p>
          </div>
          <h2 className="text-4xl md:text-7xl font-black mb-6 font-[family-name:var(--font-space-grotesk)] tracking-tight">
            <span className="text-white">EVENT </span>
            <span className="text-accent italic">UNIVERSE</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Operational protocols initialized. Filter the matrix or view the complete simulation.
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
              ALL SYSTEMS
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
                  ? "bg-accent text-black shadow-[0_0_20px_rgba(0,234,255,0.3)]"
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
