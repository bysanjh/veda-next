'use client'

const A = {
  ellipse51:   '/preview-ellipse51.png',
  ellipse52:   '/preview-ellipse52.png',
  jupiter:     '/jupiter-card.png',
  mars:        '/mars-card.png',
  moon:        '/moon-card-preview.png',
}

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
      {/* Ellipse glow — top-left */}
      <div style={{ position: 'absolute', left: -15, top: -20, width: 130, height: 130, pointerEvents: 'none' }}>
        <img src={A.ellipse51} alt="" style={{ position: 'absolute', top: '-38.46%', left: '-38.46%', right: '-38.46%', bottom: '-38.46%', display: 'block' }} />
      </div>

      {/* Ellipse glow — top-right */}
      <div style={{ position: 'absolute', left: 256, top: -20, width: 137, height: 116, pointerEvents: 'none' }}>
        <img src={A.ellipse52} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
      </div>

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
        <>
          <img src={A.jupiter} alt="" style={{
            position: 'absolute', left: 12, top: 15.8, width: 49, height: 73.5,
            objectFit: 'cover', pointerEvents: 'none', display: 'block', borderRadius: 3,
          }} />
          <img src={A.mars} alt="" style={{
            position: 'absolute', left: 48, top: 15.8, width: 49, height: 73.5,
            objectFit: 'cover', pointerEvents: 'none', display: 'block', borderRadius: 3,
          }} />
          <img src={A.moon} alt="" style={{
            position: 'absolute', left: 30, top: 15, width: 49.9, height: 74.9,
            objectFit: 'cover', pointerEvents: 'none', display: 'block', borderRadius: 3,
            boxShadow: '7.7px 0px 14.6px rgba(0,0,0,0.4), -7.7px 0px 14.6px rgba(0,0,0,0.4)',
          }} />
        </>
      )}
    </button>
  )
}
