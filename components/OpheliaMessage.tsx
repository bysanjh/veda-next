'use client'
import Image from 'next/image'
import { ASSETS } from '@/lib/assets'

interface OpheliaMessageProps {
  text: string
  showAvatar?: boolean
}

export default function OpheliaMessage({ text, showAvatar = true }: OpheliaMessageProps) {
  return (
    <div className="flex flex-col gap-[12px] items-start">
      {showAvatar && (
        <div className="relative w-[32px] h-[32px] shrink-0">
          <Image src={ASSETS.opheliaAvatarSmall} alt="Ophelia" fill unoptimized className="object-cover rounded-full" />
        </div>
      )}
      <p
        className="font-roboto font-normal text-white text-[18px] m-0"
        style={{
          letterSpacing: '-0.54px',
          fontVariationSettings: "'wdth' 100",
          lineHeight: 'normal',
          whiteSpace: 'pre-wrap',
          width: 370,
        }}
      >
        {text}
      </p>
    </div>
  )
}
