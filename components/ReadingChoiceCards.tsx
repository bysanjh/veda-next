'use client'
import Image from 'next/image'
import { ASSETS } from '@/lib/assets'

interface ReadingChoiceCardsProps {
  onYesNo: () => void
  onThreeCard: () => void
}

export default function ReadingChoiceCards({ onYesNo, onThreeCard }: ReadingChoiceCardsProps) {
  return (
    <div className="flex flex-col gap-[12px] w-full">
      {/* Yes/No Tarot */}
      <button
        onClick={onYesNo}
        className="relative overflow-hidden rounded-[12px] h-[88px] w-full text-left hover:opacity-90 active:opacity-80 transition-opacity"
        style={{ backgroundColor: '#2f265e' }}
      >
        {/* Right ellipse decorations */}
        <div className="absolute" style={{ left: '50%', transform: 'translateX(calc(112.5px - 50%))', top: '50%', marginTop: -102.5, width: 215, height: 205 }}>
          <div className="absolute" style={{ inset: '-10.49% -10%' }}>
            <Image src={ASSETS.ellipse40} alt="" fill unoptimized className="object-contain" />
          </div>
        </div>
        {/* Card image */}
        <div className="absolute flex items-center justify-center" style={{ left: 234, top: -29, width: 162.869, height: 173.359 }}>
          <div style={{ transform: 'rotate(-35.87deg)', position: 'relative', width: 97.04, height: 143.763 }}>
            <Image src={ASSETS.backOfCard18} alt="" fill unoptimized className="object-cover" style={{ filter: 'drop-shadow(2px 4px 4px rgba(0,0,0,0.25))' }} />
          </div>
        </div>
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          style={{ backdropFilter: 'blur(0.85px)', backgroundColor: 'rgba(2,2,2,0.05)' }}
        />
        {/* Text */}
        <div
          className="absolute flex flex-col gap-[16px]"
          style={{ left: 16, top: '50%', transform: 'translateY(-50%)', width: 223 }}
        >
          <p
            className="font-roboto font-normal text-white text-[18px] m-0"
            style={{ letterSpacing: '-0.72px', lineHeight: '20px', fontVariationSettings: "'wdth' 100" }}
          >
            Yes/No Tarot
          </p>
          <p
            className="font-roboto font-normal text-[14px] m-0"
            style={{ color: '#cfcfcf', letterSpacing: '-0.56px', lineHeight: '14px', fontVariationSettings: "'wdth' 100" }}
          >
            Quick answers for burning questions.
          </p>
        </div>
      </button>

      {/* 3-card spread */}
      <button
        onClick={onThreeCard}
        className="relative overflow-hidden rounded-[12px] h-[88px] w-full text-left hover:opacity-90 active:opacity-80 transition-opacity"
        style={{ backgroundColor: '#2f265e' }}
      >
        {/* Right ellipse */}
        <div className="absolute" style={{ left: '50%', transform: 'translateX(calc(112.5px - 50%))', top: '50%', marginTop: -102.5, width: 215, height: 205 }}>
          <div className="absolute" style={{ inset: '-10.49% -10%' }}>
            <Image src={ASSETS.ellipse40} alt="" fill unoptimized className="object-contain" />
          </div>
        </div>
        {/* 3 cards fanned */}
        {[-45, -60, -75].map((deg, i) => (
          <div
            key={i}
            className="absolute flex items-center justify-center"
            style={{ left: 230 + i * 12, top: -30, width: 120, height: 130 }}
          >
            <div
              style={{
                transform: `rotate(${deg}deg) scaleY(-1)`,
                position: 'relative',
                width: 82,
                height: 120,
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <div className="absolute inset-0" style={{ backgroundColor: '#372e6a' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Image src={ASSETS.star2} alt="" width={36} height={36} unoptimized />
              </div>
            </div>
          </div>
        ))}
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          style={{ backdropFilter: 'blur(0.85px)', backgroundColor: 'rgba(2,2,2,0.05)' }}
        />
        {/* Text */}
        <div
          className="absolute flex flex-col gap-[16px]"
          style={{ left: 16, top: '50%', transform: 'translateY(-50%)', width: 223 }}
        >
          <p
            className="font-roboto font-normal text-white text-[18px] m-0"
            style={{ letterSpacing: '-0.72px', lineHeight: '20px', fontVariationSettings: "'wdth' 100" }}
          >
            3-card spread
          </p>
          <p
            className="font-roboto font-normal text-[14px] m-0"
            style={{ color: '#cfcfcf', letterSpacing: '-0.56px', lineHeight: '14px', fontVariationSettings: "'wdth' 100" }}
          >
            Classic past, present, and future reading.
          </p>
        </div>
      </button>
    </div>
  )
}
