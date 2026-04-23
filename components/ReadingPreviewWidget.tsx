'use client'

// Figma assets — node 3:9159 (yes/no) + 95:52664 (3-card) — fetched 2026-04-23
const A = {
  // yes/no decorative ellipses
  ynEllipse51: 'https://www.figma.com/api/mcp/asset/a3cb0808-2746-42a6-8e62-f14124f81818',
  ynEllipse52: 'https://www.figma.com/api/mcp/asset/69fd2085-1870-4113-9f35-e5c1a65ebaa7',
  // 3-card decorative ellipses
  tcEllipse51: 'https://www.figma.com/api/mcp/asset/ed1ea2b2-f2fe-4d64-9d74-d09490d36293',
  tcEllipse52: 'https://www.figma.com/api/mcp/asset/d7c133cb-369e-44f6-967e-a24a6822cc81',
  // 3-card images
  tcJupiter:   'https://www.figma.com/api/mcp/asset/e5d348ef-4f37-4e1e-b2d4-c2d7ee31ed48',
  tcMars:      'https://www.figma.com/api/mcp/asset/e0fc5d19-95b8-4905-8343-91757eec78bd',
  tcMoon:      'https://www.figma.com/api/mcp/asset/c975c4f3-258c-43e2-9b24-b4d717f417e5',
}

interface ReadingPreviewWidgetProps {
  cardName: string
  verdict: string
  summary: string
  cardImageSrc: string        // yes/no moon card image
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

  const ellipse51 = mode === 'yes_no' ? A.ynEllipse51 : A.tcEllipse51
  const ellipse52 = mode === 'yes_no' ? A.ynEllipse52 : A.tcEllipse52
  const textLeft  = mode === 'yes_no' ? 90 : 105
  const textGap   = mode === 'yes_no' ? 8   : 4

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
        <img
          src={ellipse51} alt=""
          style={{ position: 'absolute', top: '-38.46%', left: '-38.46%', right: '-38.46%', bottom: '-38.46%', display: 'block' }}
        />
      </div>

      {/* Ellipse glow — top-right */}
      <div style={{ position: 'absolute', left: 256, top: -20, width: 137, height: 116, pointerEvents: 'none' }}>
        <img src={ellipse52} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
      </div>

      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(2,2,2,0.27)', pointerEvents: 'none' }} />

      {/* Text — center */}
      <div style={{
        position: 'absolute',
        left: textLeft,
        top: '50%',
        transform: 'translateY(-50%)',
        width: 118,
        display: 'flex',
        flexDirection: 'column',
        gap: textGap,
      }}>
        <p style={{
          fontFamily: 'var(--font-roboto)', fontSize: 14, fontWeight: 400,
          color: 'white', letterSpacing: '-0.7px', lineHeight: 1.1, margin: 0,
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

      {/* Card image(s) — left side, rendered last so they sit on top */}
      {mode === 'yes_no' ? (
        /* Single moon card — left-aligned, overflows top/bottom intentionally */
        <img
          src={cardImageSrc}
          alt=""
          style={{
            position: 'absolute',
            left: 8,
            top: 8,
            width: 74,
            height: 111,
            objectFit: 'cover',
            pointerEvents: 'none',
            display: 'block',
            borderRadius: 4,
          }}
        />
      ) : (
        /* Three-card fan */
        <>
          {/* Jupiter — back */}
          <img src={A.tcJupiter} alt="" style={{
            position: 'absolute', left: 12, top: 15.8, width: 49, height: 73.5,
            objectFit: 'cover', pointerEvents: 'none', display: 'block', borderRadius: 3,
          }} />
          {/* Mars — middle */}
          <img src={A.tcMars} alt="" style={{
            position: 'absolute', left: 48, top: 15.8, width: 49, height: 73.5,
            objectFit: 'cover', pointerEvents: 'none', display: 'block', borderRadius: 3,
          }} />
          {/* Moon — front with shadow */}
          <img src={A.tcMoon} alt="" style={{
            position: 'absolute', left: 30, top: 15, width: 49.9, height: 74.9,
            objectFit: 'cover', pointerEvents: 'none', display: 'block', borderRadius: 3,
            boxShadow: '7.7px 0px 14.6px rgba(0,0,0,0.4), -7.7px 0px 14.6px rgba(0,0,0,0.4)',
          }} />
        </>
      )}
    </button>
  )
}
