'use client'
import Image from 'next/image'
import { ASSETS } from '@/lib/assets'

interface CardRevealResultProps {
  reading: string
  onFollowUp: (question: string) => void
  onViewReading?: () => void
}

const FOLLOW_UPS = [
  'What should I do instead?',
  'How do I move through this confusion?',
  'Does it mean an impact on career?',
]

export default function CardRevealResult({ onFollowUp, onViewReading }: CardRevealResultProps) {
  return (
    <div className="flex flex-col gap-[12px] w-full msg-in">
      {/* Compact TarotReadingCard */}
      <button
        onClick={onViewReading}
        className="relative overflow-hidden rounded-[8px] w-full text-left active:opacity-80 transition-opacity"
        style={{ height: 84, backgroundColor: '#372e6a', display: 'block' }}
      >
        {/* Left blob */}
        <div className="absolute" style={{ left: -15, top: -20, width: 130, height: 130 }}>
          <div className="absolute" style={{ inset: '-38.46%' }}>
            <Image src={ASSETS.ellipse51} alt="" fill unoptimized className="object-contain" />
          </div>
        </div>
        {/* Right blob */}
        <div className="absolute" style={{ left: 256, top: -20, width: 137, height: 116 }}>
          <Image src={ASSETS.ellipse52} alt="" fill unoptimized className="object-contain" />
        </div>
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(2,2,2,0.27)' }} />
        {/* Moon thumbnail */}
        <div className="absolute" style={{ left: 8, top: 8, width: 74, height: 111 }}>
          <Image src={ASSETS.moonCard} alt="Moon card" fill unoptimized className="object-cover" style={{ borderRadius: 4 }} />
        </div>
        {/* Text */}
        <div
          className="absolute flex flex-col gap-[8px]"
          style={{ left: 102, top: '50%', transform: 'translateY(-50%)', width: 118 }}
        >
          <p
            className="font-roboto font-normal text-white m-0"
            style={{ fontSize: 14, letterSpacing: '-0.7px', lineHeight: 1, fontVariationSettings: "'wdth' 100" }}
          >
            The Moon says no
          </p>
          <p
            className="font-roboto font-normal m-0"
            style={{ fontSize: 12, color: 'rgba(255,255,255,0.49)', letterSpacing: '-0.36px', fontVariationSettings: "'wdth' 100" }}
          >
            There is confusion, illusion, or hidden...
          </p>
        </div>
        {/* View Reading button */}
        <div
          className="absolute flex items-center justify-center px-[14px] py-[8px] rounded-[4px]"
          style={{ right: 12, top: '50%', transform: 'translateY(-50%)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          <p
            className="font-roboto font-normal text-white m-0 whitespace-nowrap"
            style={{ fontSize: 13, letterSpacing: '-0.42px', fontVariationSettings: "'wdth' 100" }}
          >
            View Reading
          </p>
        </div>
      </button>

      {/* Follow-up questions */}
      <div className="flex flex-col gap-[8px]">
        {FOLLOW_UPS.map((q) => (
          <button
            key={q}
            onClick={() => onFollowUp(q)}
            className="text-left font-roboto text-[16px] hover:opacity-80 transition-opacity flex items-center gap-[4px]"
            style={{ color: 'rgba(180,160,255,0.85)', letterSpacing: '-0.48px', fontVariationSettings: "'wdth' 100" }}
          >
            <span style={{ fontSize: 18 }}>↗</span> {q}
          </button>
        ))}
      </div>
    </div>
  )
}
