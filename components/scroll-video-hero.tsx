"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function ScrollVideoHero() {
  const containerRef  = useRef<HTMLDivElement>(null)
  const videoRef      = useRef<HTMLVideoElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video     = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    // targetTime: where the video SHOULD be (set by scroll)
    // video.currentTime: where it IS (smoothly chased by RAF)
    let targetTime  = 0
    let rafId: number
    let isReady     = false

    // Mark video as seekable once it has enough metadata
    const onLoaded = () => { isReady = true }
    video.addEventListener("loadedmetadata", onLoaded)
    if (video.readyState >= 1) isReady = true

    // ── RAF scrubbing loop ─────────────────────────────────────────────────
    // We lerp currentTime toward targetTime every frame.
    // LERP = 0.2 → ~89 % of the gap closed in 10 frames (~167 ms at 60fps).
    // This feels instantaneous to users but smooths over frame-rate jitter.
    const LERP = 0.2

    const tick = () => {
      if (isReady && video.duration) {
        const diff = targetTime - video.currentTime
        // Skip the write if difference is sub-millisecond — prevents
        // browsers from queuing seek operations on an already-settled video.
        if (Math.abs(diff) > 0.0005) {
          video.currentTime += diff * LERP
        }
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    // ── Scroll handler ────────────────────────────────────────────────────
    // Direct passive listener → zero overhead, no GSAP scrub delay.
    //
    //   progress = how far the user has scrolled through the sticky zone (0-1)
    //   targetTime = video.duration × progress
    //
    const onScroll = () => {
      const scrollable = container.offsetHeight - window.innerHeight
      if (scrollable <= 0) return

      const scrolled = -container.getBoundingClientRect().top
      const progress = Math.max(0, Math.min(1, scrolled / scrollable))

      if (video.duration) {
        targetTime = video.duration * progress
      }

      // Fade scroll hint out as soon as scrolling begins
      if (scrollHintRef.current) {
        scrollHintRef.current.style.opacity = String(
          Math.max(0, 1 - progress * 12)
        )
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll() // sync on mount in case page loads mid-scroll

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", onScroll)
      video.removeEventListener("loadedmetadata", onLoaded)
    }
  }, [])

  return (
    // 200vh outer div → ~100vh of sticky scroll travel
    <div ref={containerRef} className="relative h-[200vh] w-full bg-black">

      {/* Sticky viewport — pinned while the outer div scrolls past */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/*
          muted + playsInline → required on all browsers/mobile for
          programmatic currentTime control without autoplay policy errors.
          preload="auto" → browser fetches full video upfront so
          seeking mid-clip never stalls waiting for data.
          No autoPlay — scroll is the only engine.
        */}
        <video
          ref={videoRef}
          src="/Fort_entrance_camera_202604191003.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Depth gradients — purely decorative, always on */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/55 via-transparent to-black/80" />

        {/* Hero content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">

          <p className="mb-3 text-xs font-semibold tracking-[0.45em] uppercase text-red-400/80 drop-shadow-md sm:text-sm">
            THE OXFORD COLLEGE OF ENGINEERING
          </p>

          <h1
            className="font-bold uppercase tracking-widest text-yellow-400 drop-shadow-[0_0_35px_rgba(250,204,21,0.85)]"
            style={{ fontSize: "clamp(3.5rem, 11vw, 10rem)" }}
          >
            ANOKHA
          </h1>

          <p className="mt-5 text-base font-semibold tracking-[0.3em] uppercase text-white/70 drop-shadow-md sm:text-xl md:text-2xl">
            A NEW RHYTHM OF CELEBRATION
          </p>

          <div className="mt-4 flex items-center gap-3 text-sm tracking-widest uppercase sm:text-base">
            <span className="text-yellow-400/85 font-semibold">THIS MAY</span>
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

        {/* Scroll indicator */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-white/50"
        >
          <span className="text-[0.6rem] tracking-[0.35em] uppercase">Scroll</span>
          <div className="h-10 w-px animate-pulse bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </div>
    </div>
  )
}
