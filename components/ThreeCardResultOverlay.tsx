'use client'
import Image from 'next/image'
import { useState } from 'react'
import { ASSETS } from '@/lib/assets'

interface ThreeCardResultOverlayProps {
  reading: string
  onClose: () => void
  onAnotherReading: () => void
}

const CARDS = [
  { label: 'JUPITER', src: ASSETS.jupiterCard, time: 'Past' },
  { label: 'MOON', src: ASSETS.moonCard3, time: 'Present' },
  { label: 'MARS', src: ASSETS.marsCard, time: 'Future' },
]

const CARD_MEANINGS = [
  {
    card: 'Moon (Past)',
    meaning: 'Confusion and doubt clouded your judgment',
    active: true,
  },
  {
    card: 'Empress (Present)',
    meaning: "You're stepping into clarity and self-trust",
    active: false,
  },
  {
    card: 'Tower (Future)',
    meaning: 'A shake-up clears the way for something stronger',
    active: false,
  },
]

export default function ThreeCardResultOverlay({
  reading,
  onClose,
  onAnotherReading,
}: ThreeCardResultOverlayProps) {
  const [activeCard, setActiveCard] = useState(0)

  return (
    <div
      className="absolute inset-x-0 bottom-0 z-30 overflow-y-auto no-scrollbar rounded-tl-[24px] rounded-tr-[24px] overlay-slide-up"
      style={{
        height: 730,
        backgroundColor: '#080808',
        boxShadow: '1px 0 0 rgba(255,255,255,0.17), -1px -1px 0 rgba(255,255,255,0.17)',
      }}
    >
      {/* Purple blob */}
      <div className="absolute" style={{ left: -76, top: -187, width: 509, height: 347 }}>
        <div className="absolute" style={{ inset: '-12.13% -8.27%' }}>
          <Image src={ASSETS.threeCardEllipse50} alt="" fill unoptimized className="object-contain" />
        </div>
      </div>

      {/* Header */}
      <div className="absolute left-[24px] top-[24px] right-[24px] flex items-center justify-between">
        <p
          className="font-roboto font-normal text-white text-[22px] m-0"
          style={{ letterSpacing: '-0.66px', fontVariationSettings: "'wdth' 100" }}
        >
          Your cards
        </p>
        <button onClick={onClose} className="relative w-[32px] h-[32px]">
          <Image src={ASSETS.closeX} alt="close" fill unoptimized className="object-contain" />
        </button>
      </div>

      {/* Three cards */}
      <div
        className="absolute flex gap-[8px] justify-center"
        style={{ top: 92, left: 24, right: 24 }}
      >
        {CARDS.map((card, i) => (
          <button
            key={i}
            onClick={() => setActiveCard(i)}
            className="relative rounded-[8px] overflow-hidden transition-transform hover:scale-[1.02]"
            style={{
              flex: 1,
              height: 181,
              outline: activeCard === i ? '2px solid rgba(255,255,255,0.6)' : 'none',
            }}
          >
            <Image src={card.src} alt={card.label} fill unoptimized className="object-cover" />
          </button>
        ))}
      </div>

      {/* Swipe hint */}
      <div
        className="absolute flex items-center gap-[3px]"
        style={{ top: 284, left: '50%', transform: 'translateX(-50%)' }}
      >
        <div className="relative w-[20px] h-[20px]">
          <Image src={ASSETS.swipeIcon} alt="" fill unoptimized className="object-contain" />
        </div>
        <p
          className="font-roboto font-normal text-[12px] m-0 whitespace-nowrap"
          style={{ color: '#7d7e83', fontVariationSettings: "'wdth' 100" }}
        >
          Swipe left to read the cards
        </p>
      </div>

      {/* Card meanings */}
      <div
        className="absolute flex flex-col gap-[12px]"
        style={{ top: 320, left: 24, right: 24 }}
      >
        {CARD_MEANINGS.map((m, i) => (
          <button
            key={i}
            onClick={() => setActiveCard(i)}
            className="flex flex-col gap-[6px] items-start text-left"
          >
            <p
              className="font-roboto font-normal text-[14px] m-0"
              style={{
                color: activeCard === i ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.5)',
                letterSpacing: '-0.42px',
                fontVariationSettings: "'wdth' 100",
              }}
            >
              {m.card}
            </p>
            <p
              className="font-roboto font-normal text-[16px] m-0"
              style={{
                color: activeCard === i ? 'white' : 'rgba(255,255,255,0.5)',
                letterSpacing: '-0.48px',
                fontVariationSettings: "'wdth' 100",
              }}
            >
              {m.meaning}
            </p>
          </button>
        ))}
      </div>

      {/* Summarized reading */}
      <div
        className="absolute flex flex-col gap-[4px]"
        style={{ top: 491, left: 24, right: 24 }}
      >
        <p
          className="font-roboto font-normal text-[16px] m-0"
          style={{
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '-0.48px',
            fontVariationSettings: "'wdth' 100",
          }}
        >
          Summarized reading:
        </p>
        <p
          className="font-roboto font-normal text-white text-[16px] m-0"
          style={{
            letterSpacing: '-0.48px',
            fontVariationSettings: "'wdth' 100",
            whiteSpace: 'pre-wrap',
            lineHeight: 'normal',
          }}
        >
          {reading}
        </p>
      </div>

      {/* Get another reading button */}
      <button
        onClick={onAnotherReading}
        className="absolute flex items-center justify-center rounded-[8px] hover:opacity-90 transition-opacity"
        style={{
          top: 651,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#4c48a9',
          padding: '16px 104px',
          width: 354,
        }}
      >
        <p
          className="font-roboto font-normal text-white text-[18px] m-0 whitespace-nowrap"
          style={{ letterSpacing: '-0.72px', fontVariationSettings: "'wdth' 100" }}
        >
          Get another reading
        </p>
      </button>
    </div>
  )
}
