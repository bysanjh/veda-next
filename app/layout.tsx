import type { Metadata, Viewport } from 'next'
import { Roboto, Khand, DM_Sans } from 'next/font/google'
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

const dmSans = DM_Sans({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
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
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${khand.variable} ${dmSans.variable}`}>
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '402px',
            height: '100dvh',
            overflow: 'hidden',
            background: '#0a0c1a',
          }}
        >
          {children}
        </div>
      </body>
    </html>
  )
}
