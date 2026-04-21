'use client'
import Image from 'next/image'
import { ASSETS } from '@/lib/assets'

interface TarotTypeSelectorProps {
  onYesNo: () => void
  onThreeCard: () => void
}

export default function TarotTypeSelector({ onYesNo, onThreeCard }: TarotTypeSelectorProps) {
  return (
    <div className="flex gap-[10px] flex-wrap msg-in">
      <button
        onClick={onYesNo}
        className="flex items-center hover:opacity-80 transition-opacity"
        style={{ backgroundColor: '#292930', borderRadius: 100, padding: '7px 10px', gap: 4, border: 'none', cursor: 'pointer' }}
      >
        <div className="relative w-[26px] h-[20px] shrink-0">
          <Image src={ASSETS.tarotPillIcon} alt="" fill unoptimized className="object-contain" />
        </div>
        <span
          className="font-roboto font-normal text-white text-[14px] leading-none"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Yes / No
        </span>
      </button>

      <button
        onClick={onThreeCard}
        className="flex items-center hover:opacity-80 transition-opacity"
        style={{ backgroundColor: '#292930', borderRadius: 100, padding: '7px 10px', gap: 4, border: 'none', cursor: 'pointer' }}
      >
        <div className="relative w-[26px] h-[20px] shrink-0">
          <Image src={ASSETS.tarotPillIcon} alt="" fill unoptimized className="object-contain" />
        </div>
        <span
          className="font-roboto font-normal text-white text-[14px] leading-none"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          3-card spread
        </span>
      </button>
    </div>
  )
}
