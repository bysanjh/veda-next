'use client'

// Fresh asset URLs from Figma node 3:6546 — fetched 2026-04-22
const A = {
  moon:      'https://www.figma.com/api/mcp/asset/41062e36-c22b-44be-9887-fb5b953018a8',
  ellipse50: 'https://www.figma.com/api/mcp/asset/1d06a5a6-1910-4a94-a62b-c50bc1648c6a',
  ellipse51: 'https://www.figma.com/api/mcp/asset/8771eb37-f89d-4ad9-ae08-3150020fa6ff',
  closeX:    'https://www.figma.com/api/mcp/asset/e06ccadc-2e3d-472c-93d0-dda8ec518b32',
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
        height: 730,
        backgroundColor: '#080808',
        borderRadius: '24px 24px 0 0',
        boxShadow: '1px 0px 0px 0px rgba(255,255,255,0.17),-1px -1px 0px 0px rgba(255,255,255,0.17)',
        overflow: 'hidden',
      }}
    >
      {/* Ellipse50 — top-left purple blob */}
      <div style={{ position: 'absolute', left: -76, top: -187, width: 509, height: 347, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: '-12.13% -8.27%' }}>
          <img src={A.ellipse50} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>
      </div>

      {/* X button — Figma: left 358.5, top 25.5, size 29 */}
      <button
        onClick={onClose}
        style={{ position: 'absolute', left: 358.5, top: 25.5, width: 29, height: 29, background: 'none', border: 'none', padding: 0, cursor: 'pointer', zIndex: 10 }}
      >
        <img src={A.closeX} alt="Close" style={{ width: 29, height: 29, display: 'block' }} />
      </button>

      {/* Title — Figma: left 24, top 24, 22px */}
      <p style={{
        position: 'absolute', left: 24, top: 24,
        fontFamily: 'var(--font-roboto)', fontSize: 22, color: 'white',
        margin: 0, letterSpacing: '-0.66px', lineHeight: 'normal',
      }}>
        Your card
      </p>

      {/* Circular glow centered behind Moon card */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: 33,
        width: 420,
        height: 420,
        pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(110,95,215,0.58) 0%, rgba(80,65,175,0.30) 40%, rgba(60,50,140,0.08) 66%, transparent 82%)',
      }} />

      {/* Moon card — centered, top 89, 196.77×295.155 */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: 89,
        width: 196.77,
        height: 295.155,
      }}>
        <img
          src={A.moon}
          alt="The Moon"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8, display: 'block' }}
        />
      </div>

      {/* Text block — Figma: left 24, top 409, width 354, gap 12 */}
      <div style={{ position: 'absolute', left: 24, top: 409, width: 354, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{
          fontFamily: 'var(--font-roboto)', fontSize: 22, color: 'white',
          margin: 0, letterSpacing: '-1.1px', lineHeight: 'normal',
        }}>
          The Moon pulled you aside.
        </p>
        <div style={{
          fontFamily: 'var(--font-roboto)', fontSize: 16, color: 'white',
          letterSpacing: '-0.48px', lineHeight: '1.5',
          whiteSpace: 'pre-wrap', maxHeight: 185, overflow: 'hidden',
        }}>
          {reading}
          {isStreaming && !reading && (
            <span className="flex gap-[6px]" style={{ marginTop: 4 }}>
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </span>
          )}
        </div>
      </div>

      {/* Get another reading — Figma: centered, top 645, bg #372e6a, rounded 8 */}
      <button
        onClick={onAnotherReading}
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: 645,
          width: 354,
          padding: '16px 0',
          backgroundColor: '#372e6a',
          borderRadius: 8,
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p style={{
          fontFamily: 'var(--font-roboto)', fontSize: 18, color: 'white',
          margin: 0, letterSpacing: '-0.72px', lineHeight: 'normal',
          whiteSpace: 'nowrap',
        }}>
          Get another reading
        </p>
      </button>
    </div>
  )
}
