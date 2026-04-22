'use client'
import { useState } from 'react'

const A = {
  plusIcon:  'https://www.figma.com/api/mcp/asset/bafe9bca-5409-4a0d-bc9d-377386a95ebb',
  tarotIcon: 'https://www.figma.com/api/mcp/asset/f3a87d25-0bf5-4bb7-b0d2-b601d1ea45bb',
  horoIcon:  'https://www.figma.com/api/mcp/asset/5eb9bb83-a970-442b-bc03-c7a214622713',
  sendIcon:  'https://www.figma.com/api/mcp/asset/bff61471-3f6d-45c3-a795-33de005d5539',
}

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
  value, onChange, onSubmit, onTarot, onHoroscope,
  placeholder = 'Chat with Veda',
  disabled = false,
}: ChatBarProps) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && value.trim() && !disabled) onSubmit(value.trim())
  }

  return (
    <div className="absolute bottom-[24px] left-1/2 -translate-x-1/2 z-20" style={{ width: 377 }}>
      <div style={{
        position: 'relative',
        height: 109,
        borderRadius: active ? 17 : 29,
        background: 'linear-gradient(-72.19deg, rgba(42,49,73,0.6) 8.44%, rgba(29,35,54,0.6) 86.36%)',
        border: '1px solid #131725',
        boxShadow: '1px 1px 7.1px 1.3px rgba(61,69,100,0.28)',
        overflow: 'hidden',
        transition: 'border-radius 0.15s ease',
      }}>

        {/* Input / placeholder */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKey}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            position: 'absolute',
            top: 11, left: 14, right: 52,
            background: 'none', border: 'none', outline: 'none',
            fontFamily: 'var(--font-roboto)',
            fontWeight: 400,
            fontSize: 18,
            color: value ? 'white' : 'rgba(255,255,255,0.54)',
            letterSpacing: '-0.54px',
            lineHeight: 'normal',
            fontVariationSettings: "'wdth' 100",
            caretColor: 'white',
          }}
        />

        {/* Send button — white circle, right side, only when text present */}
        {value.trim() && (
          <button
            onClick={() => { if (!disabled) onSubmit(value.trim()) }}
            disabled={disabled}
            style={{
              position: 'absolute',
              right: 9,
              top: '50%', transform: 'translateY(-50%)',
              width: 34, height: 34,
              borderRadius: 113,
              backgroundColor: 'white',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 5.667, flexShrink: 0,
            }}
          >
            <div style={{ position: 'relative', width: 22.667, height: 22.667 }}>
              <div style={{ position: 'absolute', inset: '12.5% 18.75%' }}>
                <img src={A.sendIcon} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
              </div>
            </div>
          </button>
        )}

        {/* Bottom row — plus + tarot + horoscope, hidden when active */}
        {!active && (
          <div style={{
            position: 'absolute',
            left: 11, top: 60,
            display: 'flex', alignItems: 'center', gap: 22,
          }}>
            {/* Plus button */}
            <div style={{
              width: 36, height: 36,
              backgroundColor: '#1d2134', borderRadius: 18,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <img src={A.plusIcon} alt="+" style={{ width: 23.643, height: 23.643, display: 'block' }} />
            </div>

            {/* Tarot + Horoscope pills — tighter gap between them */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <button onClick={onTarot} disabled={disabled} style={{
                background: 'linear-gradient(111.56deg, rgb(29,33,52) 42.76%, rgb(57,63,91) 136.6%)',
                borderRadius: 100, border: 'none', cursor: 'pointer',
                padding: '7px 10px',
                display: 'flex', gap: 2, alignItems: 'center', flexShrink: 0,
              }}>
                <img src={A.tarotIcon} alt="" style={{ width: 29, height: 22, display: 'block' }} />
                <span style={{ fontFamily: 'var(--font-roboto)', fontWeight: 400, fontSize: 14, color: 'white', lineHeight: 1 }}>Tarot</span>
              </button>

              <button onClick={onHoroscope} disabled={disabled} style={{
                background: 'linear-gradient(103.19deg, rgb(29,33,52) 7.77%, rgb(57,63,91) 109.48%)',
                borderRadius: 100, border: 'none', cursor: 'pointer',
                padding: '7px 10px',
                display: 'flex', gap: 2, alignItems: 'center', flexShrink: 0,
              }}>
                <div style={{ position: 'relative', width: 20.93, height: 20.93, flexShrink: 0 }}>
                  <div style={{ position: 'absolute', inset: '14.59%' }}>
                    <img src={A.horoIcon} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
                  </div>
                </div>
                <span style={{ fontFamily: 'var(--font-roboto)', fontWeight: 400, fontSize: 14, color: 'white', lineHeight: 1 }}>Horoscope</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
