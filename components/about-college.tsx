"use client"

import { motion } from "framer-motion"

export function AboutCollege() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* 2D Cockpit UI Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto relative rounded-[2rem] md:rounded-[4rem] border-x-[12px] border-y-[16px] border-slate-900 bg-[#020510]/95 backdrop-blur-xl shadow-[inset_0_0_80px_rgba(0,150,255,0.05),_0_0_100px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        {/* Cockpit Inner Glass Glow */}
        <div className="absolute inset-0 border border-accent/20 rounded-[1.5rem] md:rounded-[3.5rem] m-2 md:m-4 pointer-events-none shadow-[inset_0_0_30px_rgba(0,234,255,0.1)]"></div>
        
        {/* Top & Bottom metallic edge curves (Decorative) */}
        <div className="absolute top-0 left-[10%] right-[10%] h-8 bg-gradient-to-b from-slate-800 to-transparent opacity-40 blur-md pointer-events-none"></div>
        <div className="absolute bottom-0 left-[10%] right-[10%] h-8 bg-gradient-to-t from-slate-800 to-transparent opacity-40 blur-md pointer-events-none"></div>

        {/* --- HUD Overlays --- */}
        {/* Top Left: System Status */}
        <div className="absolute top-8 left-8 md:top-12 md:left-16 hidden sm:block pointer-events-none">
          <div className="border border-accent/30 bg-accent/5 px-3 py-1.5 rounded-sm">
            <p className="font-mono text-[10px] md:text-xs text-accent/80 tracking-widest uppercase">
              System Status<br />
              <span className="text-accent">Active</span>
            </p>
          </div>
        </div>

        {/* Top Right: Analysis Ready */}
        <div className="absolute top-8 right-8 md:top-12 md:right-16 hidden sm:block pointer-events-none text-right">
          <div className="border border-accent/30 bg-accent/5 px-3 py-1.5 rounded-sm">
            <p className="font-mono text-[10px] md:text-xs text-accent/80 tracking-widest uppercase">
              Analysis<br />
              <span className="text-accent">Ready</span>
            </p>
          </div>
        </div>

        {/* Bottom Left: Signal */}
        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-16 hidden sm:block pointer-events-none">
          <div className="flex items-center gap-2 border border-accent/30 bg-accent/5 px-3 py-1.5 rounded-sm">
            <div className="font-mono text-[10px] md:text-xs text-accent/80 tracking-widest uppercase">Signal</div>
            <div className="flex gap-[2px]">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-1.5 h-3 bg-accent opacity-80 shadow-[0_0_5px_theme(colors.accent)]"></div>
              ))}
            </div>
            <div className="font-mono text-[10px] md:text-xs text-accent">100%</div>
          </div>
        </div>

        {/* Bottom Right: Timestamp */}
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-16 hidden sm:block pointer-events-none text-right">
          <div className="border border-accent/30 bg-accent/5 px-3 py-1.5 rounded-sm">
            <p className="font-mono text-[10px] md:text-xs text-accent/80 tracking-widest uppercase">
              Timestamp<br />
              <span className="text-accent">Online</span>   
            </p>
          </div>
        </div>

        {/* Center Bottom: Explore Home (Optional aesthetic marker) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block pointer-events-none">
          <div className="flex items-center gap-4 border-b border-accent/30 px-6 pb-2">
            <p className="font-mono text-xs text-accent/60 tracking-[0.3em] uppercase">Explore Home</p>
          </div>
        </div>

        {/* --- Core Content Section --- */}
        <div className="relative z-10 px-6 py-20 sm:px-12 md:px-24 md:py-32 max-w-5xl mx-auto flex flex-col items-center">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-accent tracking-widest uppercase font-[family-name:var(--font-space-grotesk)] drop-shadow-[0_0_10px_rgba(0,234,255,0.4)]">
              ABOUT OXFORD
            </h2>
            <p className="font-mono text-xs text-accent/60 tracking-widest mt-4 uppercase">
              The Oxford College Of Engineering
            </p>
          </div>

          <div className="w-full grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Box: Photo Placeholder */}
            <div className="relative group perspective-1000">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-accent/5 to-transparent border border-accent/20 rounded-xl flex items-center justify-center p-2 relative overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]">
                {/* Simulated Scanline */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/10 to-transparent opacity-50 animate-scanline pointer-events-none"></div>
                
                <div className="w-full h-full border border-accent/10 rounded-lg relative overflow-hidden">
                  <img 
                    src="/n38.jpg" 
                    alt="The Oxford College of Engineering Campus" 
                    className="w-full h-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100" 
                  />
                  {/* Keep the radial gradient for that glowing screen effect over the photo */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,234,255,0.1)_0%,transparent_70%)] mix-blend-screen pointer-events-none"></div>
                </div>
              </div>
            </div>

            {/* Right Box: Content */}
            <div className="text-muted-foreground leading-relaxed text-sm md:text-base space-y-6">
              <p>
                <span className="text-white font-semibold">The Oxford College of Engineering</span> is dedicated to fostering academic excellence with a comprehensive range of undergraduate and postgraduate programs spanning diverse disciplines — engineering, management, and architecture.
              </p>
              <p>
                Renowned for its commitment to industry-aligned learning and research innovation, the campus boasts state-of-the-art facilities and actively cultivates an environment highly conducive to personal and professional growth.
              </p>
              <p>
                Beyond rigorous academics, Oxford emphasizes holistic student development, encouraging vibrant participation in national tech-fests, cultural events, sports, and community initiatives. This dynamic commitment transforms our campus into a premier hub for developing the visionary leaders of tomorrow.
              </p>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  )
}
