"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// ─── Easing ───────────────────────────────────────────────────────────────────

/** Smooth S-curve: slow start → fast middle → slow end (cinematic feel) */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

/** Decelerating curve: fast start → slow end (used for blur clearance) */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

// ─── Hook: scroll progress within a sticky container ─────────────────────────

/**
 * Returns a ref whose `.current` is 0–1: how far the user has scrolled
 * through the sticky zone of the given container element.
 * Reading via a ref (not state) avoids re-renders on every scroll event.
 */
function useScrollProgress(containerRef: React.RefObject<HTMLDivElement>) {
  const progressRef = useRef(0)

  useEffect(() => {
    const update = () => {
      const el = containerRef.current
      if (!el) return

      // scrollable = total height minus one viewport (the sticky window)
      const scrollable = el.offsetHeight - window.innerHeight
      if (scrollable <= 0) return

      // rect.top is negative once we've scrolled past the container top
      const scrolled = -el.getBoundingClientRect().top
      progressRef.current = Math.max(0, Math.min(1, scrolled / scrollable))
    }

    window.addEventListener("scroll", update, { passive: true })
    update() // sync on mount
    return () => window.removeEventListener("scroll", update)
  }, [containerRef])

  return progressRef
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ParallaxHero() {
  const containerRef   = useRef<HTMLDivElement>(null)
  const imageRef       = useRef<HTMLDivElement>(null)   // zoom / translate target
  const overlayRef     = useRef<HTMLDivElement>(null)   // dark overlay
  const scrollHintRef  = useRef<HTMLDivElement>(null)   // "scroll" indicator
  const rafRef         = useRef<number | null>(null)

  const progressRef = useScrollProgress(containerRef as React.RefObject<HTMLDivElement>)

  // ── RAF animation loop ─────────────────────────────────────────────────────
  useEffect(() => {
    const tick = () => {
      const p      = progressRef.current
      const eased  = easeInOutCubic(p)   // for scale + translateY
      const eased2 = easeOutCubic(p)     // for blur clearance (clears faster)

      // ── Image: zoom-in + upward drift + subtle perspective pull ────────────
      if (imageRef.current) {
        const scale      = 1 + eased * 0.85        // 1.00 → 1.85
        const translateY = -(eased * 6)             // 0% → -6% (moves up)

        // blur starts at ~1.5 px and clears in the first ~33 % of scroll
        const blur = Math.max(0, 1.5 - eased2 * 4.5)

        // Transform-origin is slightly below center: as we zoom in, the
        // composition leans toward the fort gate, simulating forward motion.
        imageRef.current.style.transform =
          `scale(${scale.toFixed(4)}) translateY(${translateY.toFixed(3)}%)`
        imageRef.current.style.filter =
          blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : ""
      }

      // ── Overlay: fades from semi-dark → lighter as you "enter" the fort ───
      if (overlayRef.current) {
        const opacity = 0.55 - eased * 0.32   // 0.55 → 0.23
        overlayRef.current.style.opacity = opacity.toFixed(3)
      }

      // ── Scroll hint: fades out quickly once the user starts scrolling ──────
      if (scrollHintRef.current) {
        const opacity = Math.max(0, 1 - p * 5)
        scrollHintRef.current.style.opacity = opacity.toFixed(3)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [progressRef])

  return (
    /**
     * Outer scroll container — 200 vh gives ~100 vh of "sticky travel".
     * The extra height is what the user actually scrolls through while the
     * viewport appears frozen on the fort image.
     */
    <div ref={containerRef} className="relative h-[200vh] w-full bg-black">

      {/* ── Sticky viewport ─────────────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/*
          Image wrapper
          • will-change-transform → promotes to a GPU compositor layer so
            scale / translateY never trigger layout or paint.
          • transformOrigin at 50% 62%: zooming "into" the lower-mid fort gate
            feels more like walking through an archway than floating upward.
        */}
        <div
          ref={imageRef}
          className="absolute inset-0 will-change-transform"
          style={{ transformOrigin: "50% 62%" }}
        >
          <Image
            src="/fort.png"
            alt="Anokha Fort"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/*
          Primary dark overlay — opacity is animated in the RAF loop.
          Starting value matches the inline style so there's no flash.
        */}
        <div
          ref={overlayRef}
          className="absolute inset-0 pointer-events-none bg-black"
          style={{ opacity: 0.55 }}
        />

        {/*
          Static depth gradients — always on, purely decorative.
          Top vignette prevents bright sky from washing out the heading.
          Bottom gradient grounds the CTA buttons.
        */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/50 via-transparent to-black/75" />

        {/* ── Hero content ──────────────────────────────────────────────────── */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">

          {/* Sub-label */}
          <p className="mb-3 text-xs font-semibold tracking-[0.45em] uppercase text-red-400/75 drop-shadow-md sm:text-sm">
            THE OXFORD COLLEGE OF ENGINEERING
          </p>

          {/* Main title — fluid font size via clamp so it's mobile-safe */}
          <h1
            className="font-bold uppercase tracking-widest text-yellow-400 drop-shadow-[0_0_35px_rgba(250,204,21,0.85)]"
            style={{ fontSize: "clamp(3.5rem, 11vw, 10rem)" }}
          >
            ANOKHA
          </h1>

          {/* Tagline */}
          <p className="mt-5 text-base font-semibold tracking-[0.3em] uppercase text-white/70 drop-shadow-md sm:text-xl md:text-2xl">
            A NEW RHYTHM OF CELEBRATION
          </p>

          {/* Date badge */}
          <div className="mt-4 flex items-center gap-3 text-sm tracking-widest uppercase sm:text-base">
            <span className="text-yellow-400/85 font-semibold">THIS MAY</span>
            <span className="text-white/30">·</span>
            <span className="text-white/60">8TH &amp; 9TH</span>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 px-8 py-4 text-sm font-bold text-black transition-transform hover:scale-105 active:scale-95 sm:text-base"
            >
              Explore Events
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* ── Scroll indicator ─────────────────────────────────────────────── */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-white/50"
        >
          <span className="text-[0.6rem] tracking-[0.35em] uppercase">Scroll</span>
          {/* Animated pulse line */}
          <div className="h-10 w-px animate-pulse bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </div>
    </div>
  )
}
