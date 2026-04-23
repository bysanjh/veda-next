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
            className="relative overflow-hidden rounded-[12px] w-full text-left hover:opacity-90 active:opacity-80 transition-opacity"
            style={{ padding: 0, border: 'none', display: 'block' }}
          >
            <img
              src="/tarot-widget.png"
              alt="Tarot reading"
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 12 }}
            />
          </button>

          {/* Horoscope card */}
          <button
            onClick={onHoroscope}
            className="relative overflow-hidden rounded-[12px] w-full text-left hover:opacity-90 active:opacity-80 transition-opacity"
            style={{ padding: 0, border: 'none', display: 'block' }}
          >
            <img
              src="/daily-horoscope.png"
              alt="Daily horoscope"
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 12 }}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
