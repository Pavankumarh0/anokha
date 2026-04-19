import { Navbar } from "@/components/navbar"
import { SmoothScrollVideoHero } from "@/components/smooth-scroll-video-hero"
import { About } from "@/components/about"
import { AboutCollege } from "@/components/about-college"
import { Prizes } from "@/components/prizes"
import { Gallery } from "@/components/gallery"
import { Countdown } from "@/components/countdown"
import { Team } from "@/components/team"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-clip">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <SmoothScrollVideoHero />

      {/* About Section */}
      <About />

      {/* About College Section */}
      <AboutCollege />

      {/* Prizes Section */}
      <Prizes />

      {/* Gallery Section */}
      <Gallery />

      {/* Countdown & Register Section */}
      <Countdown />

      {/* Team Section */}
      <Team />

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </main>
  )
}
