import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

const eventPosters: Record<string, { title: string; desc: string; poster: string }> = {
  "EVT-01": { title: "Watt's the Link?", desc: "Electrical connections challenge", poster: "/event_posters/watts the link.jpeg" },
  "EVT-02": { title: "Hunt.exe", desc: "Cyber treasure hunt", poster: "/event_posters/Hunt.exe.jpg" },
  "EVT-03": { title: "DevKreeda: The Game Jam", desc: "Build a game in 24hrs", poster: "/event_posters/dev kreeda.jpeg" },
  "EVT-04": { title: "MindRush", desc: "Technical quiz showdown", poster: "/event_posters/mind rush.jpeg" },
  "EVT-05": { title: "Startup Battlefront", desc: "Pitch your startup idea", poster: "/event_posters/startup battlefront.jpg" },
  "EVT-06": { title: "Rana Yantram", desc: "Robot football war", poster: "/event_posters/ranayantra.png" },
  "EVT-07": { title: "KALPANA – App Prototype", desc: "Design the next big app", poster: "/event_posters/kalpana1.png" },
  "EVT-08": { title: "Chain of Minds", desc: "Collaborative problem solving", poster: "/event_posters/chain of minds1.jpeg" },
  "EVT-09": { title: "Green Pitch", desc: "Build and showcase your bot", poster: "/event_posters/green pitch.jpeg" },
  "EVT-10": { title: "Poster Presentation", desc: "Present your research", poster: "/event_posters/poster_presentation.jpeg" },
  "EVT-11": { title: "Reverse Engineering", desc: "Tear it apart, understand it", poster: "/event_posters/reverse-engineering.jpg" },
  "NTE-01": { title: "Sense & Surprise", desc: "Mystery challenge", poster: "/event_posters/sense and suprise.jpeg" },
  "NTE-02": { title: "The End Game", desc: "Ultimate strategy showdown", poster: "/event_posters/the endgame.jpeg" },
  "NTE-03": { title: "KshanaCinema – Short Film", desc: "60-second story", poster: "/event_posters/kshana-cinim a.jpeg" },
  "NTE-04": { title: "Decepta: Trust Nothing", desc: "Deception game", poster: "/event_posters/decepta- trust nothing.jpeg" },
  "NTE-05": { title: "Mukha-Nakha", desc: "Face painting - wearable art", poster: "/event_posters/mukha-nakha.jpg" },
  "NTE-06": { title: "Galactic Gambit", desc: "Space strategy game", poster: "/event_posters/Galactic Gambit .png" },
  "NTE-07": { title: "Mafia: Trust No One", desc: "Social deduction", poster: "/event_posters/trsut-no-one.jpeg" },
  "NTE-08": { title: "Logo Designing", desc: "Brand it in 90 mins", poster: "/event_posters/ecoemblem.jpeg" },
  "NTE-09": { title: "Photography", desc: "Capture the moment", poster: "/event_posters/photography.png" },
  "NTE-10": { title: "Hasya-Krida", desc: "Roast the crowd", poster: "/event_posters/hasya-krida1.png" },
  "NTE-11": { title: "Vyuha Sphere: Debate", desc: "Argue your truth", poster: "/event_posters/vuya sphere.png" },
  "NTE-12": { title: "Painting", desc: "Canvas storytelling", poster: "/event_posters/painting.png" },
}

export default async function EventPosterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = eventPosters[id]
  if (!event) notFound()

  return (
    <main className="min-h-screen bg-[#0A0F1E] flex items-center justify-center px-4">
      {/* Back button */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold backdrop-blur-md border border-white/10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Link>
      </div>

      <Image
        src={event.poster}
        alt={event.title}
        width={600}
        height={900}
        className="max-h-[90vh] w-auto object-contain"
        priority
      />
    </main>
  )
}
