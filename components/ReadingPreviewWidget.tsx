'use client'
import Image from 'next/image'
import { ASSETS } from '@/lib/assets'

interface ReadingPreviewWidgetProps {
  cardName: string
  verdict: string
  summary: string
  cardImageSrc: string
  onViewReading?: () => void
}

export default function ReadingPreviewWidget({
  cardName,
  verdict,
  summary,
  cardImageSrc,
  onViewReading,
}: ReadingPreviewWidgetProps) {
  return (
    <button
      onClick={onViewReading}
      className="relative overflow-hidden rounded-[8px] w-full text-left active:opacity-80 transition-opacity msg-in"
      style={{ height: 84, backgroundColor: '#372e6a', display: 'block' }}
    >
      {/* Left glow blob */}
      <div className="absolute" style={{ left: -15, top: -20, width: 130, height: 130 }}>
        <div className="absolute" style={{ inset: '-38.46%' }}>
          <Image src={ASSETS.ellipse51} alt="" fill unoptimized className="object-contain" />
        </div>
      </div>
      {/* Right glow blob */}
      <div className="absolute" style={{ left: 256, top: -20, width: 137, height: 116 }}>
        <Image src={ASSETS.ellipse52} alt="" fill unoptimized className="object-contain" />
      </div>
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(2,2,2,0.27)' }} />
      {/* Card thumbnail */}
      <div className="absolute" style={{ left: 8, top: 8, width: 74, height: 111 }}>
        <Image
          src={cardImageSrc}
          alt={cardName}
          fill
          unoptimized
          className="object-cover"
          style={{ borderRadius: 4 }}
        />
      </div>
      {/* Text block */}
      <div
        className="absolute flex flex-col gap-[6px]"
        style={{ left: 102, top: '50%', transform: 'translateY(-50%)', width: 118 }}
      >
        <p
          className="font-roboto font-normal text-white m-0"
          style={{
            fontSize: 14,
            letterSpacing: '-0.7px',
            lineHeight: 1.2,
            fontVariationSettings: "'wdth' 100",
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          } as React.CSSProperties}
        >
          {verdict}
        </p>
        <p
          className="font-roboto font-normal m-0"
          style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.49)',
            letterSpacing: '-0.36px',
            fontVariationSettings: "'wdth' 100",
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          } as React.CSSProperties}
        >
          {summary}
        </p>
      </div>
      {/* View Reading CTA */}
      <div
        className="absolute flex items-center justify-center px-[10px] py-[7px] rounded-[4px]"
        style={{ right: 12, top: '50%', transform: 'translateY(-50%)', border: '1px solid rgba(255,255,255,0.12)' }}
      >
        <p
          className="font-roboto font-normal text-white m-0 whitespace-nowrap"
          style={{ fontSize: 12, letterSpacing: '-0.36px', fontVariationSettings: "'wdth' 100" }}
        >
          View Reading
        </p>
      </div>
    </button>
  )
}
