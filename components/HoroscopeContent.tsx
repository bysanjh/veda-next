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
    <div className="flex flex-col gap-[20px] w-full msg-in">
      {/* Veda avatar */}
      <div className="relative w-[40px] h-[40px] shrink-0">
        <Image src={ASSETS.vedaAvatar} alt="Veda" fill unoptimized className="object-cover rounded-full" />
      </div>

      {/* Tab bar — filled pill style */}
      <div className="flex items-center gap-[8px]">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="font-roboto font-normal text-[15px] whitespace-nowrap transition-all"
            style={{
              fontVariationSettings: "'wdth' 100",
              padding: '6px 14px',
              borderRadius: 100,
              backgroundColor: activeTab === tab ? '#ffffff' : 'rgba(255,255,255,0.08)',
              color: activeTab === tab ? '#000000' : 'rgba(255,255,255,0.6)',
              border: 'none',
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
            className="font-roboto font-normal text-[13px] m-0 uppercase"
            style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.4px', fontVariationSettings: "'wdth' 100" }}
          >
            What&apos;s creating this
          </p>
          <button
            onClick={() => setExpanded(!expanded)}
            className="relative w-[28px] h-[28px] transition-transform"
            style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
          >
            <Image src={ASSETS.chevronDown} alt="toggle" fill unoptimized className="object-contain" />
          </button>
        </div>

        {expanded && (
          <div className="flex flex-col gap-[10px]">
            {[
              { icon: ASSETS.moonSymbol, size: [15, 15], label: 'New Moon conjunct your Sun' },
              { icon: ASSETS.jupiterSymbol, size: [12, 14], label: 'Jupiter trine your Sun' },
              { icon: ASSETS.saturnSymbol, size: [12.5, 14.3], label: 'Saturn square your Mars' },
            ].map(({ icon, size, label }) => (
              <div key={label} className="flex items-center gap-[8px]">
                <div className="relative shrink-0" style={{ width: size[0], height: size[1] }}>
                  <Image src={icon} alt="" fill unoptimized className="object-contain" />
                </div>
                <p
                  className="font-roboto font-normal text-white text-[16px] m-0"
                  style={{ letterSpacing: '-0.48px', fontVariationSettings: "'wdth' 100" }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Follow-up prompt */}
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
