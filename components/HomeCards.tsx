'use client'
import Image from 'next/image'
import { ASSETS } from '@/lib/assets'

interface HomeCardsProps {
  onTarot: () => void
  onHoroscope: () => void
}

export default function HomeCards({ onTarot, onHoroscope }: HomeCardsProps) {
  return (
    <div className="flex flex-col gap-[32px] w-full">
      {/* Veda intro */}
      <div className="flex flex-col gap-[12px]">
        <div className="w-[40px] h-[40px] relative shrink-0">
          <Image src={ASSETS.vedaAvatar} alt="Veda" fill unoptimized className="object-cover rounded-full" />
        </div>
        <div
          className="font-roboto font-normal text-white text-[18px]"
          style={{ letterSpacing: '-0.54px', fontVariationSettings: "'wdth' 100" }}
        >
          <p className="mb-0">Hi, I&apos;m Veda, your daily spiritual guide.</p>
          <p className="mb-0">&nbsp;</p>
          <p>What&apos;s on your mind today?</p>
        </div>
      </div>

      {/* Cards section */}
      <div className="flex flex-col gap-[16px] w-full">
        <p
          className="font-roboto font-normal text-[17px]"
          style={{
            color: 'rgba(255,255,255,0.62)',
            letterSpacing: '-0.68px',
            lineHeight: '16px',
            fontVariationSettings: "'wdth' 100",
          }}
        >
          Things I can help with you today
        </p>

        <div className="flex flex-col gap-[12px] w-full">
          {/* Tarot card */}
          <button
            onClick={onTarot}
            className="relative overflow-hidden rounded-[12px] h-[91px] w-full text-left hover:opacity-90 active:opacity-80 transition-opacity"
            style={{ backgroundColor: '#2e2065' }}
          >
            {/* Right ellipse bg */}
            <div className="absolute" style={{ left: 245, top: -14, width: 137, height: 137 }}>
              <div className="absolute" style={{ inset: '-10.88%' }}>
                <Image src={ASSETS.ellipse48} alt="" fill unoptimized className="object-contain" />
              </div>
            </div>
            {/* Left ellipse */}
            <div className="absolute" style={{ left: -67, top: -11, width: 215, height: 131 }}>
              <Image src={ASSETS.ellipse49} alt="" fill unoptimized className="object-contain" />
            </div>
            {/* Tarot cards */}
            <div className="absolute flex items-center justify-center" style={{ left: 287, top: 8, width: 49.55, height: 70.984 }}>
              <div style={{ transform: 'rotate(-2.5deg)', position: 'relative', width: 46.589, height: 69.021 }}>
                <Image src={ASSETS.tarotCardBack} alt="" fill unoptimized className="object-cover" />
              </div>
            </div>
            <div className="absolute flex items-center justify-center" style={{ left: 290.27, top: 8.37, width: 55.111, height: 75.63 }}>
              <div style={{ transform: 'rotate(6.03deg)', position: 'relative', width: 47.917, height: 70.988 }}>
                <Image src={ASSETS.tarotCardBack} alt="" fill unoptimized className="object-cover" />
              </div>
            </div>
            {/* Backdrop */}
            <div
              className="absolute inset-0"
              style={{ backdropFilter: 'blur(0.85px)', backgroundColor: 'rgba(2,2,2,0.19)' }}
            />
            {/* Text */}
            <div
              className="absolute flex flex-col gap-[16px] items-start"
              style={{ left: 16, top: '50%', transform: 'translateY(-50%)', width: 223 }}
            >
              <p
                className="font-roboto font-normal text-white text-[20px] m-0"
                style={{ letterSpacing: '-0.4px', lineHeight: '20px', fontVariationSettings: "'wdth' 100" }}
              >
                Tarot reading
              </p>
              <p
                className="font-roboto font-normal text-[16px] m-0"
                style={{
                  color: 'rgba(255,255,255,0.46)',
                  letterSpacing: '-0.64px',
                  lineHeight: '15px',
                  fontVariationSettings: "'wdth' 100",
                }}
              >
                Let the cards reveal what you need to know right now
              </p>
            </div>
          </button>

          {/* Horoscope card */}
          <button
            onClick={onHoroscope}
            className="relative overflow-hidden rounded-[12px] h-[91px] w-full text-left hover:opacity-90 active:opacity-80 transition-opacity"
            style={{ backgroundColor: '#2e2065' }}
          >
            {/* Right ellipse */}
            <div className="absolute" style={{ left: 247, top: -25, width: 137, height: 137 }}>
              <div className="absolute" style={{ inset: '-10.88%' }}>
                <Image src={ASSETS.ellipse48} alt="" fill unoptimized className="object-contain" />
              </div>
            </div>
            {/* Left ellipse */}
            <div className="absolute" style={{ left: -67, top: -11, width: 215, height: 131 }}>
              <Image src={ASSETS.ellipse49} alt="" fill unoptimized className="object-contain" />
            </div>
            {/* Orb */}
            <div className="absolute" style={{ left: 273, top: 3, width: 86, height: 86 }}>
              <Image src={ASSETS.horoscopeOrb} alt="" fill unoptimized className="object-cover" />
            </div>
            <div className="absolute" style={{ left: 308, top: 38, width: 16, height: 16 }}>
              <Image src={ASSETS.ellipse54} alt="" fill unoptimized className="object-contain" />
            </div>
            {/* Backdrop */}
            <div
              className="absolute inset-0"
              style={{ backdropFilter: 'blur(0.85px)', backgroundColor: 'rgba(2,2,2,0.27)' }}
            />
            {/* Text */}
            <div
              className="absolute flex flex-col gap-[16px] items-start"
              style={{ left: 16, top: '50%', transform: 'translateY(-50%)', width: 223 }}
            >
              <p
                className="font-roboto font-normal text-white text-[20px] m-0"
                style={{ letterSpacing: '-0.4px', lineHeight: '20px', fontVariationSettings: "'wdth' 100" }}
              >
                Daily horoscope
              </p>
              <p
                className="font-roboto font-normal text-[16px] m-0"
                style={{
                  color: 'rgba(255,255,255,0.46)',
                  letterSpacing: '-0.64px',
                  lineHeight: '15px',
                  fontVariationSettings: "'wdth' 100",
                }}
              >
                Find out what today holds - love, career, and everything in between.
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
