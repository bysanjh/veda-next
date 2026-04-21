'use client'
import Image from 'next/image'
import { ASSETS } from '@/lib/assets'

interface CardRevealOverlayProps {
  reading: string
  isStreaming: boolean
  onClose: () => void
  onAnotherReading: () => void
}

export default function CardRevealOverlay({
  reading, isStreaming, onClose, onAnotherReading,
}: CardRevealOverlayProps) {
  return (
    <div
      className="absolute inset-x-0 bottom-0 z-40 rounded-tl-[24px] rounded-tr-[24px] overlay-slide-up"
      style={{
        height: 730,
        backgroundColor: '#080808',
        boxShadow: '1px 0 0 rgba(255,255,255,0.17), -1px -1px 0 rgba(255,255,255,0.17)',
        overflow: 'hidden',
      }}
    >
      {/* Blue-purple blob top-left */}
      <div className="absolute pointer-events-none" style={{ left: -76, top: -187, width: 509, height: 347 }}>
        <div className="absolute" style={{ inset: '-12.13% -8.27%' }}>
          <Image src={ASSETS.cardPullEllipse50} alt="" fill unoptimized className="object-contain" />
        </div>
      </div>

      {/* Close X */}
      <button
        onClick={onClose}
        className="absolute"
        style={{ left: 346, top: 24, width: 32, height: 32 }}
      >
        <div className="relative w-full h-full">
          <Image src={ASSETS.closeX} alt="close" fill unoptimized className="object-contain" />
        </div>
      </button>

      {/* Title */}
      <p
        className="absolute font-roboto font-normal text-white m-0"
        style={{ left: 24, top: 28, fontSize: 22, letterSpacing: '-0.66px', fontVariationSettings: "'wdth' 100" }}
      >
        Your card
      </p>

      {/* Circular purple glow behind Moon card */}
      <div
        className="absolute pointer-events-none"
        style={{ left: '50%', marginLeft: -171, top: 67, width: 342, height: 342 }}
      >
        <div className="absolute" style={{ inset: '-29.24%' }}>
          <Image src={ASSETS.revealGlow} alt="" fill unoptimized className="object-contain" />
        </div>
      </div>

      {/* Moon card face — centered */}
      <div
        className="absolute"
        style={{
          left: '50%',
          marginLeft: -98.385,
          top: 89,
          width: 196.77,
          height: 295.155,
        }}
      >
        <Image
          src={ASSETS.moonCard}
          alt="The Moon"
          fill
          unoptimized
          className="object-cover"
          style={{ borderRadius: 8 }}
        />
      </div>

      {/* Reading headline */}
      <p
        className="absolute font-roboto font-normal text-white m-0"
        style={{
          left: 24,
          top: 415,
          width: 354,
          fontSize: 22,
          letterSpacing: '-1.1px',
          fontVariationSettings: "'wdth' 100",
        }}
      >
        The Moon pulled you aside.
      </p>

      {/* Reading text (streaming) */}
      <div
        className="absolute font-roboto font-normal text-white"
        style={{
          left: 24,
          top: 453,
          width: 354,
          fontSize: 16,
          letterSpacing: '-0.48px',
          fontVariationSettings: "'wdth' 100",
          lineHeight: '1.5',
          whiteSpace: 'pre-wrap',
          maxHeight: 185,
          overflow: 'hidden',
        }}
      >
        {reading}
        {isStreaming && !reading && (
          <span className="flex gap-[6px]" style={{ marginTop: 4 }}>
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </span>
        )}
      </div>

      {/* Get another reading button */}
      <button
        onClick={onAnotherReading}
        className="absolute flex items-center justify-center hover:opacity-90 active:opacity-80 transition-opacity"
        style={{
          left: '50%',
          marginLeft: -177,
          top: 650,
          width: 354,
          height: 52,
          backgroundColor: '#4c48a9',
          borderRadius: 8,
        }}
      >
        <p
          className="font-roboto font-normal text-white m-0 whitespace-nowrap"
          style={{ fontSize: 18, letterSpacing: '-0.72px', fontVariationSettings: "'wdth' 100" }}
        >
          Get another reading
        </p>
      </button>
    </div>
  )
}
