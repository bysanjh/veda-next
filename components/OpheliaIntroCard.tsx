'use client'
import Image from 'next/image'
import { ASSETS } from '@/lib/assets'

export default function OpheliaIntroCard() {
  return (
    <div
      className="relative overflow-hidden rounded-[20px] w-full"
      style={{
        height: 287,
        border: '1px solid #212121',
        backgroundColor: '#000',
      }}
    >
      {/* Ophelia photo */}
      <div className="absolute inset-0">
        <Image
          src={ASSETS.opheliaPhoto}
          alt="Ophelia"
          fill
          unoptimized
          className="object-cover object-top"
        />
      </div>

      {/* Gradient overlays for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to top, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0) 70%)',
        }}
      />
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: 104,
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 33%, rgba(0,0,0,0))',
        }}
      />

      {/* Header row */}
      <div className="absolute top-[15px] left-[15px] right-[15px] flex items-start justify-between">
        <div className="flex flex-col gap-0">
          <p
            className="font-roboto font-normal text-white text-[22px] m-0"
            style={{ letterSpacing: '-0.66px', fontVariationSettings: "'wdth' 100" }}
          >
            Meet Ophelia
          </p>
          <p
            className="font-roboto font-normal text-[16px] m-0"
            style={{ color: 'rgba(255,255,255,0.57)', letterSpacing: '-0.48px', fontVariationSettings: "'wdth' 100" }}
          >
            Tarot reader
          </p>
        </div>
        {/* Toggle */}
        <div className="flex flex-col items-end gap-[4px]">
          <div className="relative w-[56px] h-[32px]">
            <Image src={ASSETS.toggleGroup} alt="toggle" fill unoptimized className="object-contain" />
          </div>
          <p
            className="font-roboto font-normal text-white text-[12px] m-0"
            style={{ letterSpacing: '-0.48px', fontVariationSettings: "'wdth' 100" }}
          >
            Default advisor
          </p>
        </div>
      </div>

      {/* Bio text */}
      <p
        className="absolute font-roboto font-normal text-[16px] m-0"
        style={{
          color: 'rgba(255,255,255,0.68)',
          letterSpacing: '-0.64px',
          top: 188,
          left: 15,
          width: 338,
          fontVariationSettings: "'wdth' 100",
          lineHeight: 'normal',
        }}
      >
        Meet Ophelia - a tarot reader who believes every question deserves a clear answer. From quick guidance to a deep-dive into your path, she&apos;s here to help you find yours.
      </p>
    </div>
  )
}
