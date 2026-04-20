'use client'
import Image from 'next/image'
import { ASSETS } from '@/lib/assets'

interface ChatBarProps {
  value: string
  onChange: (v: string) => void
  onSubmit: (text: string) => void
  onTarot: () => void
  onHoroscope: () => void
  placeholder?: string
  disabled?: boolean
}

export default function ChatBar({
  value,
  onChange,
  onSubmit,
  onTarot,
  onHoroscope,
  placeholder = 'Chat with Veda',
  disabled = false,
}: ChatBarProps) {
  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && value.trim() && !disabled) {
      onSubmit(value.trim())
    }
  }

  return (
    <div className="absolute bottom-[24px] left-1/2 -translate-x-1/2 w-[377px] z-20">
      <div
        className="relative overflow-hidden rounded-[29px]"
        style={{ backgroundColor: '#1b1b1f', height: '104px' }}
      >
        {/* Top: text input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          disabled={disabled}
          className="absolute top-[12px] left-[20px] right-[60px] bg-transparent border-none outline-none font-roboto text-[18px] text-white"
          style={{
            fontVariationSettings: "'wdth' 100",
            letterSpacing: '-0.54px',
            caretColor: 'white',
            lineHeight: 'normal',
          }}
        />
        {/* Placeholder style when empty */}
        {!value && (
          <span
            className="absolute top-[12px] left-[20px] font-roboto text-[18px] pointer-events-none"
            style={{
              color: 'rgba(255,255,255,0.24)',
              letterSpacing: '-0.54px',
              fontVariationSettings: "'wdth' 100",
            }}
          >
            {placeholder}
          </span>
        )}

        {/* Send button */}
        {value.trim() && (
          <button
            onClick={() => { if (!disabled) { onSubmit(value.trim()) } }}
            disabled={disabled}
            className="absolute top-[12px] right-[12px] w-[36px] h-[36px] rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#4c48a9' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* Bottom row: + button, quick pills */}
        <div className="absolute bottom-[12px] left-[12px] flex items-center gap-[22px]">
          {/* Plus button */}
          <div
            className="w-[36px] h-[36px] rounded-[18px] flex items-center justify-center shrink-0"
            style={{ backgroundColor: '#292930' }}
          >
            <div className="relative w-[23.6px] h-[23.6px]">
              <Image src={ASSETS.plusIcon} alt="attach" fill unoptimized className="object-contain" />
            </div>
          </div>

          {/* Quick buttons */}
          <div className="flex items-center gap-[10px]">
            {/* Tarot pill */}
            <button
              onClick={onTarot}
              disabled={disabled}
              className="flex items-center gap-[2px] px-[10px] py-[7px] rounded-full shrink-0 hover:opacity-80 transition-opacity"
              style={{ backgroundColor: '#292930' }}
            >
              <div className="relative w-[29px] h-[22px]">
                <Image src={ASSETS.tarotPillIcon} alt="" fill unoptimized className="object-contain" />
              </div>
              <span
                className="font-roboto text-[14px] text-white leading-none"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Tarot
              </span>
            </button>

            {/* Horoscope pill */}
            <button
              onClick={onHoroscope}
              disabled={disabled}
              className="flex items-center gap-[2px] px-[10px] py-[7px] rounded-full shrink-0 hover:opacity-80 transition-opacity"
              style={{ backgroundColor: '#292930' }}
            >
              <div className="relative w-[21px] h-[21px]">
                <Image src={ASSETS.horoscopePillIcon} alt="" fill unoptimized className="object-contain" />
              </div>
              <span
                className="font-[family-name:var(--font-roboto)] text-[14px] text-white leading-none"
                style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
              >
                Horoscope
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
