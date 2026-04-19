"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function SmoothScrollVideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onReady = () => {
      video.playbackRate = 1
      video.play().catch(() => {
        // Autoplay blocked (rare with muted video) — retry on first interaction
        const retry = () => { video.play(); document.removeEventListener("click", retry) }
        document.addEventListener("click", retry, { once: true })
      })
    }

    // Fire as soon as metadata is available; if already loaded, call directly
    if (video.readyState >= 1) {
      onReady()
    } else {
      video.addEventListener("loadedmetadata", onReady, { once: true })
    }

    return () => { video.pause() }
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">

      {/* Video — muted + playsInline required for autoplay on all browsers */}
      <video
        ref={videoRef}
        src="/Camera_movement_through_202604191055.mp4"
        muted
        playsInline
        loop
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Depth gradients */}
      <div className="absolute inset-0 pointer-events-none bg-black/40" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/50 via-transparent to-black/80" />

      {/* Hero content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">

        <p className="mb-6 text-base font-semibold tracking-[0.45em] uppercase text-red-400/80 drop-shadow-md sm:text-lg md:text-xl">
          THE OXFORD COLLEGE OF ENGINEERING
        </p>

        <h1
          className="font-[family-name:var(--font-yatra)] text-yellow-400 leading-none drop-shadow-[0_0_40px_rgba(250,204,21,0.55)]"
          style={{ fontSize: "clamp(3rem,12vw,110px)" }}
        >
          ANOKHA 2026
        </h1>

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
