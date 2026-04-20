"use client"

import { motion } from "framer-motion"

export function AboutCollege() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto"
      >
        {/* Section Label */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.4em] uppercase text-yellow-400/70 mb-4">
            Our Home
          </p>
          <h2
            className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-bold text-white leading-tight"
          >
            The Oxford College
            <br />
            <span className="text-yellow-400">of Engineering</span>
          </h2>
          <div className="mt-5 mx-auto w-20 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-400" />
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-2xl overflow-hidden border border-yellow-400/20 shadow-[0_0_60px_rgba(255,215,0,0.08)]"
          >
            <img
              src="/n38.jpg"
              alt="The Oxford College of Engineering Campus"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6 text-white/70 leading-relaxed text-base"
          >
            <p>
              <span className="text-white font-semibold">The Oxford College of Engineering</span> is
              dedicated to fostering academic excellence with a comprehensive range of undergraduate
              and postgraduate programs spanning diverse disciplines — engineering, management, and
              architecture.
            </p>
            <p>
              Renowned for its commitment to industry-aligned learning and research innovation, the
              campus boasts state-of-the-art facilities and actively cultivates an environment highly
              conducive to personal and professional growth.
            </p>
            <p>
              Beyond rigorous academics, Oxford emphasizes holistic student development, encouraging
              vibrant participation in national tech-fests, cultural events, sports, and community
              initiatives — transforming our campus into a premier hub for the leaders of tomorrow.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-yellow-400/15">
              {[
                { value: "30+", label: "Years of Excellence" },
                { value: "10k+", label: "Alumni Network" },
                { value: "50+", label: "Clubs & Events" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-yellow-400 font-[family-name:var(--font-space-grotesk)]">
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/50 mt-1 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
