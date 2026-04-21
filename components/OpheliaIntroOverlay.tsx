'use client'
import Image from 'next/image'
import { useState } from 'react'
import { ASSETS } from '@/lib/assets'

interface OpheliaIntroOverlayProps {
  onClose: () => void
  onYesNo: () => void
  onThreeCard: () => void
}

export default function OpheliaIntroOverlay({ onClose, onYesNo, onThreeCard }: OpheliaIntroOverlayProps) {
  const [defaultAdvisor, setDefaultAdvisor] = useState(true)

  return (
    <div
      className="absolute inset-x-0 bottom-0 z-30 overflow-y-auto no-scrollbar rounded-tl-[24px] rounded-tr-[24px] overlay-slide-up"
      style={{
        height: 757,
        backgroundColor: '#080808',
        boxShadow: '1px 0 0 rgba(255,255,255,0.17), -1px -1px 0 rgba(255,255,255,0.17)',
      }}
    >
      {/* Purple blob top-left */}
      <div className="absolute pointer-events-none" style={{ left: -76, top: -187, width: 509, height: 347 }}>
        <div className="absolute" style={{ inset: '-12.13% -8.27%' }}>
          <Image src={ASSETS.opheliaOverlayEllipse50} alt="" fill unoptimized className="object-contain" />
        </div>
      </div>

      {/* Ophelia photo — top ~50% */}
      <div className="absolute overflow-hidden pointer-events-none" style={{ left: '50%', transform: 'translateX(-50%)', top: '1.72%', bottom: '49.8%', width: 344 }}>
        <Image src={ASSETS.opheliaPhoto} alt="Ophelia" fill unoptimized className="object-cover object-top" />
      </div>

      {/* Gradient overlays for legibility */}
      {/* Top fade */}
      <div className="absolute pointer-events-none" style={{ top: 0, left: 7, width: 361, height: 192, background: 'linear-gradient(to bottom, #000 0%, rgba(0,0,0,0) 100%)' }} />
      {/* Left fade */}
      <div className="absolute pointer-events-none" style={{ left: -2, top: 0, width: 190, height: 702, background: 'linear-gradient(to right, #000 0%, rgba(0,0,0,0) 100%)' }} />
      {/* Right fade */}
      <div className="absolute pointer-events-none" style={{ left: 226, top: -1, width: 176, height: 702, background: 'linear-gradient(to left, #000 0%, rgba(0,0,0,0) 100%)' }} />
      {/* Bottom of photo fade — reversed from bottom */}
      <div className="absolute pointer-events-none" style={{ top: 109, left: -2, width: 404, height: 310, background: 'linear-gradient(to top, #000 15%, rgba(0,0,0,0) 98%)' }} />

      {/* Header row: Meet Ophelia + X */}
      <div className="absolute flex items-start justify-between" style={{ top: 32, left: '50%', transform: 'translateX(-50%)', width: 354 }}>
        <div className="flex flex-col">
          <p
            className="font-roboto font-normal text-white m-0"
            style={{ fontSize: 22, letterSpacing: '-0.66px', fontVariationSettings: "'wdth' 100" }}
          >
            Meet Ophelia
          </p>
          <p
            className="font-roboto font-normal m-0"
            style={{ fontSize: 16, color: 'rgba(255,255,255,0.57)', letterSpacing: '-0.48px', fontVariationSettings: "'wdth' 100" }}
          >
            Tarot reader
          </p>
        </div>
        <button onClick={onClose} className="w-[24px] h-[24px] relative shrink-0 mt-[2px]">
          <Image src={ASSETS.closeX} alt="close" fill unoptimized className="object-contain" />
        </button>
      </div>

      {/* Content below photo (top: 277px) */}
      <div
        className="absolute flex flex-col gap-[20px]"
        style={{ top: 277, left: '50%', transform: 'translateX(-50%)', width: 354 }}
      >
        {/* Bio */}
        <p
          className="font-roboto font-normal m-0"
          style={{ fontSize: 16, color: 'rgba(255,255,255,0.68)', letterSpacing: '-0.64px', lineHeight: 'normal', fontVariationSettings: "'wdth' 100" }}
        >
          Meet Ophelia — a tarot reader who believes every question deserves a clear answer. From quick guidance to a deep-dive into your path, she&apos;s here to help you find yours.
        </p>

        {/* Set as default advisor */}
        <div className="flex items-center justify-between">
          <p
            className="font-roboto font-normal text-white m-0"
            style={{ fontSize: 16, letterSpacing: '-0.64px', fontVariationSettings: "'wdth' 100" }}
          >
            Set as default advisor
          </p>
          {/* CSS toggle */}
          <button
            onClick={() => setDefaultAdvisor(!defaultAdvisor)}
            className="relative shrink-0"
            style={{ width: 51, height: 31 }}
          >
            <div
              className="w-full h-full rounded-full transition-colors duration-200"
              style={{ backgroundColor: defaultAdvisor ? '#4c48a9' : 'rgba(120,120,128,0.32)' }}
            />
            <div
              className="absolute top-[2px] rounded-full bg-white shadow transition-transform duration-200"
              style={{
                width: 27, height: 27,
                left: defaultAdvisor ? 22 : 2,
              }}
            />
          </button>
        </div>

        {/* Choose your reading */}
        <div className="flex flex-col gap-[8px]">
          <p
            className="font-roboto font-normal text-white m-0"
            style={{ fontSize: 16, letterSpacing: '-0.64px', fontVariationSettings: "'wdth' 100" }}
          >
            Choose your reading
          </p>

          <div className="flex flex-col gap-[12px]">
            {/* Yes/No card */}
            <button
              onClick={onYesNo}
              className="relative overflow-hidden rounded-[12px] w-full text-left hover:opacity-90 active:opacity-80 transition-opacity"
              style={{ backgroundColor: '#2f265e', height: 88 }}
            >
              <div className="absolute" style={{ left: '50%', transform: 'translateX(calc(112.5px - 50%))', top: '50%', marginTop: -102.5, width: 215, height: 205 }}>
                <div className="absolute" style={{ inset: '-10.49% -10%' }}>
                  <Image src={ASSETS.ellipse40} alt="" fill unoptimized className="object-contain" />
                </div>
              </div>
              <div className="absolute flex items-center justify-center" style={{ left: 234, top: -29, width: 162.869, height: 173.359 }}>
                <div style={{ transform: 'rotate(-35.87deg)', position: 'relative', width: 97.04, height: 143.763 }}>
                  <Image src={ASSETS.backOfCard18} alt="" fill unoptimized className="object-cover" style={{ filter: 'drop-shadow(2px 4px 4px rgba(0,0,0,0.25))' }} />
                </div>
              </div>
              <div className="absolute inset-0" style={{ backdropFilter: 'blur(0.85px)', backgroundColor: 'rgba(2,2,2,0.05)' }} />
              <div className="absolute flex flex-col gap-[16px]" style={{ left: 16, top: '50%', transform: 'translateY(-50%)', width: 223 }}>
                <p className="font-roboto font-normal text-white m-0" style={{ fontSize: 18, letterSpacing: '-0.72px', lineHeight: '20px', fontVariationSettings: "'wdth' 100" }}>
                  Yes/No Tarot
                </p>
                <p className="font-roboto font-normal m-0" style={{ fontSize: 14, color: '#cfcfcf', letterSpacing: '-0.56px', lineHeight: '14px', fontVariationSettings: "'wdth' 100" }}>
                  Quick answers for burning questions.
                </p>
              </div>
            </button>

            {/* 3-card spread */}
            <button
              onClick={onThreeCard}
              className="relative overflow-hidden rounded-[12px] w-full text-left hover:opacity-90 active:opacity-80 transition-opacity"
              style={{ backgroundColor: '#2f265e', height: 88 }}
            >
              <div className="absolute" style={{ left: '50%', transform: 'translateX(calc(112.5px - 50%))', top: '50%', marginTop: -102.5, width: 215, height: 205 }}>
                <div className="absolute" style={{ inset: '-10.49% -10%' }}>
                  <Image src={ASSETS.ellipse40} alt="" fill unoptimized className="object-contain" />
                </div>
              </div>
              {/* 3 card backs */}
              {[{ deg: -75, left: 242 }, { deg: -60, left: 254 }, { deg: -45, left: 266 }].map(({ deg, left }, i) => (
                <div key={i} className="absolute overflow-hidden rounded-[3px]" style={{ left, top: -30, width: 93, height: 138, transform: `rotate(${deg}deg) scaleY(-1)`, backgroundColor: '#372e6a' }}>
                  <div className="absolute inset-0">
                    <Image src={ASSETS.glitterBg} alt="" fill unoptimized className="object-cover" />
                  </div>
                  <div className="absolute inset-[2px] rounded-[2px]" style={{ backgroundColor: '#372e6a' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div style={{ transform: 'rotate(180deg)', position: 'relative', width: 38, height: 38 }}>
                      <Image src={ASSETS.star2} alt="" fill unoptimized className="object-contain" />
                    </div>
                  </div>
                </div>
              ))}
              <div className="absolute inset-0" style={{ backdropFilter: 'blur(0.85px)', backgroundColor: 'rgba(2,2,2,0.05)' }} />
              <div className="absolute flex flex-col gap-[16px]" style={{ left: 16, top: '50%', transform: 'translateY(-50%)', width: 223 }}>
                <p className="font-roboto font-normal text-white m-0" style={{ fontSize: 18, letterSpacing: '-0.72px', lineHeight: '20px', fontVariationSettings: "'wdth' 100" }}>
                  3-card spread
                </p>
                <p className="font-roboto font-normal m-0" style={{ fontSize: 14, color: '#cfcfcf', letterSpacing: '-0.56px', lineHeight: '14px', fontVariationSettings: "'wdth' 100" }}>
                  Classic past, present, and future reading.
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Begin your reading button */}
      <button
        onClick={onClose}
        className="absolute flex items-center justify-center hover:opacity-90 transition-opacity"
        style={{
          top: 700,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#4c48a9',
          borderRadius: 8,
          width: 354,
          height: 52,
        }}
      >
        <p
          className="font-roboto font-normal text-white m-0 whitespace-nowrap"
          style={{ fontSize: 18, letterSpacing: '-0.72px', fontVariationSettings: "'wdth' 100" }}
        >
          Begin your reading
        </p>
      </button>
    </div>
  )
}
