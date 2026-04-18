import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Plus_Jakarta_Sans, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk'
})

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: '--font-plus-jakarta'
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: '--font-space-mono'
})

export const metadata: Metadata = {
  title: 'ANOKHA 2026 | A New Rhythm of Celebration',
  description: 'ANOKHA 2026 - The Oxford College of Engineering presents a dynamic 2-day intra-college tech fest bringing innovation, creativity and competition together. May 8 & 9, 2026.',
  keywords: ['ANOKHA', 'tech fest', 'Oxford College of Engineering', 'Bengaluru', '2026', 'technical events', 'hackathon'],
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#050816',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-[#050816] scroll-smooth">
      <body className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} ${spaceMono.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
