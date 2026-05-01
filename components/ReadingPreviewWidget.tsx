'use client'

interface ReadingPreviewWidgetProps {
  cardName: string
  verdict: string
  summary: string
  cardImageSrc: string
  onViewReading?: () => void
  mode?: 'yes_no' | 'three_card'
}

export default function ReadingPreviewWidget({
  verdict,
  summary,
  cardImageSrc,
  onViewReading,
  mode = 'yes_no',
}: ReadingPreviewWidgetProps) {
  const summarySnippet = summary.length > 44 ? summary.slice(0, 44).trimEnd() + '…' : summary
  const textLeft = mode === 'yes_no' ? 90 : 105

  return (
    <button
      onClick={onViewReading}
      className="msg-in"
      style={{
        position: 'relative',
        background: '#372e6a',
        height: 84,
        width: '100%',
        borderRadius: 8,
        overflow: 'hidden',
        border: 'none',
        cursor: 'pointer',
        display: 'block',
        textAlign: 'left',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(2,2,2,0.27)', pointerEvents: 'none' }} />

      {/* Text */}
      <div style={{
        position: 'absolute',
        left: textLeft,
        top: '50%',
        transform: 'translateY(-50%)',
        width: 118,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}>
        <p style={{
          fontFamily: 'var(--font-roboto)', fontSize: 14, fontWeight: 400,
          color: 'white', letterSpacing: '-0.7px', lineHeight: 0.8, margin: 0,
        }}>
          {verdict}
        </p>
        <p style={{
          fontFamily: 'var(--font-roboto)', fontSize: 12, fontWeight: 400,
          color: 'rgba(255,255,255,0.49)', letterSpacing: '-0.36px', lineHeight: 'normal', margin: 0,
        }}>
          {summarySnippet}
        </p>
      </div>

      {/* View Reading button */}
      <div style={{
        position: 'absolute',
        right: 16,
        top: '50%',
        transform: 'translateY(-50%)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 4,
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-roboto)', fontSize: 14, fontWeight: 400,
          color: 'white', letterSpacing: '-0.42px', lineHeight: 'normal', margin: 0, whiteSpace: 'nowrap',
        }}>
          View Reading
        </p>
      </div>

      {/* Card image(s) */}
      {mode === 'yes_no' ? (
        <img
          src={cardImageSrc}
          alt=""
          style={{
            position: 'absolute', left: 8, top: 8,
            width: 74, height: 111,
            objectFit: 'cover', pointerEvents: 'none', display: 'block', borderRadius: 4,
          }}
        />
      ) : (
        <img
          src="/tarot-reading-card.jpg"
          alt=""
          style={{
            position: 'absolute', left: 0, top: 0,
            width: 100, height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            pointerEvents: 'none', display: 'block',
          }}
        />
      )}
    </button>
  )
}
