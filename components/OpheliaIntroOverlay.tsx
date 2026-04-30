'use client'
import { useState } from 'react'

const A = {
  opheliaPhoto: 'https://www.figma.com/api/mcp/asset/23da2d00-1750-4148-903a-179c402b9110',
  closeX:       '/close-x.svg',
  ellipse50:    'https://www.figma.com/api/mcp/asset/b3a416a8-e75b-452f-8a54-7ad906793040',
  ellipse51:    'https://www.figma.com/api/mcp/asset/d2e80d00-c27a-4cf4-890d-8b006ba8fdde',
}

interface OpheliaIntroOverlayProps {
  onClose: () => void
  onYesNo: () => void
  onThreeCard: () => void
}

export default function OpheliaIntroOverlay({ onClose, onYesNo, onThreeCard }: OpheliaIntroOverlayProps) {
  const [defaultAdvisor, setDefaultAdvisor] = useState(true)

  // Modal height leaves 101px header + 20px gap visible above it.
  // Photo height = modal height − 340px reserved for content.
  // Written as clamp so photo is at least 160px and at most 300px.
  // At 100dvh=619 (small Android): modal≈498px, photo≈160px, content≈338px ✓
  // At 100dvh=720 (typical phone):  modal≈599px, photo≈259px, content≈340px ✓
  // At 100dvh=932 (large phone):    modal=700px,  photo=300px, content=400px ✓

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 overlay-slide-up"
      style={{
        height: 'min(700px, calc(100dvh - 121px))',
        backgroundColor: '#080808',
        borderRadius: '24px 24px 0 0',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >

      {/* ── Photo zone ── */}
      <div style={{
        position: 'relative',
        flexShrink: 0,
        height: 'clamp(160px, calc(100dvh - 461px), 300px)',
        overflow: 'hidden',
        borderRadius: '24px 24px 0 0',
      }}>
        {/* Purple blobs */}
        <div style={{ position: 'absolute', left: -76, top: -187, width: 509, height: 347, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', inset: '-12.13% -8.27%' }}>
            <img src={A.ellipse50} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
          </div>
        </div>
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(calc(-50% - 44px))', top: -253, width: 734, height: 349, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', inset: '-12.06% -5.74%' }}>
            <img src={A.ellipse51} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
          </div>
        </div>

        {/* Ophelia photo */}
        <img
          src={A.opheliaPhoto}
          alt="Ophelia"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 35%',
            zIndex: 1,
          }}
        />

        {/* Gradient overlays */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '55%', background: 'linear-gradient(to bottom, #000 0%, rgba(0,0,0,0) 100%)', pointerEvents: 'none', zIndex: 2 }} />
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '50%', background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)', pointerEvents: 'none', zIndex: 2 }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '45%', background: 'linear-gradient(to left, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)', pointerEvents: 'none', zIndex: 2 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, background: 'linear-gradient(to top, #080808 0%, rgba(0,0,0,0) 100%)', pointerEvents: 'none', zIndex: 2 }} />

        {/* Meet Ophelia + X */}
        <div style={{
          position: 'absolute', top: 28, left: 24, right: 24,
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          zIndex: 3,
        }}>
          <div>
            <p style={{ fontFamily: 'var(--font-roboto)', fontSize: 22, color: 'white', margin: 0, letterSpacing: '-0.66px', lineHeight: 'normal' }}>
              Meet Ophelia
            </p>
            <p style={{ fontFamily: 'var(--font-roboto)', fontSize: 16, color: 'rgba(255,255,255,0.57)', margin: 0, letterSpacing: '-0.48px', lineHeight: 'normal' }}>
              Tarot reader
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', marginTop: 2, flexShrink: 0 }}>
            <img src={A.closeX} alt="Close" style={{ width: 29, height: 29, display: 'block' }} />
          </button>
        </div>
      </div>

      {/* ── Content zone ── */}
      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        padding: '14px 24px',
        paddingBottom: 'max(14px, env(safe-area-inset-bottom, 0px))',
        gap: 10,
      }}>

        {/* Bio */}
        <p style={{
          fontFamily: 'var(--font-roboto)', fontSize: 15, fontWeight: 400,
          color: 'rgba(255,255,255,0.68)',
          letterSpacing: '-0.6px', lineHeight: '1.35', margin: 0, flexShrink: 0,
        }}>
          Meet Ophelia — a tarot reader who believes every question deserves a clear answer. From quick guidance to a deep-dive into your path, she&apos;s here to help you find yours.
        </p>

        {/* Default advisor toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <p style={{ fontFamily: 'var(--font-roboto)', fontSize: 16, color: 'white', letterSpacing: '-0.64px', lineHeight: 'normal', margin: 0 }}>
            Set as default advisor
          </p>
          <button
            onClick={() => setDefaultAdvisor(v => !v)}
            style={{ position: 'relative', width: 59, height: 32, background: 'none', border: 'none', padding: 0, cursor: 'pointer', flexShrink: 0 }}
          >
            <div style={{ width: '100%', height: '100%', borderRadius: 100, backgroundColor: defaultAdvisor ? '#372e6a' : 'rgba(120,120,128,0.32)', transition: 'background-color 200ms' }} />
            <div style={{
              position: 'absolute', top: 2.5, borderRadius: '50%', backgroundColor: 'white',
              width: 27, height: 27,
              left: defaultAdvisor ? 30 : 2,
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              transition: 'left 200ms',
            }} />
          </button>
        </div>

        {/* Choose your reading — fills remaining space, cards share it */}
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ fontFamily: 'var(--font-roboto)', fontSize: 16, color: 'white', letterSpacing: '-0.64px', lineHeight: 'normal', margin: 0, flexShrink: 0 }}>
            Choose your reading
          </p>

          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button
              onClick={onYesNo}
              style={{ flex: 1, maxHeight: 88, minHeight: 64, borderRadius: 12, border: 'none', overflow: 'hidden', cursor: 'pointer', width: '100%', padding: 0, display: 'block' }}
            >
              <img src="/yes-no-widget.png" alt="Yes/No Tarot" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </button>

            <button
              onClick={onThreeCard}
              style={{ flex: 1, maxHeight: 88, minHeight: 64, borderRadius: 12, border: 'none', overflow: 'hidden', cursor: 'pointer', width: '100%', padding: 0, display: 'block' }}
            >
              <img src="/three-card-widget.png" alt="3-card spread" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
