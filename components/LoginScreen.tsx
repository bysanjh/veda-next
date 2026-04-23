'use client'

const A = {
  logoGroup:    'https://www.figma.com/api/mcp/asset/da0cc5b5-dd7a-44ee-a43a-d00a199fc288',
  starfield:    'https://www.figma.com/api/mcp/asset/a1678bb0-79c9-432b-90f5-6cd6d125c34d',
  ellipse16:    'https://www.figma.com/api/mcp/asset/2c5b8e28-1dfa-4384-b181-61050898c6b3',
  ellipse17:    'https://www.figma.com/api/mcp/asset/487f9ab9-d773-42c0-a6ac-5652a4596272',
  ellipse18:    'https://www.figma.com/api/mcp/asset/d9b133a8-52d1-4567-a73b-064c985ca849',
  star1:        'https://www.figma.com/api/mcp/asset/23c67d42-d451-4d9d-8389-43c96255a9c9',
  star2:        'https://www.figma.com/api/mcp/asset/510f99b5-e660-496d-a736-4f5cd4038461',
  star3:        'https://www.figma.com/api/mcp/asset/4fed7644-0c8b-44c2-bec0-377528a8392d',
  googleIcon:   'https://www.figma.com/api/mcp/asset/f96872cb-affd-4e9b-aa75-94ed1470291d',
  facebookIcon: 'https://www.figma.com/api/mcp/asset/987e67e8-3a49-44f1-9648-6184eaaaa24f',
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
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(99.75deg, rgba(12,19,37,0.9) 14%, rgba(31,31,31,0.9) 95%)' }} />

      {/* Edge fade gradients */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 172, background: 'linear-gradient(to bottom, rgba(0,0,0,0.78), transparent)', opacity: 0.8 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 172, background: 'linear-gradient(to top, rgba(0,0,0,0.78), transparent)', opacity: 0.8 }} />
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 83, background: 'linear-gradient(to right, rgba(0,0,0,0.78), transparent)', opacity: 0.8 }} />
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 72, background: 'linear-gradient(to left, rgba(0,0,0,0.78), transparent)', opacity: 0.8 }} />

      {/* Header */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 101,
        backgroundColor: '#101010',
        borderBottom: '1px solid rgba(255,255,255,0.2)',
        zIndex: 10,
      }}>
        <div style={{ position: 'absolute', left: 17, top: 45, display: 'flex', alignItems: 'center', gap: 9, height: 43 }}>
          <img src={A.logoGroup} alt="" style={{ width: 43, height: 43, flexShrink: 0, display: 'block', objectFit: 'contain' }} />
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
      </div>

      {/* Bottom panel — top pushes it below header, never exceeds 695px tall */}
      <div style={{
        position: 'absolute',
        top: 'max(121px, calc(100dvh - 695px))',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#080911',
        borderRadius: '30.74px 30.74px 0 0',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>

        {/* Purple ellipse glow — decorative, bottom of panel */}
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: -120, width: 465, height: 550, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', inset: '-25.75% -30.42%' }}>
            <img src={A.ellipse17} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
          </div>
        </div>

        {/* X / Skip button */}
        <button
          onClick={onContinue}
          aria-label="Skip"
          style={{
            position: 'absolute', right: 18, top: 18,
            width: 32, height: 32,
            background: 'none', border: 'none', cursor: 'pointer', padding: 4,
            zIndex: 20,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Purple hero section — responsive height */}
        <div style={{
          position: 'relative',
          flexShrink: 0,
          height: 'clamp(150px, 34%, 265px)',
          backgroundColor: '#372e6a',
          borderRadius: '30.74px 30.74px 0 0',
          overflow: 'hidden',
        }}>
          {/* Starfield overlay */}
          <img
            src={A.starfield} alt=""
            style={{
              position: 'absolute',
              width: '363%', height: '145%',
              left: '-89.87%', top: 0,
              opacity: 0.2,
              mixBlendMode: 'lighten',
              maxWidth: 'none', objectFit: 'cover',
            }}
          />
          {/* Ellipse16 left glow */}
          <div style={{ position: 'absolute', left: -114, top: -815, width: 449, height: 935 }}>
            <div style={{ position: 'absolute', inset: '-35.21% -73.34%' }}>
              <img src={A.ellipse16} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
            </div>
          </div>
          {/* Ellipse18 right glow */}
          <div style={{ position: 'absolute', left: 334, top: -725, width: 449, height: 935 }}>
            <div style={{ position: 'absolute', inset: '-19.05% -39.69%' }}>
              <img src={A.ellipse18} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
            </div>
          </div>
          {/* Bottom gradient */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
            background: 'linear-gradient(to top, #080911, transparent)',
          }} />
          {/* Screens mockup — sized by height so it never overflows the hero */}
          <img src="/screens-mockup.png" alt="" style={{
            position: 'absolute',
            left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            height: '88%', width: 'auto',
            maxWidth: '100%',
            display: 'block', zIndex: 1,
          }} />
        </div>

        {/* Content — fills remaining space, distributed with space-between */}
        <div style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '20px 18px',
          paddingBottom: 'max(20px, env(safe-area-inset-bottom, 0px))',
          position: 'relative',
          zIndex: 1,
        }}>

          {/* Heading + tagline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p style={{
              fontFamily: 'var(--font-khand)',
              fontSize: 26.35, fontWeight: 600,
              color: 'white',
              textTransform: 'uppercase',
              margin: 0, lineHeight: 1.06,
            }}>
              CREATE ACCOUNT
            </p>
            <p style={{
              fontFamily: 'var(--font-roboto)',
              fontSize: 15, fontWeight: 400,
              color: 'white',
              letterSpacing: '-0.33px',
              margin: 0, lineHeight: 1.2,
            }}>
              Veda - your personal astrologer, getting to know you one conversation at a time
            </p>
          </div>

          {/* Star bullets */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {([
              [A.star1, '20 free conversations a day'],
              [A.star2, 'Picks up where you left off — always'],
              [A.star3, 'Predictive guidance shaped around your journey'],
            ] as [string, string][]).map(([src, text]) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <img src={src} alt="" style={{ width: 20, height: 20, flexShrink: 0, display: 'block' }} />
                <p style={{
                  fontFamily: 'var(--font-roboto)',
                  fontSize: 16, fontWeight: 400,
                  color: 'white', margin: 0,
                  lineHeight: 1.2,
                }}>
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* Buttons + footer */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button
              onClick={onContinue}
              style={{
                width: '100%', height: 52,
                backgroundColor: 'white',
                borderRadius: 50, border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 11, cursor: 'pointer', overflow: 'hidden',
              }}
            >
              <img src={A.googleIcon} alt="" style={{ width: 34, height: 34, display: 'block', flexShrink: 0 }} />
              <span style={{
                fontFamily: 'var(--font-roboto)',
                fontSize: 18, fontWeight: 500,
                color: '#101010', whiteSpace: 'nowrap',
              }}>
                Continue with Google
              </span>
            </button>

            <button
              onClick={onContinue}
              style={{
                width: '100%', height: 52,
                backgroundColor: 'white',
                borderRadius: 26, border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 11, cursor: 'pointer', overflow: 'hidden',
              }}
            >
              <img src={A.facebookIcon} alt="" style={{ width: 34, height: 34, display: 'block', flexShrink: 0 }} />
              <span style={{
                fontFamily: 'var(--font-roboto)',
                fontSize: 18, fontWeight: 500,
                color: '#101010', whiteSpace: 'nowrap',
              }}>
                Continue with Facebook
              </span>
            </button>

            <p style={{
              fontFamily: 'var(--font-roboto)',
              fontSize: 13, fontWeight: 400,
              color: 'rgba(255,255,255,0.52)',
              textAlign: 'center', margin: 0,
              lineHeight: 1,
            }}>
              Memory is on by default &middot; manage in settings
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
