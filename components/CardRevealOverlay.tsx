'use client'

// Asset URLs from Figma node 3:6546 — fetched 2026-04-23
const A = {
  moon:      'https://www.figma.com/api/mcp/asset/5a6b5798-cb6a-4ba6-9029-f4bea04ec4ac',
  ellipse50: 'https://www.figma.com/api/mcp/asset/fed77f38-aa0e-4a33-8052-fce7b0daf871',
  closeX:    'https://www.figma.com/api/mcp/asset/73b34238-9f12-4a8e-9450-270499568835',
}

interface CardRevealOverlayProps {
  reading: string
  isStreaming: boolean
  onClose: () => void
  onAnotherReading: () => void
}

export default function CardRevealOverlay({
  reading, isStreaming, onClose, onAnotherReading,
}: CardRevealOverlayProps) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 overlay-slide-up"
      style={{
        height: 'min(730px, calc(100dvh - 121px))',
        backgroundColor: '#080808',
        borderRadius: '24px 24px 0 0',
        boxShadow: '1px 0px 0px 0px rgba(255,255,255,0.17),-1px -1px 0px 0px rgba(255,255,255,0.17)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Ellipse50 — decorative blob, absolute */}
      <div style={{ position: 'absolute', left: -76, top: -187, width: 509, height: 347, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', inset: '-12.13% -8.27%' }}>
          <img src={A.ellipse50} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>
      </div>

      {/* Glow — decorative, absolute */}
      <div style={{
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        top: 33, width: 420, height: 420,
        pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(circle, rgba(110,95,215,0.58) 0%, rgba(80,65,175,0.30) 40%, rgba(60,50,140,0.08) 66%, transparent 82%)',
      }} />

      {/* Header row */}
      <div style={{ flexShrink: 0, position: 'relative', height: 80, zIndex: 2 }}>
        <p style={{
          position: 'absolute', left: 24, top: 24,
          fontFamily: 'var(--font-roboto)', fontSize: 22, color: 'white',
          margin: 0, letterSpacing: '-0.66px', lineHeight: 'normal',
        }}>
          Your card
        </p>
        <button
          onClick={onClose}
          style={{ position: 'absolute', right: 24, top: 25, width: 29, height: 29, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          <img src={A.closeX} alt="Close" style={{ width: 29, height: 29, display: 'block' }} />
        </button>
      </div>

      {/* Card — compact size to leave generous room for reading text */}
      <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', paddingBottom: 10, zIndex: 2 }}>
        <div style={{ width: 138, height: 207 }}>
          <img
            src={A.moon}
            alt="The Moon"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8, display: 'block' }}
          />
        </div>
      </div>

      {/* Reading text + button — fills remaining space */}
      <div style={{
        flex: 1, minHeight: 0,
        display: 'flex', flexDirection: 'column',
        paddingLeft: 24, paddingRight: 24,
        paddingBottom: 'max(16px, env(safe-area-inset-bottom, 0px))',
        zIndex: 2,
      }}>
        {/* Heading — always visible, not inside scroll */}
        <p style={{
          fontFamily: 'var(--font-roboto)', fontSize: 20, color: 'white',
          margin: '0 0 10px', letterSpacing: '-1px', lineHeight: 'normal',
          flexShrink: 0,
        }}>
          You&apos;ve pulled The Moon card.{'\n'}This is a NO.
        </p>
        {/* Reading body — scrolls only if unusually long */}
        <div className="no-scrollbar" style={{
          flex: 1, minHeight: 0, overflowY: 'auto',
          marginBottom: 10,
        }}>
          {reading ? (
            <p style={{
              fontFamily: 'var(--font-roboto)', fontSize: 14, color: 'white',
              letterSpacing: '-0.42px', lineHeight: '1.4',
              whiteSpace: 'pre-wrap', margin: 0,
            }}>
              {reading}
            </p>
          ) : (
            isStreaming && (
              <span className="flex gap-[6px]" style={{ marginTop: 4 }}>
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </span>
            )
          )}
        </div>
        <button
          onClick={onAnotherReading}
          style={{
            flexShrink: 0,
            width: '100%', padding: '12px 0',
            backgroundColor: '#372e6a', borderRadius: 8,
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-roboto)', fontSize: 17, color: 'white',
            margin: 0, letterSpacing: '-0.68px', lineHeight: 'normal', whiteSpace: 'nowrap',
          }}>
            Get another reading
          </p>
        </button>
      </div>
    </div>
  )
}
