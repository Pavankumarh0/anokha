"use client"

import Link from "next/link"
import { ArrowRight, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowUpRight } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-black pt-16 pb-12 overflow-hidden border-t border-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Left - Large Graphic Graphic */}
          <div className="flex justify-center lg:justify-start w-full">
            <img 
              src="/toce.png" 
              alt="The Oxford College of Engineering" 
              className="w-full max-w-lg h-auto object-contain" 
            />
          </div>

          {/* Right - Contact Information */}
          <div className="flex flex-col gap-10">
            {/* Headers */}
            <div>
              <h2 className="text-4xl md:text-5xl font-normal text-white mb-2 tracking-wide font-[family-name:var(--font-space-grotesk)]">
                REACH OUT TO US!
              </h2>
              <p className="text-muted-foreground text-sm">
                Feel free to reach out to us if you have any queries
              </p>
            </div>

            {/* Email link */}
            <a href="mailto:info@theoxford.edu" className="inline-flex items-center gap-2 text-xl font-medium hover:text-accent transition-colors w-fit text-white">
              info@theoxford.edu <ArrowRight className="w-5 h-5" />
            </a>

            {/* Student Coordinators Box */}
            <div className="rounded-xl border border-yellow-400/30 bg-yellow-400/5 p-5">
              <h4 className="font-bold text-yellow-400 mb-4 uppercase text-xs tracking-widest">STUDENT COORDINATORS</h4>
              <div className="flex flex-col gap-4">
                <a href="tel:8310417276" className="flex items-center gap-3 group">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400/10 border border-yellow-400/30 shrink-0 group-hover:bg-yellow-400/20 transition-colors">
                    <Phone className="w-3.5 h-3.5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">Jeevan</p>
                    <p className="text-muted-foreground text-xs tracking-wider">83104 17276</p>
                  </div>
                </a>
                <a href="tel:8618776781" className="flex items-center gap-3 group">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400/10 border border-yellow-400/30 shrink-0 group-hover:bg-yellow-400/20 transition-colors">
                    <Phone className="w-3.5 h-3.5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">Tarun Anand</p>
                    <p className="text-muted-foreground text-xs tracking-wider">86187 76781</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Two column layout for Address and Socials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 mt-2">
              {/* Address */}
              <div>
                <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-widest">OUR ADDRESS</h4>
                <div className="text-muted-foreground text-sm space-y-1">
                  <p className="flex items-center gap-2">
                    The Oxford College of Engineering <MapPin className="w-3 h-3" />
                  </p>
                  <p>10th Milestone, Bommanahalli</p>
                  <p>Hosur Road</p>
                  <p>Bengaluru - 560 068</p>
                  <p>Karnataka, India</p>
                </div>
              </div>

              {/* Follow Us */}
              <div>
                <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-widest">FOLLOW US</h4>
                <div className="flex gap-4 mb-6 text-muted-foreground">
                  <a href="#" className="hover:text-white transition-colors"><Facebook className="w-4 h-4" /></a>
                  <a href="#" className="hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
                  <a href="#" className="hover:text-white transition-colors"><Instagram className="w-4 h-4" /></a>
                  <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
                  <a href="#" className="hover:text-white transition-colors"><Youtube className="w-4 h-4" /></a>
                </div>
                <a href="http://www.theoxford.edu" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-white uppercase tracking-wider font-medium">
                  THEOXFORD.EDU <ArrowUpRight className="w-4 h-4 text-xs" />
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-3 mt-8">
              <Link href="/" className="text-muted-foreground hover:text-white text-sm tracking-wider uppercase">HOME</Link>
              <Link href="#team" className="text-muted-foreground hover:text-white text-sm tracking-wider uppercase">TEAM</Link>
              <Link href="#" className="text-muted-foreground hover:text-white text-sm tracking-wider uppercase">TERMS & CONDITIONS</Link>
            </nav>
          </div>
          
        </div>
      </div>
      {/* Developer Credit */}
      <div className="border-t border-white/5 mt-12 pt-6 text-center text-xs text-muted-foreground/50">
        <p>
          Made with ❤️ by{" "}
          <a
            href="https://www.instagram.com/pavankumarh0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-white transition-colors inline-flex items-center gap-1"
          >
            <Instagram className="w-3 h-3" /> Pavan Kumar H
          </a>
        </p>
      </div>
    </footer>
  )
}
