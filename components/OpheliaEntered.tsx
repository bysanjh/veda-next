'use client'
import Image from 'next/image'
import { ASSETS } from '@/lib/assets'

export default function OpheliaEntered() {
  return (
    <div className="flex items-center gap-[8px]">
      <div className="relative w-[32px] h-[32px] shrink-0">
        <Image src={ASSETS.opheliaAvatarSmall} alt="Ophelia" fill unoptimized className="object-cover rounded-full" />
      </div>
      <p
        className="font-roboto italic font-normal text-[14px] m-0"
        style={{
          color: 'rgba(255,255,255,0.7)',
          letterSpacing: '-0.14px',
          lineHeight: '1.15',
          fontVariationSettings: "'wdth' 100",
        }}
      >
        Ophelia entered the chat
      </p>
    </div>
  )
}
