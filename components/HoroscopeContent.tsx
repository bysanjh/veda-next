'use client'
import Image from 'next/image'
import { useState } from 'react'
import { ASSETS } from '@/lib/assets'

const TABS = ['Today', 'Tomorrow', 'Love', 'Money']

interface HoroscopeContentProps {
  reading: string
  onFollowUp: (q: string) => void
}

export default function HoroscopeContent({ reading, onFollowUp }: HoroscopeContentProps) {
  const [activeTab, setActiveTab] = useState('Today')
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="flex flex-col gap-[24px] w-full">
      {/* Veda avatar */}
      <div className="relative w-[40px] h-[40px] shrink-0">
        <Image src={ASSETS.vedaAvatar} alt="Veda" fill unoptimized className="object-cover rounded-full" />
      </div>

      {/* Tab bar */}
      <div
        className="flex items-center gap-[16px] pl-[4px] pr-[16px] py-[4px] rounded-[10px] self-start"
        style={{
          backgroundColor: 'rgba(27,27,31,0.79)',
          border: '1px solid #171c2b',
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="font-roboto font-normal text-[18px] whitespace-nowrap transition-colors"
            style={{
              fontVariationSettings: "'wdth' 100",
              color: activeTab === tab ? 'white' : 'rgba(255,255,255,0.47)',
              ...(activeTab === tab
                ? {
                    backgroundColor: '#292b32',
                    border: '1px solid #393b44',
                    borderRadius: 8,
                    padding: '8px 16px',
                  }
                : { padding: '8px 0' }),
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Reading */}
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

      {/* What's creating this */}
      <div className="flex flex-col gap-[12px]">
        <div className="flex items-center justify-between">
          <p
            className="font-roboto font-normal text-[16px] m-0"
            style={{ color: 'rgba(255,255,255,0.76)', fontVariationSettings: "'wdth' 100" }}
          >
            WHAT&apos;S CREATING THIS
          </p>
          <button
            onClick={() => setExpanded(!expanded)}
            className="relative w-[30px] h-[30px]"
            style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
          >
            <Image src={ASSETS.chevronDown} alt="toggle" fill unoptimized className="object-contain" />
          </button>
        </div>

        {expanded && (
          <div className="flex flex-col gap-[7px]">
            <div className="flex items-center gap-[6px]">
              <div className="relative w-[15px] h-[15px] shrink-0">
                <Image src={ASSETS.moonSymbol} alt="moon" fill unoptimized className="object-contain" />
              </div>
              <p
                className="font-roboto font-normal text-white text-[16px] m-0 whitespace-nowrap"
                style={{ letterSpacing: '-0.48px', fontVariationSettings: "'wdth' 100" }}
              >
                New Moon conjunct your Sun
              </p>
            </div>
            <div className="flex items-center gap-[6px]">
              <div className="relative w-[12px] h-[14px] shrink-0">
                <Image src={ASSETS.jupiterSymbol} alt="jupiter" fill unoptimized className="object-contain" />
              </div>
              <p
                className="font-roboto font-normal text-white text-[16px] m-0"
                style={{ letterSpacing: '-0.48px', fontVariationSettings: "'wdth' 100" }}
              >
                Jupiter trine your Sun
              </p>
            </div>
            <div className="flex items-center gap-[6px]">
              <div className="relative w-[12.5px] h-[14.3px] shrink-0">
                <Image src={ASSETS.saturnSymbol} alt="saturn" fill unoptimized className="object-contain" />
              </div>
              <p
                className="font-roboto font-normal text-white text-[16px] m-0 whitespace-nowrap"
                style={{ letterSpacing: '-0.48px', fontVariationSettings: "'wdth' 100" }}
              >
                Saturn square your Mars
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Follow-up */}
      <p
        className="font-roboto font-normal text-white text-[18px] m-0"
        style={{ letterSpacing: '-0.54px', fontVariationSettings: "'wdth' 100" }}
      >
        Do you want to know more about how to make the move or know how your day will look tomorrow?
      </p>
      <div className="flex flex-col gap-[8px]">
        {['Tell me more about making the move', 'How will tomorrow look?'].map((q) => (
          <button
            key={q}
            onClick={() => onFollowUp(q)}
            className="text-left font-roboto text-[16px] hover:opacity-80 transition-opacity"
            style={{ color: 'rgba(180,160,255,0.85)', letterSpacing: '-0.48px', fontVariationSettings: "'wdth' 100" }}
          >
            → {q}
          </button>
        ))}
      </div>
    </div>
  )
}
