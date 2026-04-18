"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const images = [
  {
    url: "https://images.unsplash.com/photo-1581092583846-c566161be280?auto=format&fit=crop&q=80&w=1200",
    title: "Technical Workshops",
  },
  {
    url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1200",
    title: "Hackathon",
  },
  {
    url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200",
    title: "Gaming Arena",
  },
  {
    url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200",
    title: "Robotics War",
  },
  {
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    title: "Circuit Design",
  },
]

export function Gallery() {
  const [windowWidth, setWindowWidth] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Auto-swipe logic
  useEffect(() => {
    if (isAutoPlaying) {
      timerRef.current = setInterval(handleNext, 5000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isAutoPlaying])

  // Pause auto-play on interaction
  const pauseAutoPlay = () => {
    setIsAutoPlaying(false)
    if (timerRef.current) clearInterval(timerRef.current)
    // Resume after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section className="relative py-20 bg-black overflow-hidden min-h-[600px] flex flex-col justify-center">
      {/* Background Decorative Circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] border border-accent/40 rounded-full animate-pulse"></div>
        <div className="absolute w-[500px] h-[500px] md:w-[800px] md:h-[800px] border border-accent/20 rounded-full"></div>
        <div className="absolute w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] border border-accent/10 rounded-full animate-reverse-spin"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-orange-500 tracking-[0.2em] font-[family-name:var(--font-space-grotesk)] italic uppercase mb-2"
        >
          GALLERY
        </motion.h2>
        <div className="h-1 w-24 bg-accent/50 mx-auto rounded-full"></div>
      </div>

      <div className="relative w-full overflow-visible py-10 flex items-center justify-center">
        {/* Navigation Arrows */}
        <button 
          onClick={() => { handlePrev(); pauseAutoPlay(); }}
          className="absolute left-4 md:left-12 z-30 p-3 rounded-full border border-accent/30 bg-black/50 text-accent hover:bg-accent/20 transition-all hover:scale-110 active:scale-95 group"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>
        
        <button 
          onClick={() => { handleNext(); pauseAutoPlay(); }}
          className="absolute right-4 md:right-12 z-30 p-3 rounded-full border border-accent/30 bg-black/50 text-accent hover:bg-accent/20 transition-all hover:scale-110 active:scale-95 group"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* 3D Coverflow Container */}
        <div className="relative w-full max-w-4xl h-[400px] flex items-center justify-center perspective-1000 px-10">
          <AnimatePresence mode="popLayout">
            {images.map((img, index) => {
              // Calculate relative distance from current index
              let distance = index - currentIndex
              
              // Handle wrap-around math for the visual stack
              if (distance > Math.floor(images.length / 2)) distance -= images.length
              if (distance < -Math.floor(images.length / 2)) distance += images.length
              
              const isActive = distance === 0
              const absDist = Math.abs(distance)
              
              // Only render items within a certain distance for performance/visuals
              if (absDist > 2) return null

              return (
                <motion.div
                  key={index}
                  style={{ zIndex: 10 - absDist }}
                  initial={{ opacity: 0, scale: 0.5, rotateY: distance * 45 }}
                  animate={{ 
                    opacity: 1 - absDist * 0.3,
                    scale: 1 - absDist * 0.15,
                    x: distance * (windowWidth < 640 ? 120 : 250), // Responsive spacing
                    rotateY: distance * -45,
                    z: -absDist * 100,
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    opacity: { duration: 0.2 }
                  }}
                  className={`absolute rounded-2xl overflow-hidden cursor-pointer ${
                    isActive ? "shadow-[0_0_50px_rgba(255,122,24,0.4)]" : "grayscale-[50%] opacity-50"
                  } transition-all duration-300 border-2 ${
                    isActive ? "border-secondary" : "border-accent/10"
                  }`}
                  onClick={() => { setCurrentIndex(index); pauseAutoPlay(); }}
                >
                  <div className="relative w-[280px] h-[350px] md:w-[400px] md:h-[300px]">
                    <img 
                      src={img.url} 
                      alt={img.title} 
                      className={`w-full h-full object-cover transition-transform duration-500 ${isActive ? "scale-100" : "scale-110"}`}
                    />
                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 pt-10"
                      >
                        <p className="text-white font-bold text-center tracking-wider">{img.title}</p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
