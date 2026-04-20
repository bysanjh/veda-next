'use client'
import Image from 'next/image'
import { ASSETS } from '@/lib/assets'

interface VedaMessageProps {
  text: string
  showAvatar?: boolean
  showLoader?: boolean
}

export default function VedaMessage({ text, showAvatar = true, showLoader = false }: VedaMessageProps) {
  return (
    <div className="flex flex-col gap-[12px] items-start">
      {showAvatar && (
        <div className="relative w-[40px] h-[40px] shrink-0">
          <Image src={ASSETS.vedaAvatar} alt="Veda" fill unoptimized className="object-cover rounded-full" />
        </div>
      )}
      {text && (
        <p
          className="font-roboto font-normal text-white text-[18px] m-0"
          style={{
            letterSpacing: '-0.54px',
            fontVariationSettings: "'wdth' 100",
            lineHeight: 'normal',
            whiteSpace: 'pre-wrap',
          }}
        >
          {text}
        </p>
      )}
      {showLoader && (
        <div className="w-[24px] h-[24px] rounded-full border-2 border-white border-t-transparent loader-spin" />
      )}
    </div>
  )
}
