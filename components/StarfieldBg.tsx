'use client'
import Image from 'next/image'
import { ASSETS } from '@/lib/assets'

export default function StarfieldBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Starfield image */}
      <div className="absolute inset-0">
        <Image
          src={ASSETS.starfield}
          alt=""
          fill
          className="object-cover object-center"
          unoptimized
          priority
        />
      </div>
      {/* Dark gradient overlay — matches Figma: hard-light blend */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(99.75deg, rgba(12, 19, 37, 0.9) 13.9%, rgba(31, 31, 31, 0.9) 95.3%)',
          mixBlendMode: 'hard-light',
        }}
      />
      {/* Edge vignettes */}
      <div
        className="absolute top-0 left-0 right-0 opacity-80"
        style={{
          height: '172px',
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.78), rgba(0,0,0,0))',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 opacity-80"
        style={{
          height: '172px',
          backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.78), rgba(0,0,0,0))',
        }}
      />
      <div
        className="absolute top-0 bottom-0 left-0 opacity-80"
        style={{
          width: '80px',
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.78), rgba(0,0,0,0))',
        }}
      />
      <div
        className="absolute top-0 bottom-0 right-0 opacity-80"
        style={{
          width: '80px',
          backgroundImage: 'linear-gradient(to left, rgba(0,0,0,0.78), rgba(0,0,0,0))',
        }}
      />
    </div>
  )
}
