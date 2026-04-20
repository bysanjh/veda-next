'use client'
import Image from 'next/image'
import { ASSETS } from '@/lib/assets'

export default function Header() {
  return (
    <div
      className="absolute top-0 left-0 right-0 z-20 h-[101px]"
      style={{ backgroundColor: '#101010', borderBottom: '1.072px solid rgba(255,255,255,0.2)' }}
    >
      {/* Logo row */}
      <div className="absolute flex items-center gap-[8.576px] left-[17px] top-[45px] h-[42.88px]">
        <div className="relative w-[42.88px] h-[42.88px] shrink-0">
          <Image
            src={ASSETS.logoBadge}
            alt="Astrology.com logo badge"
            fill
            className="object-contain"
            unoptimized
          />
        </div>
        <div className="flex items-baseline">
          <span
            className="font-khand font-medium text-white uppercase whitespace-nowrap"
            style={{ fontSize: '25.728px', letterSpacing: '1.029px' }}
          >
            Astrology
          </span>
          <span
            className="font-khand font-light text-white"
            style={{ fontSize: '25.728px', letterSpacing: '0.64px' }}
          >
            .com
          </span>
        </div>
      </div>
    </div>
  )
}
