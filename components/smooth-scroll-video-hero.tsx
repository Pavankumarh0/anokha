"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function SmoothScrollVideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const play = () => {
      video.play().catch(() => {
        const retry = () => { video.play(); document.removeEventListener("click", retry) }
        document.addEventListener("click", retry, { once: true })
      })
    }

    const start = () => {
      video.preload = "auto"
      if (video.readyState >= 4) {
        play()
      } else {
        video.addEventListener("canplaythrough", play, { once: true })
        video.load()
      }
    }

    // Defer video loading until after page is interactive to avoid blocking main thread
    if (document.readyState === "complete") {
      start()
    } else {
      window.addEventListener("load", start, { once: true })
    }

    return () => {
      window.removeEventListener("load", start)
      video.pause()
    }
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">

      {/* Video — muted + playsInline required for autoplay on all browsers */}
      <video
        ref={videoRef}
        src="/Fort_entrance_camera_202604191003.mp4"
        muted
        playsInline
        loop
        preload="none"
        className="absolute inset-0 h-full w-full object-cover [will-change:transform] [transform:translateZ(0)]"
      />

      {/* Depth gradients */}
      <div className="absolute inset-0 pointer-events-none bg-black/40" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/50 via-transparent to-black/80" />

      {/* Hero content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">

        <p className="mb-6 text-base font-semibold tracking-[0.45em] uppercase text-red-400/80 drop-shadow-md sm:text-lg md:text-xl">
          THE OXFORD COLLEGE OF ENGINEERING
        </p>

        <Image
          src="/anokha.png"
          alt="ANOKHA 2026"
          width={600}
          height={180}
          className="drop-shadow-[0_0_40px_rgba(250,204,21,0.55)] w-[clamp(260px,55vw,600px)] h-auto"
          priority
        />

        <p className="mt-8 text-base font-semibold tracking-[0.3em] uppercase text-white/70 drop-shadow-md sm:text-xl md:text-2xl">
          A NEW RHYTHM OF CELEBRATION
        </p>

        <div className="mt-4 flex items-center gap-3 text-sm tracking-widest uppercase sm:text-base">
          <span className="font-semibold text-yellow-400/85">THIS MAY</span>
          <span className="text-white/30">·</span>
          <span className="text-white/60">8TH &amp; 9TH</span>
        </div>

        <div className="mt-10">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 px-8 py-4 text-sm font-bold text-black transition-transform hover:scale-105 active:scale-95 sm:text-base"
          >
            Explore Events
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
