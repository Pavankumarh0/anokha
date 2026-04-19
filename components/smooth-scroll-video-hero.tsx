"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// ─── Why interpolation instead of direct assignment? ──────────────────────────
//
//  If we wrote:  video.currentTime = targetTime
//  then a fast scroll wheel spin would instantly jump the video several
//  seconds forward — jarring, un-cinematic, and causes browser seek stutter.
//
//  Instead we lerp each animation frame:
//    currentTime += (targetTime - currentTime) × EASE
//
//  At EASE = 0.05 the video closes 5 % of the remaining gap every frame.
//  At 60 fps a 1-second gap takes ~45 frames (~750 ms) to fully close.
//  The user can spin the scroll wheel as fast as they like; the video always
//  glides smoothly toward the target rather than snapping.
//
// ─────────────────────────────────────────────────────────────────────────────

// Lerp factor — 0.10 means "close 10 % of the remaining gap each frame".
// Combined with MAX_STEP this keeps the video moving slowly and steadily
// even when the user scrolls in a single fast swipe.
const EASE = 0.10

// Hard speed cap: maximum seconds the video may advance in one frame.
// 0.10 / 60 ≈ 0.00167 s/frame → video plays at ≤ 0.10× real-time (10 % speed).
// No matter how far scroll jumps, currentTime can only move this much per tick.
const MAX_STEP = 0.10 / 60

// Threshold below which we stop writing currentTime to avoid redundant
// seek operations on an already-settled video element.
const SETTLE_THRESHOLD = 0.0005

export function SmoothScrollVideoHero() {
  const containerRef   = useRef<HTMLDivElement>(null)
  const videoRef       = useRef<HTMLVideoElement>(null)
  const scrollHintRef  = useRef<HTMLDivElement>(null)
  const overlayRef     = useRef<HTMLDivElement>(null)

  // Refs instead of state → zero re-renders on every scroll/frame tick
  const targetTimeRef    = useRef(0)   // where video SHOULD be (from scroll)
  const isReadyRef       = useRef(false)
  const rafRef           = useRef<number | null>(null)

  useEffect(() => {
    const video     = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    // ── 1. Detect when video metadata is loaded ───────────────────────────
    // We must have video.duration before we can map scroll → time.
    const onMeta = () => { isReadyRef.current = true }
    video.addEventListener("loadedmetadata", onMeta)
    if (video.readyState >= 1) isReadyRef.current = true

    // ── 2. Scroll handler — ONLY updates targetTime (never currentTime) ───
    //
    //  We measure progress relative to the sticky container so the hero
    //  occupies exactly its own 200vh slot, independent of other page sections.
    //
    //  progress = scrolled-into-container / scrollable-height  (0 → 1)
    //  targetTime = video.duration × progress
    //
    const onScroll = () => {
      const scrollable = container.offsetHeight - window.innerHeight
      if (scrollable <= 0) return

      const scrolled   = -container.getBoundingClientRect().top
      const progress   = Math.max(0, Math.min(1, scrolled / scrollable))

      if (isReadyRef.current && video.duration) {
        targetTimeRef.current = video.duration * progress
      }

      // Scroll-hint: fade out quickly once scrolling starts
      if (scrollHintRef.current) {
        scrollHintRef.current.style.opacity =
          String(Math.max(0, 1 - progress * 14))
      }

      // Dark overlay: lightens as we move deeper into the video
      // 0.55 → 0.20 over full scroll range
      if (overlayRef.current) {
        overlayRef.current.style.opacity =
          String((0.55 - progress * 0.35).toFixed(3))
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll() // sync immediately in case page loads mid-scroll

    // ── 3. RAF animation loop — the ONLY place currentTime is written ─────
    //
    //  Each frame we interpolate by EASE (5 %) toward targetTime.
    //  This decouples the video's movement from the scroll speed:
    //  no matter how fast the user scrolls, the video always glides.
    //
    const tick = () => {
      if (isReadyRef.current && video.duration) {
        const target  = targetTimeRef.current
        const current = video.currentTime
        const diff    = target - current

        if (Math.abs(diff) > SETTLE_THRESHOLD) {
          // Step = lerp toward target, then hard-cap at MAX_STEP.
          // The cap ensures fast scrolling never makes the video jump —
          // it can only ever advance at ≤ 0.10× real-time speed.
          const rawStep    = diff * EASE
          const cappedStep = Math.sign(rawStep) * Math.min(Math.abs(rawStep), MAX_STEP)
          video.currentTime = Math.max(0, Math.min(video.duration, current + cappedStep))
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("scroll", onScroll)
      video.removeEventListener("loadedmetadata", onMeta)
    }
  }, [])

  return (
    // 200vh outer div — the extra 100vh is the scroll distance the user
    // travels while the sticky inner div keeps the video locked on-screen.
    <div ref={containerRef} className="relative h-[200vh] w-full bg-black">

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/*
          Video:
          • muted + playsInline → browser allows currentTime writes on mobile
            and desktop without requiring a user gesture first
          • preload="auto" → browser fetches the whole file so seeking any
            timestamp never stalls waiting for network data
          • No autoPlay, no play(), no pause() — scroll is the only engine
        */}
        <video
          ref={videoRef}
          src="/Fort_entrance_camera_202604191003.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/*
          Dark overlay — opacity animated in the scroll handler.
          Starts at 0.55 (moody/dark) and fades to 0.20 as you scroll deeper,
          giving the feeling of "entering" the lit interior of the fort.
          Initial inline style matches the JS starting value to avoid a flash.
        */}
        <div
          ref={overlayRef}
          className="absolute inset-0 pointer-events-none bg-black"
          style={{ opacity: 0.55 }}
        />

        {/* Static depth gradient — top vignette + bottom ground shadow */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/50 via-transparent to-black/75" />

        {/* ── Hero content ──────────────────────────────────────────────── */}
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

        {/* Scroll indicator — fades out as soon as scrolling begins */}
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
