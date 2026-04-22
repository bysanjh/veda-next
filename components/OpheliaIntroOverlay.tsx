'use client'
import Image from 'next/image'
import { useState } from 'react'

// Assets from Figma node 3:5746 — fetched 2026-04-22
const A = {
  opheliaPhoto:  'https://www.figma.com/api/mcp/asset/74a7d553-64e1-4ff1-a4f4-8466fae48fe9',
  closeX:        'https://www.figma.com/api/mcp/asset/a90c3247-0123-4791-a7ae-4d58f823ef28',
  ellipse50:     'https://www.figma.com/api/mcp/asset/5fb5142e-3b85-40cc-9d55-d60a9ea5509f',
  ellipse51:     'https://www.figma.com/api/mcp/asset/6737e23f-bf0c-4e92-a578-6dd109fa4ed8',
  ellipse40:     'https://www.figma.com/api/mcp/asset/3295f060-ae83-4488-89a9-71292621297d',
  ellipse42:     'https://www.figma.com/api/mcp/asset/e71c7cd9-f5ff-4230-94b6-3d2adf6c4b46',
  ellipse43:     'https://www.figma.com/api/mcp/asset/e33b4232-72ba-466b-be1e-766a73f18694',
  backOfCard:    'https://www.figma.com/api/mcp/asset/ad2ce526-3314-4ca7-bcb6-08db700fc9b8',
  glitterBg:     'https://www.figma.com/api/mcp/asset/eee147c1-3510-4a7f-a5c1-64603ad280c0',
  star:          'https://www.figma.com/api/mcp/asset/b2fcea43-97d6-49ce-92f7-31c5abf176e9',
}

interface OpheliaIntroOverlayProps {
  onClose: () => void
  onYesNo: () => void
  onThreeCard: () => void
}

export default function OpheliaIntroOverlay({ onClose, onYesNo, onThreeCard }: OpheliaIntroOverlayProps) {
  const [defaultAdvisor, setDefaultAdvisor] = useState(true)

  return (
    <div
      className="absolute inset-x-0 bottom-0 z-30 overflow-y-auto no-scrollbar overlay-slide-up"
      style={{
        height: 'min(757px, calc(100dvh - 101px))',
        backgroundColor: '#080808',
        borderRadius: '24px 24px 0 0',
        boxShadow: '1px 0 0 rgba(255,255,255,0.17), -1px -1px 0 rgba(255,255,255,0.17)',
        overflow: 'hidden',
      }}
    >
      {/* Purple blob — top-left behind photo */}
      <div style={{ position: 'absolute', left: -76, top: -187, width: 509, height: 347, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: '-12.13% -8.27%' }}>
          <img src={A.ellipse50} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>
      </div>

      {/* Secondary ellipse glow */}
      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(calc(-50% - 44px))', top: -253, width: 734, height: 349, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: '-12.06% -5.74%' }}>
          <img src={A.ellipse51} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>
      </div>

      {/* Ophelia photo — top ~50% of the card */}
      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '1.72%', bottom: '49.8%', width: 344, overflow: 'hidden', pointerEvents: 'none' }}>
        <img src={A.opheliaPhoto} alt="Ophelia" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
      </div>

      {/* Gradient overlays for legibility */}
      <div style={{ position: 'absolute', top: 0, left: 7, width: 361, height: 192, background: 'linear-gradient(to bottom, #000 0%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: -2, top: 0, width: 190, height: 702, background: 'linear-gradient(to right, #000 0%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: 226, top: -1, width: 176, height: 702, background: 'linear-gradient(to left, #000 0%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 109, left: -2, width: 404, height: 310, background: 'linear-gradient(to top, #000 15%, rgba(0,0,0,0) 98%)', pointerEvents: 'none' }} />

      {/* Meet Ophelia + X */}
      <div style={{ position: 'absolute', top: 32, left: '50%', transform: 'translateX(-50%)', width: 354, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
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

      {/* Content below photo */}
      <div style={{ position: 'absolute', top: 277, left: '50%', transform: 'translateX(-50%)', width: 354, display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Bio */}
        <p style={{ fontFamily: 'var(--font-roboto)', fontSize: 16, color: 'rgba(255,255,255,0.68)', letterSpacing: '-0.64px', lineHeight: 'normal', margin: 0 }}>
          Meet Ophelia — a tarot reader who believes every question deserves a clear answer. From quick guidance to a deep-dive into your path, she&apos;s here to help you find yours.
        </p>

        {/* Set as default advisor */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontFamily: 'var(--font-roboto)', fontSize: 16, color: 'white', letterSpacing: '-0.64px', lineHeight: 'normal', margin: 0 }}>
            Set as default advisor
          </p>
          <button
            onClick={() => setDefaultAdvisor(v => !v)}
            style={{ position: 'relative', width: 59, height: 32, background: 'none', border: 'none', padding: 0, cursor: 'pointer', flexShrink: 0 }}
          >
            <div style={{ width: '100%', height: '100%', borderRadius: 100, backgroundColor: defaultAdvisor ? '#4c48a9' : 'rgba(120,120,128,0.32)', transition: 'background-color 200ms' }} />
            <div style={{
              position: 'absolute', top: 2, borderRadius: '50%', backgroundColor: 'white',
              width: 27, height: 27,
              left: defaultAdvisor ? 30 : 2,
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              transition: 'left 200ms',
            }} />
          </button>
        </div>

        {/* Choose your reading */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ fontFamily: 'var(--font-roboto)', fontSize: 16, color: 'white', letterSpacing: '-0.64px', lineHeight: 'normal', margin: 0 }}>
            Choose your reading
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

            {/* Yes/No Tarot card */}
            <button
              onClick={onYesNo}
              style={{ position: 'relative', height: 88, backgroundColor: '#2f265e', borderRadius: 12, border: 'none', overflow: 'hidden', cursor: 'pointer', textAlign: 'left', width: '100%' }}
            >
              {/* Ellipse glow */}
              <div style={{ position: 'absolute', left: '50%', transform: 'translateX(calc(112.5px - 50%))', top: '50%', marginTop: -102.5, width: 215, height: 205 }}>
                <div style={{ position: 'absolute', inset: '-10.49% -10%' }}>
                  <img src={A.ellipse40} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
                </div>
              </div>
              {/* Right ellipse accent */}
              <div style={{ position: 'absolute', left: 304, top: -20, width: 75, height: 127, transform: 'rotate(180deg) scaleY(-1)' }}>
                <img src={A.ellipse42} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
              </div>
              {/* Left ellipse */}
              <div style={{ position: 'absolute', left: -7, top: -15, width: 62, height: 127, transform: 'scaleY(-1)' }}>
                <img src={A.ellipse43} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
              </div>
              {/* Card back */}
              <div style={{ position: 'absolute', left: 234, top: -29, width: 162.9, height: 173.4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={A.backOfCard} alt="" style={{ width: 97, height: 144, transform: 'rotate(-35.87deg)', objectFit: 'cover', display: 'block', filter: 'drop-shadow(2px 4px 4px rgba(0,0,0,0.25))' }} />
              </div>
              {/* Blur overlay */}
              <div style={{ position: 'absolute', inset: 0, backdropFilter: 'blur(0.85px)', backgroundColor: 'rgba(2,2,2,0.05)' }} />
              {/* Text */}
              <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 223, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p style={{ fontFamily: 'var(--font-roboto)', fontSize: 18, color: 'white', margin: 0, letterSpacing: '-0.72px', lineHeight: '20px' }}>Yes/No Tarot</p>
                <p style={{ fontFamily: 'var(--font-roboto)', fontSize: 14, color: '#cfcfcf', margin: 0, letterSpacing: '-0.56px', lineHeight: '14px' }}>Quick answers for burning questions.</p>
              </div>
            </button>

            {/* 3-card spread card */}
            <button
              onClick={onThreeCard}
              style={{ position: 'relative', height: 88, backgroundColor: '#2f265e', borderRadius: 12, border: 'none', overflow: 'hidden', cursor: 'pointer', textAlign: 'left', width: '100%' }}
            >
              {/* Ellipse glow */}
              <div style={{ position: 'absolute', left: '50%', transform: 'translateX(calc(112.5px - 50%))', top: '50%', marginTop: -102.5, width: 215, height: 205 }}>
                <div style={{ position: 'absolute', inset: '-10.49% -10%' }}>
                  <img src={A.ellipse40} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
                </div>
              </div>
              {/* 3 fanned card backs */}
              {([
                { deg: -75, left: 238, top: -29 },
                { deg: -60, left: 250, top: -45 },
                { deg: -45, left: 260, top: -55 },
              ] as { deg: number; left: number; top: number }[]).map(({ deg, left, top }, i) => (
                <div key={i} style={{ position: 'absolute', left, top, width: 93, height: 138, transform: `rotate(${deg}deg) scaleY(-1)`, overflow: 'hidden', borderRadius: 3.2, backgroundColor: '#372e6a' }}>
                  <img src={A.glitterBg} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 2, borderRadius: 2, backgroundColor: '#372e6a' }} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={A.star} alt="" style={{ width: 38, height: 38, display: 'block', transform: 'rotate(180deg)', objectFit: 'contain' }} />
                  </div>
                </div>
              ))}
              {/* Blur overlay */}
              <div style={{ position: 'absolute', inset: 0, backdropFilter: 'blur(0.85px)', backgroundColor: 'rgba(2,2,2,0.05)' }} />
              {/* Text */}
              <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 223, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p style={{ fontFamily: 'var(--font-roboto)', fontSize: 18, color: 'white', margin: 0, letterSpacing: '-0.72px', lineHeight: '20px' }}>3-card spread</p>
                <p style={{ fontFamily: 'var(--font-roboto)', fontSize: 14, color: 'rgba(255,255,255,0.46)', margin: 0, letterSpacing: '-0.64px', lineHeight: '15px' }}>Classic past, present, and future reading.</p>
              </div>
            </button>

          </div>
        </div>
      </div>

    </div>
  )
}
