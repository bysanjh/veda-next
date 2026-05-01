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
  const summarySnippet = summary.length > 60 ? summary.slice(0, 60).trimEnd() + '…' : summary

  return (
    <button
      onClick={onViewReading}
      className="msg-in"
      style={{
        display: 'flex',
        alignItems: 'stretch',
        background: '#372e6a',
        height: 84,
        width: '100%',
        borderRadius: 8,
        overflow: 'hidden',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        textAlign: 'left',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* Left image */}
      <img
        src={mode === 'three_card' ? '/tarot-reading-card.jpg' : cardImageSrc}
        alt=""
        style={{
          width: mode === 'three_card' ? 100 : 68,
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          flexShrink: 0,
          display: 'block',
        }}
      />

      {/* Text */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 4,
        padding: '0 10px',
        minWidth: 0,
      }}>
        <p style={{
          fontFamily: 'var(--font-roboto)', fontSize: 14, fontWeight: 400,
          color: 'white', letterSpacing: '-0.7px', lineHeight: 1.1, margin: 0,
        }}>
          {verdict}
        </p>
        <p style={{
          fontFamily: 'var(--font-roboto)', fontSize: 12, fontWeight: 400,
          color: 'rgba(255,255,255,0.49)', letterSpacing: '-0.36px', lineHeight: 1.3, margin: 0,
        }}>
          {summarySnippet}
        </p>
      </div>

      {/* View Reading button */}
      <div style={{
        flexShrink: 0,
        alignSelf: 'center',
        marginRight: 14,
        border: '1px solid rgba(255,255,255,0.22)',
        borderRadius: 6,
        padding: '9px 14px',
      }}>
        <p style={{
          fontFamily: 'var(--font-roboto)', fontSize: 13, fontWeight: 400,
          color: 'white', letterSpacing: '-0.4px', lineHeight: 'normal', margin: 0, whiteSpace: 'nowrap',
        }}>
          View Reading
        </p>
      </div>
    </button>
  )
}
