'use client'
import { useState } from 'react'

const A = {
  plusIcon:      '/plus-icon.svg',
  tarotIcon:     '/tarot-icon.svg',
  horoIcon:      '/horoscope-icon.svg',
  sendIcon:      'https://www.figma.com/api/mcp/asset/bff61471-3f6d-45c3-a795-33de005d5539',
  vedaAvatar:    '/veda-avatar.svg',
  opheliaAvatar: 'https://www.figma.com/api/mcp/asset/3d99c934-3e4e-41eb-ab74-936c58323d64',
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
  const [panelOpen, setPanelOpen] = useState(false)

  // Active (compact) only when focused/typing AND panel is not open
  const active = (focused || value.length > 0) && !panelOpen

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && value.trim() && !disabled) onSubmit(value.trim())
  }

  return (
    <div className="absolute bottom-[24px] left-1/2 -translate-x-1/2 z-20" style={{ width: 377 }}>

      {/* Character selection panel — floats above chat bar when plus is clicked */}
      {panelOpen && (
        <div style={{
          position: 'absolute',
          bottom: 'calc(100% + 8px)',
          left: 0,
          width: 255,
          height: 146,
          border: '1px solid #2b324a',
          borderRadius: 15,
          background: 'linear-gradient(135.9deg, rgb(20,25,40) 31.4%, rgb(25,31,48) 103.5%)',
          boxShadow: '7px 5px 13.5px 0px rgba(0,0,0,0.4)',
          overflow: 'hidden',
          zIndex: 10,
        }}>
          {/* Veda row */}
          <div style={{ position: 'absolute', top: 11, left: 11, display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src={A.vedaAvatar} alt="Veda" style={{ width: 49, height: 49, borderRadius: '50%', display: 'block', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span style={{ fontFamily: 'var(--font-roboto)', fontWeight: 400, fontSize: 20, color: 'white', letterSpacing: '-0.6px', lineHeight: 1 }}>Veda</span>
              <span style={{ fontFamily: 'var(--font-roboto)', fontWeight: 400, fontSize: 14, color: 'rgba(255,255,255,0.5)', letterSpacing: '-0.42px', lineHeight: 1 }}>Spiritual guide</span>
            </div>
            <div style={{
              background: 'linear-gradient(104.25deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
              borderRadius: 100,
              padding: '4px 8px',
              marginLeft: 4,
              flexShrink: 0,
            }}>
              <span style={{ fontFamily: 'var(--font-roboto)', fontWeight: 400, fontSize: 14, color: 'white', lineHeight: 1 }}>Default</span>
            </div>
          </div>

          {/* Ophelia row */}
          <div style={{ position: 'absolute', top: 84, left: 11, display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src={A.opheliaAvatar} alt="Ophelia" style={{ width: 49, height: 49, borderRadius: '50%', display: 'block', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span style={{ fontFamily: 'var(--font-roboto)', fontWeight: 400, fontSize: 20, color: 'white', letterSpacing: '-0.6px', lineHeight: 1 }}>Ophelia</span>
              <span style={{ fontFamily: 'var(--font-roboto)', fontWeight: 400, fontSize: 14, color: 'rgba(255,255,255,0.5)', letterSpacing: '-0.42px', lineHeight: 1 }}>Tarot card reader</span>
            </div>
          </div>
        </div>
      )}

      {/* Chat box */}
      <div style={{
        position: 'relative',
        height: active ? 52 : 109,
        borderRadius: active ? 17 : 29,
        background: 'linear-gradient(-72.19deg, rgba(42,49,73,0.6) 8.44%, rgba(29,35,54,0.6) 86.36%)',
        border: '1px solid #131725',
        boxShadow: '1px 1px 7.1px 1.3px rgba(61,69,100,0.28)',
        overflow: 'hidden',
        transition: 'height 0.2s ease, border-radius 0.15s ease',
      }}>

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKey}
          onFocus={() => { setFocused(true); setPanelOpen(false); }}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            position: 'absolute',
            top: active ? '50%' : 11,
            transform: active ? 'translateY(-50%)' : 'none',
            left: 14, right: 52,
            background: 'none', border: 'none', outline: 'none',
            fontFamily: 'var(--font-roboto)', fontWeight: 400, fontSize: 18,
            color: value ? 'white' : 'rgba(255,255,255,0.54)',
            letterSpacing: '-0.54px', lineHeight: 'normal',
            fontVariationSettings: "'wdth' 100",
            caretColor: 'white',
          }}
        />

        {/* Send button — white circle, only when text present */}
        {value.trim() && (
          <button
            onClick={() => { if (!disabled) onSubmit(value.trim()) }}
            disabled={disabled}
            style={{
              position: 'absolute', right: 9, top: '50%', transform: 'translateY(-50%)',
              width: 34, height: 34, borderRadius: 113,
              backgroundColor: 'white', border: 'none', cursor: 'pointer',
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

        {/* Bottom row — hidden when active */}
        {!active && (
          <div style={{ position: 'absolute', left: 11, top: 60, display: 'flex', alignItems: 'center', gap: 22 }}>

            {/* Plus button — white bg + dark icon when panel open */}
            <button
              onClick={() => setPanelOpen(p => !p)}
              style={{
                width: 36, height: 36,
                backgroundColor: panelOpen ? 'white' : '#1d2134',
                borderRadius: 18, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, padding: 0,
                transition: 'background-color 0.15s ease',
              }}
            >
              <img
                src={A.plusIcon} alt="+"
                style={{ width: 23.643, height: 23.643, display: 'block', filter: panelOpen ? 'invert(1)' : 'none' }}
              />
            </button>

            {/* Tarot + Horoscope pills */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <button onClick={onTarot} disabled={disabled} style={{
                background: 'linear-gradient(111.56deg, rgb(29,33,52) 42.76%, rgb(57,63,91) 136.6%)',
                borderRadius: 100, border: 'none', cursor: 'pointer',
                padding: '7px 10px', display: 'flex', gap: 2, alignItems: 'center', flexShrink: 0,
              }}>
                <img src={A.tarotIcon} alt="" style={{ width: 29, height: 22, display: 'block' }} />
                <span style={{ fontFamily: 'var(--font-roboto)', fontWeight: 400, fontSize: 14, color: 'white', lineHeight: 1 }}>Tarot</span>
              </button>

              <button onClick={onHoroscope} disabled={disabled} style={{
                background: 'linear-gradient(103.19deg, rgb(29,33,52) 7.77%, rgb(57,63,91) 109.48%)',
                borderRadius: 100, border: 'none', cursor: 'pointer',
                padding: '7px 10px', display: 'flex', gap: 2, alignItems: 'center', flexShrink: 0,
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
