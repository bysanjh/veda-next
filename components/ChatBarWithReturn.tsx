'use client'

// Fresh Figma assets — node 3:9692 (l2d9ngGhY0y2PleLGQs3JX, fetched 2026-04-20)
const A = {
  vedaAvatar: 'https://www.figma.com/api/mcp/asset/17a8ea19-f292-4433-928f-89b5fa14b995',
  arrowLeft:  'https://www.figma.com/api/mcp/asset/3ce7bc0f-6dc7-4082-ae38-fbc05d66c7c5',
  plusIcon:   'https://www.figma.com/api/mcp/asset/9f08e4be-8899-4dce-8512-353d1d5d3fd3',
  tarotIcon:  'https://www.figma.com/api/mcp/asset/5dc43677-fcef-4516-99b1-9a7f7466a66d',
  horoIcon:   'https://www.figma.com/api/mcp/asset/d6ff9134-7a9f-4361-bfa4-94cc6b6516b3',
}

interface Props {
  value: string
  onChange: (v: string) => void
  onSubmit: (text: string) => void
  onTarot: () => void
  onHoroscope: () => void
  onReturnToVeda: () => void
  placeholder?: string
  disabled?: boolean
}

export default function ChatBarWithReturn({
  value, onChange, onSubmit, onTarot, onHoroscope, onReturnToVeda,
  placeholder = 'Chat with Veda', disabled = false,
}: Props) {
  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && value.trim() && !disabled) onSubmit(value.trim())
  }

  // Figma: total 132px. Gray tab top:-4→+56px (h:60). Chat box top:28→bottom:0 (h:104).
  // "Return to Veda" row: top:0, height:23px (bottom:82.58% of 132=109px from bottom).
  // Arrow: top:1px, right:18px, 21×21px.
  return (
    <div style={{ position: 'relative', height: 132, width: '100%' }}>

      {/* Gray tab — rounded top, bleeds 4px above container */}
      <div style={{
        position: 'absolute',
        top: -4, left: 0, right: 0,
        height: 60,
        background: '#2f2f34',
        borderRadius: '24px 24px 0 0',
      }} />

      {/* "Return to Veda" row — full-width clickable */}
      <button
        onClick={onReturnToVeda}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 23,
          display: 'flex',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        {/* Text + avatar — center at calc(50% - 107px) per Figma */}
        <div style={{
          position: 'absolute',
          left: 'calc(50% - 107px)',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
        }}>
          <span style={{
            fontFamily: 'var(--font-roboto)',
            fontWeight: 400,
            fontSize: 16,
            color: '#ffffff',
            letterSpacing: '-0.48px',
            whiteSpace: 'nowrap',
          }}>Return to Veda</span>
          <img
            src={A.vedaAvatar}
            alt="Veda"
            style={{ width: 23, height: 23, borderRadius: '50%', display: 'block', flexShrink: 0 }}
          />
        </div>

        {/* Arrow — right:18px, 21×21px, flipped to point right */}
        <div style={{
          position: 'absolute',
          top: 1, right: 18,
          width: 21, height: 21,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <img
            src={A.arrowLeft}
            alt=""
            style={{ width: '100%', height: '100%', display: 'block', transform: 'scaleX(-1)' }}
          />
        </div>
      </button>

      {/* Chat input box */}
      <div style={{
        position: 'absolute',
        top: 28, left: 0, right: 0, bottom: 0,
        background: '#1b1b1f',
        borderRadius: 29,
        overflow: 'hidden',
      }}>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            position: 'absolute',
            left: 18, top: 12,
            width: 'calc(100% - 36px)',
            background: 'none',
            border: 'none',
            outline: 'none',
            fontFamily: 'var(--font-roboto)',
            fontWeight: 400,
            fontSize: 18,
            color: value ? '#ffffff' : 'rgba(255,255,255,0.24)',
            letterSpacing: '-0.54px',
          }}
        />

        {/* Bottom action row — left:12px top:56px per Figma */}
        <div style={{
          position: 'absolute',
          left: 12, top: 56,
          display: 'flex',
          alignItems: 'center',
          gap: 22,
        }}>
          {/* + button: 36×36, bg:#323232, radius:18 */}
          <button style={{
            width: 36, height: 36,
            background: '#323232',
            borderRadius: 18,
            border: 'none',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 0, flexShrink: 0,
          }}>
            <img src={A.plusIcon} alt="+" style={{ width: 23.643, height: 23.643, display: 'block' }} />
          </button>

          {/* Pills */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>

            {/* Tarot pill — icon 29×22px per Figma */}
            <button
              onClick={onTarot}
              disabled={disabled}
              style={{
                background: '#323232', borderRadius: 100,
                border: 'none', cursor: 'pointer',
                padding: '7px 10px',
                display: 'flex', gap: 2, alignItems: 'center',
              }}
            >
              <img src={A.tarotIcon} alt="" style={{ width: 29, height: 22, display: 'block' }} />
              <span style={{
                fontFamily: 'var(--font-roboto)', fontWeight: 400,
                fontSize: 14, color: '#ffffff', lineHeight: '14.36px',
              }}>Tarot</span>
            </button>

            {/* Horoscope pill — icon 20.93×20.93px with inner inset per Figma */}
            <button
              onClick={onHoroscope}
              disabled={disabled}
              style={{
                background: '#323232', borderRadius: 100,
                border: 'none', cursor: 'pointer',
                padding: '7px 10px',
                display: 'flex', gap: 2, alignItems: 'center',
              }}
            >
              <div style={{ position: 'relative', width: 20.93, height: 20.93, flexShrink: 0 }}>
                <div style={{ position: 'absolute', inset: '14.59% 14.58% 14.58% 14.59%' }}>
                  <img src={A.horoIcon} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
                </div>
              </div>
              <span style={{
                fontFamily: 'var(--font-roboto)', fontWeight: 400,
                fontSize: 14, color: '#ffffff', lineHeight: '14.36px',
              }}>Horoscope</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
