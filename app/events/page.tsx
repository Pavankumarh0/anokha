import { Navbar } from "@/components/navbar"
import { Particles } from "@/components/particles"
import { Events } from "@/components/events"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function EventsPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-clip">
      {/* Particle starfield background */}
      <Particles />

      {/* Navigation */}
      <Navbar />

      {/* Main Events Section with extra padding for the fixed navbar */}
      <div className="pt-20">
        <Events />
      </div>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </main>
  )
}
