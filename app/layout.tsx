import type { Metadata, Viewport } from 'next'
import { Roboto, Khand } from 'next/font/google'
import './globals.css'

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
})

const khand = Khand({
  weight: ['300', '500'],
  subsets: ['latin'],
  variable: '--font-khand',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Veda — AI Astrology',
  description: 'Your daily spiritual guide',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${khand.variable} bg-[#0a0a12]`}>
        {children}
      </body>
    </html>
  )
}
