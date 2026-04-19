"use client"

/*
  HeroTitle — SVG-based "ANOKHA 2026" hero section.

  Why SVG instead of raw HTML text?
  • Full control over every stroke, fill, gradient and filter.
  • Scales infinitely without blurring (vector).
  • Lets us hand-code decorative paths (shirorekha bar, ornaments, rule lines)
    that sit perfectly relative to the letterforms at any viewport width.
  • stroke-dasharray animations work natively on SVG paths — impossible on HTML text.
*/

export function HeroTitle() {
  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#050816]">

      {/* ── Background atmosphere ─────────────────────────────────────────── */}
      {/* Warm golden radial glow centered behind the title */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_50%,rgba(250,204,21,0.07),transparent)]" />
      {/* Faint top-to-bottom vignette so page sections below blend cleanly */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

      {/* ── SVG title ────────────────────────────────────────────────────── */}
      {/*
        viewBox="0 0 900 310"
          • 900 units wide  → letter positions chosen around cx = 450
          • 310 units tall  → top bar at y≈48, ANOKHA baseline at y≈200,
                              "2026" baseline at y≈268, bottom rule at y≈292
        The SVG is fluid: w-full + max-w-5xl makes it fill its container
        while preserving aspect ratio on all screen sizes.
      */}
      <svg
        viewBox="0 0 900 310"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-5xl px-4"
        role="img"
        aria-label="ANOKHA 2026"
        style={{
          animation: "svgEntrance 1.1s cubic-bezier(0.16,1,0.3,1) forwards",
          opacity: 0,
          transform: "translateY(28px)",
        }}
      >
        <defs>
          {/* ── Gradients ─────────────────────────────────────────────── */}

          {/* Main gold gradient across the full title width */}
          <linearGradient id="goldText" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#b45309" />
            <stop offset="25%"  stopColor="#f59e0b" />
            <stop offset="50%"  stopColor="#fef08a" />
            <stop offset="75%"  stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          {/* Muted gold for "2026" and secondary elements */}
          <linearGradient id="goldMuted" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="rgba(180,83,9,0.7)"  />
            <stop offset="50%"  stopColor="rgba(253,230,138,0.85)" />
            <stop offset="100%" stopColor="rgba(180,83,9,0.7)"  />
          </linearGradient>

          {/*
            Shirorekha (header bar) gradient:
            fades to transparent at both ends so the bar appears to "emerge"
            from within the letterforms rather than floating arbitrarily.
          */}
          <linearGradient id="barGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="rgba(245,158,11,0)"    />
            <stop offset="10%"  stopColor="#fbbf24"               />
            <stop offset="50%"  stopColor="#fef08a"               />
            <stop offset="90%"  stopColor="#fbbf24"               />
            <stop offset="100%" stopColor="rgba(245,158,11,0)"    />
          </linearGradient>

          {/* Accent / rule line gradient */}
          <linearGradient id="ruleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="rgba(251,191,36,0)"    />
            <stop offset="30%"  stopColor="rgba(251,191,36,0.4)"  />
            <stop offset="70%"  stopColor="rgba(251,191,36,0.4)"  />
            <stop offset="100%" stopColor="rgba(251,191,36,0)"    />
          </linearGradient>

          {/* ── Filters ───────────────────────────────────────────────── */}

          {/* Soft outer glow on the text */}
          <filter id="textGlow" x="-8%" y="-8%" width="116%" height="116%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Stronger glow for the bar and ornaments */}
          <filter id="barGlow" x="-15%" y="-80%" width="130%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Shimmer animation clip path for hover effect */}
          <clipPath id="textClip">
            <text
              x="450" y="200"
              textAnchor="middle"
              fontFamily="var(--font-yatra),'Yatra One',serif"
              fontSize="158"
              letterSpacing="5"
            >
              ANOKHA
            </text>
          </clipPath>
        </defs>

        {/* ══════════════════════════════════════════════════════════════════
            LAYER 1 — ANOKHA main title text

            Two overlapping <text> elements:
            a) fill layer    — gold gradient + glow filter
            b) outline layer — thin bright stroke for crisp edge definition

            fontFamily references the CSS variable injected by next/font
            in layout.tsx (Yatra One — the Devanagari-inspired Google Font
            that matches the screenshot style).
        ══════════════════════════════════════════════════════════════════ */}

        {/* (a) Fill layer */}
        <text
          x="450"
          y="200"
          textAnchor="middle"
          fontFamily="var(--font-yatra),'Yatra One',serif"
          fontSize="158"
          letterSpacing="5"
          fill="url(#goldText)"
          filter="url(#textGlow)"
          style={{ animation: "textFadeIn 1s 0.25s both" }}
        >
          ANOKHA
        </text>

        {/* (b) Outline layer — adds a razor-thin rim that catches light */}
        <text
          x="450"
          y="200"
          textAnchor="middle"
          fontFamily="var(--font-yatra),'Yatra One',serif"
          fontSize="158"
          letterSpacing="5"
          fill="none"
          stroke="rgba(254,240,138,0.30)"
          strokeWidth="0.6"
          style={{ animation: "textFadeIn 1s 0.35s both" }}
        >
          ANOKHA
        </text>

        {/* Shimmer sweep on hover — a bright highlight band that sweeps L→R */}
        <rect
          x="-900" y="60" width="300" height="160"
          fill="rgba(255,255,255,0.08)"
          clipPath="url(#textClip)"
          className="group-hover:animate-shimmer"
          style={{ animation: "shimmer 4s 2s infinite" }}
        />

        {/* ══════════════════════════════════════════════════════════════════
            LAYER 2 — "2026" sub-title

            Smaller, muted, wide letter-spacing for balanced hierarchy.
        ══════════════════════════════════════════════════════════════════ */}
        <text
          x="450"
          y="268"
          textAnchor="middle"
          fontFamily="var(--font-yatra),'Yatra One',serif"
          fontSize="46"
          letterSpacing="28"
          fill="url(#goldMuted)"
          style={{ animation: "textFadeIn 1s 0.55s both" }}
        >
          {/* Extra leading space compensates for letterSpacing pushing the
              text rightward (letterSpacing is applied AFTER each glyph,
              including the last one). */}
          {" "}2026
        </text>

        {/* ══════════════════════════════════════════════════════════════════
            LAYER 3 — Custom SVG paths (the "hand-designed" elements)

            These are genuine hand-coded SVG <path> and <circle> nodes —
            NOT generated by any font engine.

            3a. Primary shirorekha bar (thick)
                Inspired by the Devanagari headline that connects letters.
                Drawn with a stroke-dasharray animation so it appears to
                write itself across the viewport on load.

            3b. Secondary accent bar (thin, slightly lower)
                Gives the double-rule effect seen in classical Indian print.

            3c. Left + right diamond ornaments
                Traditional Indian design motif. Appear after the bars finish
                drawing via a delayed animation.

            3d. Horizontal separator rule around "2026"
                Two short lines flanking the year, a common identity device
                in Indian festival branding.

            3e. Centre dot — sits between ANOKHA and 2026.
        ══════════════════════════════════════════════════════════════════ */}

        {/* 3a — Primary shirorekha bar ──────────────────────────────────── */}
        {/*
          Path: straight horizontal line from x=65 to x=835 at y=47.
          y=47 places the bar just above where Yatra One renders its own
          internal shirorekha, creating a bold double-line header.
          The gradient makes it fade into the background at both ends.
          stroke-dasharray = total path length; animating dashoffset to 0
          makes the line appear to draw itself.
        */}
        <path
          d="M 65 47 L 835 47"
          stroke="url(#barGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#barGlow)"
          style={{
            strokeDasharray: 770,
            strokeDashoffset: 770,
            animation: "drawBar 1.4s 0.4s cubic-bezier(0.16,1,0.3,1) forwards",
          }}
        />

        {/* 3b — Secondary accent bar (thinner, offset slightly below) ───── */}
        <path
          d="M 110 54 L 790 54"
          stroke="rgba(251,191,36,0.28)"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: 680,
            strokeDashoffset: 680,
            animation: "drawBar 1.4s 0.55s cubic-bezier(0.16,1,0.3,1) forwards",
          }}
        />

        {/* 3c — Left diamond ornament ───────────────────────────────────── */}
        {/*
          Hand-coded rhombus path: four cardinal points around (55, 47).
          Width=16, height=14 gives a slightly landscape diamond to match
          the wide proportions of the horizontal bar.
        */}
        <path
          d="M 55 40 L 63 47 L 55 54 L 47 47 Z"
          fill="#fbbf24"
          filter="url(#barGlow)"
          style={{ animation: "ornamentPop 0.5s 1.7s cubic-bezier(0.34,1.56,0.64,1) both" }}
        />
        {/* Inner highlight dot */}
        <circle cx="55" cy="47" r="2" fill="#fef08a"
          style={{ animation: "ornamentPop 0.5s 1.75s both" }} />

        {/* 3c — Right diamond ornament ──────────────────────────────────── */}
        <path
          d="M 845 40 L 853 47 L 845 54 L 837 47 Z"
          fill="#fbbf24"
          filter="url(#barGlow)"
          style={{ animation: "ornamentPop 0.5s 1.7s cubic-bezier(0.34,1.56,0.64,1) both" }}
        />
        <circle cx="845" cy="47" r="2" fill="#fef08a"
          style={{ animation: "ornamentPop 0.5s 1.75s both" }} />

        {/* 3d — Short horizontal rules flanking "2026" ─────────────────── */}
        {/*
          Two symmetrical lines at y=237 (between the two text baselines).
          They grow outward from the center with a delayed draw animation.
        */}
        <path
          d="M 180 237 L 340 237"
          stroke="url(#ruleGrad)"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: 160,
            strokeDashoffset: 160,
            animation: "drawBar 0.9s 0.9s ease-out forwards",
          }}
        />
        <path
          d="M 560 237 L 720 237"
          stroke="url(#ruleGrad)"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: 160,
            strokeDashoffset: 160,
            animation: "drawBar 0.9s 0.9s ease-out forwards",
          }}
        />

        {/* 3e — Centre dot ──────────────────────────────────────────────── */}
        <circle
          cx="450" cy="237" r="3"
          fill="rgba(251,191,36,0.7)"
          style={{ animation: "ornamentPop 0.4s 1.0s both" }}
        />
        {/* Tiny flanking dots */}
        <circle cx="420" cy="237" r="1.5" fill="rgba(251,191,36,0.4)"
          style={{ animation: "ornamentPop 0.4s 1.1s both" }} />
        <circle cx="480" cy="237" r="1.5" fill="rgba(251,191,36,0.4)"
          style={{ animation: "ornamentPop 0.4s 1.1s both" }} />

        {/* 3f — Bottom thin rule (full width) ──────────────────────────── */}
        <path
          d="M 120 293 L 780 293"
          stroke="url(#ruleGrad)"
          strokeWidth="0.75"
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: 660,
            strokeDashoffset: 660,
            animation: "drawBar 1s 1.1s ease-out forwards",
          }}
        />
      </svg>

      {/* ── Keyframes ────────────────────────────────────────────────────── */}
      <style>{`
        /* Whole SVG slides up and fades in */
        @keyframes svgEntrance {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Individual text layers fade in */
        @keyframes textFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* Bar draws itself by animating stroke-dashoffset to 0 */
        @keyframes drawBar {
          to { stroke-dashoffset: 0; }
        }

        /* Ornaments scale up from nothing with a spring overshoot */
        @keyframes ornamentPop {
          from { opacity: 0; transform: scale(0); }
          to   { opacity: 1; transform: scale(1); }
        }

        /* Shimmer band sweeps across the text */
        @keyframes shimmer {
          0%   { transform: translateX(0); }
          100% { transform: translateX(1800px); }
        }
      `}</style>
    </section>
  )
}
