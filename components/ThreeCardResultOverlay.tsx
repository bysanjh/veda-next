'use client'
import { useState } from 'react'

// Fresh Figma assets — node 3:6156 (l2d9ngGhY0y2PleLGQs3JX)
const A = {
  jupiter:   'https://www.figma.com/api/mcp/asset/ccc1f4d9-fc6d-4f39-8da9-6275b118b8b6',
  moon:      'https://www.figma.com/api/mcp/asset/b0ae4205-ba72-4694-af13-4be2fe0f059a',
  mars:      'https://www.figma.com/api/mcp/asset/1ea44929-4147-407e-9bfe-28c28f657431',
  closeX:    'https://www.figma.com/api/mcp/asset/ee72c270-6df5-4667-9a7a-2855d9b56c9d',
  swipeIcon: 'https://www.figma.com/api/mcp/asset/85919de0-fbe0-437a-8f0d-1fe5564e258f',
  ellipse50: 'https://www.figma.com/api/mcp/asset/058e5a80-fb43-4199-9179-6f559f177eb3',
  ellipse51: 'https://www.figma.com/api/mcp/asset/4b60622f-9300-4f0c-846c-2b7ea4d55800',
}

const CARD_MEANINGS = [
  { card: 'Moon (Past)',       meaning: 'Confusion and doubt clouded your judgment' },
  { card: 'Empress (Present)', meaning: "You're stepping into clarity and self-trust" },
  { card: 'Tower (Future)',    meaning: 'A shake-up clears the way for something stronger' },
]

interface ThreeCardResultOverlayProps {
  reading: string
  onClose: () => void
  onAnotherReading: () => void
}

export default function ThreeCardResultOverlay({
  reading,
  onClose,
  onAnotherReading,
}: ThreeCardResultOverlayProps) {
  const [activeCard, setActiveCard] = useState(0)

  const txt = (size: number, color: string, extra?: React.CSSProperties): React.CSSProperties => ({
    margin: 0,
    fontFamily: 'var(--font-roboto)',
    fontWeight: 400,
    fontSize: size,
    color,
    letterSpacing: `${-size * 0.03}px`,
    ...extra,
  })

  return (
    <div
      className="absolute inset-x-0 bottom-0 z-30 overlay-slide-up"
      style={{
        height: 730,
        background: '#080808',
        borderRadius: '24px 24px 0 0',
        boxShadow: '1px 0 0 rgba(255,255,255,0.17), -1px -1px 0 rgba(255,255,255,0.17)',
        overflow: 'hidden',
      }}
    >
      {/* ── Decorative blobs ── */}
      <div style={{ position: 'absolute', left: -76, top: -187, width: 509, height: 347, zIndex: 0 }}>
        <div style={{ position: 'absolute', inset: '-12.13% -8.27%' }}>
          <img src={A.ellipse50} alt="" style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
      <div style={{ position: 'absolute', left: -12, top: 56, width: 426, height: 263, zIndex: 0 }}>
        <div style={{ position: 'absolute', inset: '-42.19% -26.04%' }}>
          <img src={A.ellipse51} alt="" style={{ width: '100%', height: '100%' }} />
        </div>
      </div>

      {/* ── Header ── */}
      <p style={{ ...txt(22, '#ffffff'), position: 'absolute', left: 24, top: 24, zIndex: 2 }}>
        Your cards
      </p>
      <button
        onClick={onClose}
        style={{
          position: 'absolute', left: 346, top: 24, width: 32, height: 32,
          background: 'none', border: 'none', cursor: 'pointer', padding: 0, zIndex: 2,
        }}
      >
        <img src={A.closeX} alt="Close" style={{ width: 32, height: 32, display: 'block' }} />
      </button>

      {/* ── Cards — absolute pixel positions from Figma ── */}
      {/* Jupiter (left, behind Moon) */}
      <button
        onClick={() => setActiveCard(0)}
        style={{
          position: 'absolute', left: 24, top: 93, width: 121, height: 181,
          padding: 0, border: 'none', background: 'none', cursor: 'pointer',
          borderRadius: 8, overflow: 'hidden', zIndex: 1,
          outline: activeCard === 0 ? '2px solid rgba(255,255,255,0.5)' : 'none',
          outlineOffset: 2,
        }}
      >
        <img src={A.jupiter} alt="Jupiter" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </button>

      {/* Moon (center, slightly larger, on top) */}
      <button
        onClick={() => setActiveCard(1)}
        style={{
          position: 'absolute', left: '50%', top: 92,
          transform: 'translateX(-50%)',
          width: 123, height: 184.5,
          padding: 0, border: 'none', background: 'none', cursor: 'pointer',
          borderRadius: 8, overflow: 'hidden', zIndex: 2,
          boxShadow: '19px 0 36px rgba(0,0,0,0.4), -19px 0 36px rgba(0,0,0,0.4)',
          outline: activeCard === 1 ? '2px solid rgba(255,255,255,0.5)' : 'none',
          outlineOffset: 2,
        }}
      >
        <img src={A.moon} alt="Moon" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </button>

      {/* Mars (right, behind Moon) */}
      <button
        onClick={() => setActiveCard(2)}
        style={{
          position: 'absolute', left: 258, top: 93, width: 121, height: 181,
          padding: 0, border: 'none', background: 'none', cursor: 'pointer',
          borderRadius: 8, overflow: 'hidden', zIndex: 1,
          outline: activeCard === 2 ? '2px solid rgba(255,255,255,0.5)' : 'none',
          outlineOffset: 2,
        }}
      >
        <img src={A.mars} alt="Mars" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </button>

      {/* ── Swipe hint ── */}
      <div style={{
        position: 'absolute', top: 284, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', alignItems: 'center', gap: 3, zIndex: 2,
        whiteSpace: 'nowrap',
      }}>
        <img src={A.swipeIcon} alt="" style={{ width: 20, height: 20, display: 'block', flexShrink: 0 }} />
        <p style={{ ...txt(12, '#7d7e83'), whiteSpace: 'nowrap' }}>Swipe left to read the cards</p>
      </div>

      {/* ── Per-card readings ── */}
      <div style={{
        position: 'absolute', top: 320, left: 24, right: 24,
        display: 'flex', flexDirection: 'column', gap: 12, zIndex: 2,
      }}>
        {CARD_MEANINGS.map((m, i) => (
          <button
            key={i}
            onClick={() => setActiveCard(i)}
            style={{
              display: 'flex', flexDirection: 'column', gap: 6,
              textAlign: 'left', background: 'none', border: 'none',
              cursor: 'pointer', padding: 0,
            }}
          >
            <p style={txt(14, activeCard === i ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.5)')}>
              {m.card}
            </p>
            <p style={txt(16, activeCard === i ? '#ffffff' : 'rgba(255,255,255,0.5)')}>
              {m.meaning}
            </p>
          </button>
        ))}
      </div>

      {/* ── Summarized reading ── */}
      <div style={{
        position: 'absolute', top: 491, left: 24, right: 24,
        display: 'flex', flexDirection: 'column', gap: 4, zIndex: 2,
      }}>
        <p style={txt(16, 'rgba(255,255,255,0.5)')}>Summarized reading:</p>
        <p style={{ ...txt(16, '#ffffff'), whiteSpace: 'pre-wrap', lineHeight: 'normal' }}>
          {reading}
        </p>
      </div>

      {/* ── Get another reading button ── */}
      <button
        onClick={onAnotherReading}
        style={{
          position: 'absolute', top: 651, left: '50%', transform: 'translateX(-50%)',
          width: 354, height: 52,
          background: '#4c48a9',
          borderRadius: 8,
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
        }}
      >
        <p style={{ ...txt(18, '#ffffff'), whiteSpace: 'nowrap' }}>Get another reading</p>
      </button>
    </div>
  )
}
