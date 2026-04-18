"use client"

import { motion } from "framer-motion"
import { Code, Lightbulb, Gamepad2 } from "lucide-react"
import RotatingEarth from "@/components/ui/wireframe-dotted-globe"

const features = [
  { icon: Code, label: "Innovation" },
  { icon: Lightbulb, label: "Creativity" },
  { icon: Gamepad2, label: "Competition" },
]

export function About() {
  return (
    <section
      id="about"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* 3D Rotating Earth Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[100vw] md:h-[100vw] z-0 opacity-30 flex items-center justify-center pointer-events-none">
        <RotatingEarth className="w-full h-full" />
      </div>

      <div className="relative z-10">
        <div className="overflow-hidden py-4 mb-12 bg-yellow-500 border-y border-yellow-600 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="text-2xl font-bold text-black mx-8 font-[family-name:var(--font-space-grotesk)]"
            >
              ANOKHA 2026 ✦
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-2 lg:gap-12 items-center lg:items-center">
          {/* Astronaut Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-start z-10 -mb-8 lg:mb-0 ml-4 lg:ml-0"
          >
            <div className="relative w-48 h-56 md:w-80 md:h-96 animate-float origin-bottom">
              <img
                src="/robo.png"
                alt="Robot Mascot"
                className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(234,179,8,0.5)]"
              />
            </div>
          </motion.div>

          {/* Content Card */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass rounded-2xl p-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2 font-[family-name:var(--font-space-grotesk)]">
              <span className="text-primary">About The Fest</span>
            </h2>
            <div className="w-16 h-1 bg-secondary mb-6" />

            <p className="text-muted-foreground leading-relaxed mb-6">
              <span className="text-foreground font-semibold">
                The Oxford College of Engineering
              </span>{" "}
              presents{" "}
              <span className="text-primary font-semibold">ANOKHA 2026</span> — a
              dynamic 2-day intra-college tech fest bringing innovation,
              creativity and competition together. Join us for exciting
              technical competitions, creative challenges, and unforgettable
              experiences on May 8 & 9, 2026.
            </p>

            {/* Feature Chips */}
            <div className="flex flex-wrap gap-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-accent/20"
                >
                  <feature.icon className="w-4 h-4 text-accent" />
                  <span className="text-sm text-foreground">{feature.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      </div>
    </section>
  )
}
