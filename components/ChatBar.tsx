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
    <div className="absolute bottom-[24px] left-1/2 -translate-x-1/2 z-20" style={{ width: 377 }}>
      <div
        className="relative overflow-hidden"
        style={{ backgroundColor: '#1b1b1f', height: 104, borderRadius: 29 }}
      >
        {/* Placeholder / input — top row */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          disabled={disabled}
          className="absolute bg-transparent border-none outline-none font-roboto text-[18px] text-white"
          style={{
            top: 12,
            left: 20,
            right: 60,
            letterSpacing: '-0.54px',
            caretColor: 'white',
            lineHeight: 'normal',
            color: value ? 'white' : 'rgba(255,255,255,0.24)',
            fontVariationSettings: "'wdth' 100",
          }}
        />

        {/* Send button — only visible when typing */}
        {value.trim() && (
          <button
            onClick={() => { if (!disabled) onSubmit(value.trim()) }}
            disabled={disabled}
            className="absolute flex items-center justify-center rounded-full"
            style={{ top: 12, right: 12, width: 36, height: 36, backgroundColor: '#4c48a9' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* Bottom row — y:56 inside bar */}
        <div
          className="absolute flex items-center"
          style={{ bottom: 12, left: 12, gap: 22 }}
        >
          {/* Plus button */}
          <div
            className="flex items-center justify-center shrink-0"
            style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#292930' }}
          >
            <div className="relative w-[24px] h-[24px]">
              <Image src={ASSETS.plusIcon} alt="attach" fill unoptimized className="object-contain" />
            </div>
          </div>

          {/* Tarot chip */}
          <button
            onClick={onTarot}
            disabled={disabled}
            className="flex items-center hover:opacity-80 transition-opacity shrink-0"
            style={{ backgroundColor: '#292930', borderRadius: 100, padding: '7px 10px', gap: 4 }}
          >
            <div className="relative w-[26px] h-[20px] shrink-0">
              <Image src={ASSETS.tarotPillIcon} alt="" fill unoptimized className="object-contain" />
            </div>
            <span
              className="font-roboto text-[14px] text-white leading-none"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Tarot
            </span>
          </button>

          {/* Horoscope chip */}
          <button
            onClick={onHoroscope}
            disabled={disabled}
            className="flex items-center hover:opacity-80 transition-opacity shrink-0"
            style={{ backgroundColor: '#292930', borderRadius: 100, padding: '7px 10px', gap: 4 }}
          >
            <div className="relative w-[20px] h-[20px] shrink-0">
              <Image src={ASSETS.horoscopePillIcon} alt="" fill unoptimized className="object-contain" />
            </div>
            <span
              className="font-roboto text-[14px] text-white leading-none"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Horoscope
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
