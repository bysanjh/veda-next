'use client'
import Image from 'next/image'

// Fresh Figma assets — node 42:40484 (l2d9ngGhY0y2PleLGQs3JX, fetched 2026-04-22)
const A = {
  logoGroup:    'https://www.figma.com/api/mcp/asset/3c7d2385-4852-4bb9-8bf8-331745ea6bf6',
  starfield:    'https://www.figma.com/api/mcp/asset/c3575196-aed5-49b4-b1e1-621d04c9b535',
  ellipse16:    'https://www.figma.com/api/mcp/asset/98345b18-0282-4c54-97ed-ace6aea325c5',
  ellipse17:    'https://www.figma.com/api/mcp/asset/7815c942-17c0-4fb6-9e26-c8b3611bc749',
  ellipse18:    'https://www.figma.com/api/mcp/asset/d1c2c280-14c8-4226-ba62-000fa3884dc1',
  closeX:       'https://www.figma.com/api/mcp/asset/df01164d-9f61-4b20-a27b-a8714b58a94a',
  editIcon:     'https://www.figma.com/api/mcp/asset/59d10f24-5e6f-41d5-9dbb-ccba577e854f',
  editIcon2:    'https://www.figma.com/api/mcp/asset/7c586d28-1ee7-4f89-a052-79b9c9044a72',
  dividerLine:  'https://www.figma.com/api/mcp/asset/8c7f9933-f608-4fa6-906e-79106fb117d4',
  cardBlur:     'https://www.figma.com/api/mcp/asset/58b69de9-5d8e-4b78-9759-22b4dd8c0086',
  avatarBlue:   'https://www.figma.com/api/mcp/asset/d4993819-58ff-4d76-bd55-207e46c5d1b6',
  avatarPurple: 'https://www.figma.com/api/mcp/asset/71b328cd-e58c-4606-8059-183e8fb0d353',
  sendIcon:     'https://www.figma.com/api/mcp/asset/5cb469e3-9d7f-4181-8bd5-342d5b8651a3',
  star1:        'https://www.figma.com/api/mcp/asset/ecd295a0-a34c-4b8a-88f0-67e8d829b6a8',
  star2:        'https://www.figma.com/api/mcp/asset/7014e16a-063a-495d-82d7-861d5cd9b5b2',
  star3:        'https://www.figma.com/api/mcp/asset/6632a923-7cf0-4a33-8736-65d94c876d6d',
  googleIcon:   'https://www.figma.com/api/mcp/asset/4dc67688-452b-4f99-9a73-2c5927ef4987',
  facebookIcon: 'https://www.figma.com/api/mcp/asset/631c1ec1-dbaa-491b-9098-dc1e8aec4843',
}

interface LoginScreenProps {
  onContinue: () => void
}

export default function LoginScreen({ onContinue }: LoginScreenProps) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 50, overflow: 'hidden', backgroundColor: '#0a0c1a' }}>

      {/* Starfield background */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src={A.starfield} alt="" style={{ position: 'absolute', width: '410%', height: '124%', left: '-3.73%', top: '-1.11%', objectFit: 'cover', maxWidth: 'none' }} />
      </div>

      {/* Dark gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(99.75deg, rgba(12,19,37,0.9) 14%, rgba(31,31,31,0.9) 95%)',
      }} />

      {/* Edge fade gradients */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 172, background: 'linear-gradient(to bottom, rgba(0,0,0,0.78), transparent)', opacity: 0.8 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 172, background: 'linear-gradient(to top, rgba(0,0,0,0.78), transparent)', opacity: 0.8 }} />
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 83, background: 'linear-gradient(to right, rgba(0,0,0,0.78), transparent)', opacity: 0.8 }} />
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 72, background: 'linear-gradient(to left, rgba(0,0,0,0.78), transparent)', opacity: 0.8 }} />

      {/* Header bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 64,
        backgroundColor: '#101010',
        borderBottom: '1px solid rgba(255,255,255,0.2)',
        display: 'flex', alignItems: 'center',
        paddingLeft: 17,
        gap: 9,
      }}>
        {/* Logo group — includes wave mark + dots texture */}
        <div style={{ width: 43, height: 43, position: 'relative', flexShrink: 0 }}>
          <img src={A.logoGroup} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
        </div>
        {/* Astrology.com text */}
        <p style={{
          fontFamily: 'var(--font-khand)',
          fontSize: 25.7, fontWeight: 500,
          color: 'white',
          letterSpacing: '1.03px',
          textTransform: 'uppercase',
          margin: 0, lineHeight: 1,
        }}>
          Astrology
          <span style={{ fontWeight: 300, letterSpacing: '0.64px' }}>.com</span>
        </p>
      </div>

      {/* Blur overlay (just above bottom panel) */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 310, height: 564,
        backdropFilter: 'blur(5px)',
        background: 'linear-gradient(252deg, rgba(24,26,36,0.2), rgba(61,66,85,0.2))',
        pointerEvents: 'none',
      }} />

      {/* Bottom panel */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 743,
        backgroundColor: '#080911',
        borderRadius: '30.74px 30.74px 0 0',
        overflow: 'hidden',
      }}>

        {/* Purple ellipse glow (bottom of panel) */}
        <div style={{
          position: 'absolute',
          left: '50%', transform: 'translateX(-50%)',
          top: 518,
          width: 466, height: 550,
        }}>
          <div style={{ position: 'absolute', inset: '-25.75% -30.42%' }}>
            <img src={A.ellipse17} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
          </div>
        </div>

        {/* Hero section */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 280,
          borderRadius: '30.74px 30.74px 0 0',
          overflow: 'hidden',
        }}>
          {/* Background image */}
          <img src="/hero-bg.jpg" alt="" style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
          }} />

          {/* Screens mockup — centered */}
          <img src="/screens-mockup.png" alt="" style={{
            position: 'absolute',
            left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: 'auto',
            display: 'block',
            zIndex: 1,
          }} />

          {/* Bottom fade into dark panel */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 72,
            background: 'linear-gradient(to top, #080911, transparent)',
            zIndex: 2,
          }} />
        </div>

        {/* X / Close button — sits above hero, not clipped by it */}
        <button
          onClick={onContinue}
          aria-label="Skip"
          style={{
            position: 'absolute', right: 18, top: 18,
            width: 32, height: 32,
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            zIndex: 10,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ display: 'block', margin: 'auto' }}>
            <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </button>

        {/* CREATE ACCOUNT content */}
        <div style={{
          position: 'absolute', left: 18, top: 315,
          width: 377,
          display: 'flex', flexDirection: 'column', gap: 26,
          alignItems: 'center',
        }}>
          {/* Heading + tagline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
            <p style={{
              fontFamily: 'var(--font-khand)',
              fontSize: 26, fontWeight: 600,
              color: 'white',
              textTransform: 'uppercase',
              margin: 0, lineHeight: 1.06,
            }}>
              CREATE ACCOUNT
            </p>
            <p style={{
              fontFamily: 'var(--font-roboto)',
              fontSize: 16.5, fontWeight: 400,
              color: 'white',
              letterSpacing: '-0.33px',
              margin: 0, lineHeight: 1.06,
              fontVariationSettings: "'wdth' 100",
            }}>
              Veda - your personal astrologer, getting to know you one conversation at a time
            </p>
          </div>

          {/* Bullets + buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 35, width: '100%', alignItems: 'center' }}>
            {/* Star bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 360 }}>
              {([
                [A.star1, '20 free conversations a day'],
                [A.star2, 'Picks up where you left off \u2014 always'],
                [A.star3, 'Predictive guidance shaped around your journey'],
              ] as [string, string][]).map(([src, text]) => (
                <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                  <img src={src} alt="" style={{ width: 21, height: 21, flexShrink: 0, display: 'block', marginTop: 1 }} />
                  <p style={{
                    fontFamily: 'var(--font-roboto)',
                    fontSize: 17.6, fontWeight: 400,
                    color: 'white', margin: 0,
                    lineHeight: 1,
                    fontVariationSettings: "'wdth' 100",
                  }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>

            {/* Buttons + footer */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 17.6, width: '100%', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 13, width: '100%' }}>
                {/* Continue with Google */}
                <button
                  onClick={onContinue}
                  style={{
                    width: '100%', height: 53,
                    backgroundColor: 'white',
                    borderRadius: 50,
                    border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: 11,
                    cursor: 'pointer',
                    overflow: 'hidden',
                  }}
                >
                  <img src={A.googleIcon} alt="" style={{ width: 35, height: 35, display: 'block', flexShrink: 0 }} />
                  <span style={{
                    fontFamily: 'var(--font-roboto)',
                    fontSize: 19.8, fontWeight: 500,
                    color: '#101010',
                    whiteSpace: 'nowrap',
                    fontVariationSettings: "'wdth' 100",
                  }}>
                    Continue with Google
                  </span>
                </button>

                {/* Continue with Facebook */}
                <button
                  onClick={onContinue}
                  style={{
                    width: '100%', height: 53,
                    backgroundColor: 'white',
                    borderRadius: 26,
                    border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: 11,
                    cursor: 'pointer',
                    overflow: 'hidden',
                  }}
                >
                  <img src={A.facebookIcon} alt="" style={{ width: 35, height: 35, display: 'block', flexShrink: 0 }} />
                  <span style={{
                    fontFamily: 'var(--font-roboto)',
                    fontSize: 19.8, fontWeight: 500,
                    color: '#101010',
                    whiteSpace: 'nowrap',
                    fontVariationSettings: "'wdth' 100",
                  }}>
                    Continue with Facebook
                  </span>
                </button>
              </div>

              {/* Footer */}
              <p style={{
                fontFamily: 'var(--font-roboto)',
                fontSize: 13.2, fontWeight: 400,
                color: 'rgba(255,255,255,0.52)',
                textAlign: 'center', margin: 0,
                lineHeight: 1,
                fontVariationSettings: "'wdth' 100",
              }}>
                Memory is on by default · manage in settings
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
