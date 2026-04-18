"use client"

import Link from "next/link"
import { ArrowRight, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowUpRight } from "lucide-react"

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
    </footer>
  )
}
