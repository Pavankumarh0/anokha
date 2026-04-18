import { Navbar } from "@/components/navbar"
import { Particles } from "@/components/particles"
import { Hero } from "@/components/hero"
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
      {/* Particle starfield background */}
      <Particles />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

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
