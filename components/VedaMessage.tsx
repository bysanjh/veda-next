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
    <div className="flex flex-col gap-[12px] items-start msg-in">
      {showAvatar && (
        <div className="relative w-[40px] h-[40px] shrink-0">
          <Image src={ASSETS.vedaAvatar} alt="Veda" fill unoptimized className="object-cover rounded-full" />
        </div>
      )}
      {showLoader && !text && (
        <div className="flex items-center gap-[6px] px-[4px] py-[6px]">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
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
    </div>
  )
}
