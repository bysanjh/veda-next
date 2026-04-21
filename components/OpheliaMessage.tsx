'use client'
import Image from 'next/image'
import { ASSETS } from '@/lib/assets'

interface OpheliaMessageProps {
  text: string
}

export default function OpheliaMessage({ text }: OpheliaMessageProps) {
  return (
    <div className="flex flex-col gap-[12px] items-start msg-in">
      <div className="relative w-[40px] h-[40px] shrink-0">
        <Image src={ASSETS.opheliaAvatarSmall} alt="Ophelia" fill unoptimized className="object-cover rounded-full" />
      </div>
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
    </div>
  )
}
