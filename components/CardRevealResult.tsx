'use client'
import Image from 'next/image'
import { ASSETS } from '@/lib/assets'

interface CardRevealResultProps {
  reading: string
  onFollowUp: (question: string) => void
}

const FOLLOW_UPS = [
  'What should I do instead?',
  'How do I move through this confusion?',
  'Does it mean an impact on career?',
]

const TAGS = ['Confusion', 'Illusion', 'Hidden truth']

export default function CardRevealResult({ reading, onFollowUp }: CardRevealResultProps) {
  return (
    <div className="flex flex-col gap-[16px] w-full">
      {/* Ophelia says */}
      <div className="flex flex-col gap-[12px] items-start">
        <div className="relative w-[32px] h-[32px] shrink-0">
          <Image src={ASSETS.opheliaAvatarSmall} alt="Ophelia" fill unoptimized className="object-cover rounded-full" />
        </div>
        <p
          className="font-roboto font-normal text-white text-[18px] m-0"
          style={{ letterSpacing: '-0.54px', fontVariationSettings: "'wdth' 100" }}
        >
          You chose this card for a reason. Here&apos;s what it has to say...
        </p>
      </div>

      {/* Card result bar */}
      <div
        className="relative overflow-hidden rounded-[8px] w-full h-[84px]"
        style={{ backgroundColor: '#372e6a' }}
      >
        {/* Ellipses */}
        <div className="absolute" style={{ left: -15, top: -20, width: 130, height: 130 }}>
          <div className="absolute" style={{ inset: '-38.46%' }}>
            <Image src={ASSETS.ellipse51} alt="" fill unoptimized className="object-contain" />
          </div>
        </div>
        <div className="absolute" style={{ left: 256, top: -20, width: 137, height: 116 }}>
          <Image src={ASSETS.ellipse52} alt="" fill unoptimized className="object-contain" />
        </div>

        {/* Backdrop */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(2,2,2,0.27)' }} />

        {/* Moon card image */}
        <div className="absolute" style={{ left: 8, top: 8, width: 74, height: 111 }}>
          <Image src={ASSETS.moonCard} alt="Moon card" fill unoptimized className="object-cover" />
        </div>

        {/* Text */}
        <div
          className="absolute flex flex-col gap-[8px]"
          style={{ left: 102, top: '50%', transform: 'translateY(-50%)', width: 118 }}
        >
          <p
            className="font-roboto font-normal text-white text-[14px] m-0"
            style={{ letterSpacing: '-0.7px', lineHeight: '0.8', fontVariationSettings: "'wdth' 100" }}
          >
            The Moon says no
          </p>
          <p
            className="font-roboto font-normal text-[12px] m-0"
            style={{ color: 'rgba(255,255,255,0.49)', letterSpacing: '-0.36px', fontVariationSettings: "'wdth' 100" }}
          >
            There is confusion, illusion, or hidden...
          </p>
        </div>

        {/* View Reading button */}
        <div
          className="absolute flex items-center justify-center px-[18px] py-[10px] rounded-[4px]"
          style={{ right: 12, top: '50%', transform: 'translateY(-50%)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          <p
            className="font-roboto font-normal text-white text-[14px] m-0 whitespace-nowrap"
            style={{ letterSpacing: '-0.42px', fontVariationSettings: "'wdth' 100" }}
          >
            View Reading
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex items-center gap-[8px] flex-wrap">
        {TAGS.map((tag) => (
          <span
            key={tag}
            className="px-[12px] py-[4px] rounded-full font-roboto text-[13px] text-white"
            style={{
              backgroundColor: 'rgba(76,72,169,0.5)',
              border: '1px solid rgba(255,255,255,0.15)',
              fontVariationSettings: "'wdth' 100",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Reading text */}
      <p
        className="font-roboto font-normal text-white text-[18px] m-0"
        style={{
          letterSpacing: '-0.54px',
          fontVariationSettings: "'wdth' 100",
          lineHeight: 'normal',
          whiteSpace: 'pre-wrap',
        }}
      >
        {reading}
      </p>

      {/* Follow-up questions */}
      <div className="flex flex-col gap-[8px]">
        {FOLLOW_UPS.map((q) => (
          <button
            key={q}
            onClick={() => onFollowUp(q)}
            className="text-left font-roboto text-[16px] hover:opacity-80 transition-opacity"
            style={{
              color: 'rgba(180,160,255,0.85)',
              letterSpacing: '-0.48px',
              fontVariationSettings: "'wdth' 100",
            }}
          >
            → {q}
          </button>
        ))}
      </div>
    </div>
  )
}
