"use client"

import { motion } from "framer-motion"
import { Trophy } from "lucide-react"

const prizes = [
  {
    tier: "Gold",
    place: "1st Place",
    icon: Trophy,
    description: "₹1,00,000 Cash + Orbital Trophy",
    bgColor: "bg-[#1a1200]",
    borderColor: "border-primary",
    iconColor: "text-primary",
    glowColor: "rgba(255, 215, 0, 0.4)",
    isMain: true,
    orderClass: "order-1",
  },
]

export function Prizes() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] italic text-foreground">
            Exciting Prizes to be Won
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Prove your skills, conquer the challenges, and claim your place in the orbital hierarchy.
          </p>
        </motion.div>

        {/* Prize Cards */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4">
          {prizes.map((prize, index) => (
              <motion.div
                key={prize.tier}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
                className={`relative w-full max-w-xs ${prize.orderClass} ${
                  prize.isMain ? "md:-mt-8 md:scale-110 z-10" : ""
                }`}
              >
                {/* Grand Champion Badge */}
                {prize.isMain && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-black border border-primary rounded-full z-20">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider shadow-none">
                      Grand Champion
                    </span>
                  </div>
                )}

                <div
                  className={`${prize.bgColor} rounded-xl p-8 border-2 ${prize.borderColor} text-center transition-all duration-300 hover:scale-105`}
                  style={{
                    boxShadow: prize.isMain
                      ? `0 0 40px ${prize.glowColor}`
                      : `0 0 20px ${prize.glowColor}`,
                  }}
                >
                  {/* Icon */}
                  <div
                    className={`w-20 h-20 mx-auto rounded-xl flex items-center justify-center mb-6 ${
                      prize.isMain ? "bg-primary/20 animate-shimmer" : "bg-white/5"
                    } border ${prize.borderColor}`}
                  >
                    <prize.icon className={`w-10 h-10 ${prize.iconColor}`} />
                  </div>

                  {/* Tier */}
                  <h3
                    className={`text-2xl font-bold mb-1 ${
                      prize.tier === "Gold"
                        ? "text-primary"
                        : prize.tier === "Bronze"
                        ? "text-[#CD7F32]"
                        : "text-gray-300"
                    }`}
                  >
                    {prize.tier} Tier
                  </h3>

                  {/* Place */}
                  <p className="text-foreground font-semibold mb-4">{prize.place}</p>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground">{prize.description}</p>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  )
}
