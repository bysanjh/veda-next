'use client'
import Image from 'next/image'
import { ASSETS } from '@/lib/assets'

interface LoginScreenProps {
  onContinue: () => void
}

// ─── Preview cards inside the purple section ──────────────────────────────────

function CardSidePanel({ title, content1, content2 }: {
  title: string
  content1: { label: string; lines: string[] }
  content2: { label: string; lines: string[] }
}) {
  return (
    <div style={{
      width: 100, height: 130,
      backgroundColor: '#101010',
      border: '2px solid rgba(162,160,208,0.78)',
      borderRadius: 10,
      overflow: 'hidden',
      padding: '5px 5px 5px 5px',
      flexShrink: 0,
      position: 'relative',
    }}>
      {/* header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontFamily: 'var(--font-roboto)', fontSize: 4.5, color: 'rgba(255,255,255,0.63)', letterSpacing: '-0.2px' }}>
          {title}
        </span>
        <div style={{ backgroundColor: '#4c48a9', borderRadius: 2, padding: '1.5px 4px', display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Image src={ASSETS.loginEditIcon} alt="" width={3} height={3} unoptimized style={{ display: 'block' }} />
          <span style={{ fontFamily: 'var(--font-khand)', fontSize: 4, color: 'white', textTransform: 'uppercase', letterSpacing: '0.5px' }}>EDIT</span>
        </div>
      </div>
      {/* divider */}
      <div style={{ height: 0.5, backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: 3 }} />
      {/* section 1 */}
      <p style={{ fontFamily: 'var(--font-roboto)', fontSize: 4.5, color: 'rgba(255,255,255,0.85)', fontWeight: 500, letterSpacing: '-0.2px', margin: '0 0 2px' }}>
        {content1.label}
      </p>
      {content1.lines.map((l, i) => (
        <p key={i} style={{ fontFamily: 'var(--font-roboto)', fontSize: 4, color: 'white', letterSpacing: '-0.18px', lineHeight: 1.1, margin: '0 0 1px' }}>
          {l}
        </p>
      ))}
      {/* divider */}
      <div style={{ height: 0.5, backgroundColor: 'rgba(255,255,255,0.2)', margin: '3px 0' }} />
      {/* section 2 */}
      <p style={{ fontFamily: 'var(--font-roboto)', fontSize: 4.5, color: 'rgba(255,255,255,0.85)', fontWeight: 500, letterSpacing: '-0.2px', margin: '0 0 2px' }}>
        {content2.label}
      </p>
      {content2.lines.map((l, i) => (
        <p key={i} style={{ fontFamily: 'var(--font-roboto)', fontSize: 4, color: 'white', letterSpacing: '-0.18px', lineHeight: 1.1, margin: '0 0 1px' }}>
          {l}
        </p>
      ))}
    </div>
  )
}

function ChatWithVedaCard() {
  return (
    <div style={{
      width: 136, height: 176,
      backgroundColor: '#101010',
      border: '2.8px solid rgba(162,160,208,0.78)',
      borderRadius: 13,
      overflow: 'hidden',
      position: 'absolute',
      left: '50%',
      marginLeft: -68 - 6.5,
      top: 30,
      zIndex: 2,
    }}>
      {/* Header label */}
      <p style={{
        fontFamily: 'var(--font-khand)',
        fontSize: 8.4, color: 'white',
        letterSpacing: '-0.34px', lineHeight: 1.3,
        padding: '8px 6px 0',
        margin: 0,
      }}>
        CHAT WITH VEDA
      </p>

      {/* Chat messages */}
      <div style={{ padding: '4px 6px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        {/* Veda msg 1 */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end' }}>
          <Image src={ASSETS.loginAvatarBlue} alt="" width={14} height={14} unoptimized style={{ borderRadius: 7, flexShrink: 0 }} />
          <div style={{
            flex: 1,
            background: 'linear-gradient(235deg, rgba(139,149,187,0.2), rgba(79,85,108,0.2))',
            border: '0.35px solid #4d536b',
            borderRadius: '2.8px 2.8px 2.8px 0',
            padding: '4px',
            backdropFilter: 'blur(1.7px)',
          }}>
            <p style={{ fontFamily: 'var(--font-roboto)', fontSize: 5.5, color: '#faeff4', lineHeight: 1.2, margin: 0 }}>
              Hello lovely, I am Veda, the world&apos;s first AI psychic advisor 🔮
            </p>
          </div>
        </div>

        {/* User reply */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ backgroundColor: '#ac408c', borderRadius: '2.8px 2.8px 0 2.8px', padding: '4px' }}>
            <p style={{ fontFamily: 'var(--font-roboto)', fontSize: 5.5, color: 'white', lineHeight: 1.2, margin: 0, whiteSpace: 'nowrap' }}>
              What about my horoscope?
            </p>
          </div>
        </div>

        {/* Veda msg 2 */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end' }}>
          <Image src={ASSETS.loginAvatarPurple} alt="" width={14} height={14} unoptimized style={{ borderRadius: 7, flexShrink: 0 }} />
          <div style={{
            flex: 1,
            background: 'linear-gradient(216deg, rgba(139,149,187,0.2), rgba(79,85,108,0.2))',
            border: '0.35px solid #4d536b',
            borderRadius: '2.8px 2.8px 2.8px 0',
            padding: '4px',
            backdropFilter: 'blur(1.7px)',
          }}>
            <p style={{ fontFamily: 'var(--font-roboto)', fontSize: 5.5, color: '#faeff4', lineHeight: 1.2, margin: 0 }}>
              Sure, I&apos;d love to give you a quick horoscope reading! What&apos;s your zodiac sign?
            </p>
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '0 6px 6px',
      }}>
        <div style={{
          border: '0.35px solid #7d61a7',
          borderRadius: 23,
          height: 20,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 8,
          paddingRight: 4,
          justifyContent: 'space-between',
        }}>
          <p style={{ fontFamily: 'var(--font-roboto)', fontSize: 4.5, color: '#8b8aa8', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden' }}>
            What will my love life look like...
          </p>
          <div style={{ position: 'relative', width: 16, height: 16, flexShrink: 0 }}>
            <div style={{ position: 'absolute', inset: 0, backgroundColor: '#4c48a9', borderRadius: 8 }} />
            <Image src={ASSETS.loginSendIcon} alt="" width={8} height={8} unoptimized style={{ position: 'absolute', top: 4, left: 4 }} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main LoginScreen ─────────────────────────────────────────────────────────

export default function LoginScreen({ onContinue }: LoginScreenProps) {
  return (
    <div
      style={{
        position: 'absolute', inset: 0, zIndex: 50,
        overflow: 'hidden', backgroundColor: '#0a0c1a',
      }}
    >
      {/* ── Starfield background ── */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Image
          src={ASSETS.loginStarfield}
          alt="" fill unoptimized
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      {/* ── Dark gradient overlay ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(99.75deg, rgba(12,19,37,0.9) 14%, rgba(31,31,31,0.9) 95%)',
      }} />

      {/* ── Edge fade gradients ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 160, background: 'linear-gradient(to bottom, rgba(0,0,0,0.78), transparent)', opacity: 0.8 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 160, background: 'linear-gradient(to top, rgba(0,0,0,0.78), transparent)', opacity: 0.8 }} />
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, rgba(0,0,0,0.78), transparent)', opacity: 0.8 }} />
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, rgba(0,0,0,0.78), transparent)', opacity: 0.8 }} />

      {/* ── Header bar ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 64,
        backgroundColor: '#101010',
        borderBottom: '1px solid rgba(255,255,255,0.2)',
        display: 'flex', alignItems: 'center', paddingLeft: 14,
      }}>
        {/* Logo mark */}
        <div style={{ width: 24, height: 24, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
          <div style={{ position: 'absolute', top: 4, left: 2, width: 20, height: 16.5 }}>
            <Image src={ASSETS.loginLogoMark} alt="" fill unoptimized style={{ objectFit: 'contain' }} />
          </div>
        </div>
        {/* "Astrology.com" text */}
        <p style={{
          fontFamily: 'var(--font-khand)',
          fontSize: 24, fontWeight: 500,
          color: 'white',
          letterSpacing: '0.96px',
          textTransform: 'uppercase',
          margin: '0 0 0 13px',
          lineHeight: 1,
        }}>
          Astrology
          <span style={{ fontWeight: 300, letterSpacing: '0.64px' }}>.com</span>
        </p>
        {/* Top-right button */}
        <div style={{ position: 'absolute', right: 16, top: 12, width: 40, height: 40 }}>
          <Image src={ASSETS.loginTopBtn} alt="" fill unoptimized style={{ objectFit: 'contain' }} />
        </div>
      </div>

      {/* ── Blur overlay (sits just above the bottom panel) ── */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 248, height: 200,
        backdropFilter: 'blur(5px)',
        background: 'linear-gradient(254deg, rgba(24,26,36,0.2), rgba(61,66,85,0.2))',
        pointerEvents: 'none',
      }} />

      {/* ── Bottom panel ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 633,
        backgroundColor: '#080911',
        borderRadius: '28px 28px 0 0',
        overflow: 'hidden',
      }}>

        {/* ── Big purple ellipse glow (at bottom of panel) ── */}
        <div style={{
          position: 'absolute',
          left: '50%', marginLeft: -212,
          top: 472,
          width: 424, height: 501,
        }}>
          <div style={{ position: 'absolute', inset: '-25.75% -30.42%' }}>
            <Image src={ASSETS.loginEllipse17} alt="" fill unoptimized style={{ objectFit: 'contain' }} />
          </div>
        </div>

        {/* ── Purple top section of panel ── */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 218,
          backgroundColor: '#4c48a9',
          borderRadius: '28px 28px 0 0',
          overflow: 'hidden',
        }}>
          {/* Starfield overlay (mix-blend-lighten, opacity 20%) */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.2, mixBlendMode: 'lighten', overflow: 'hidden' }}>
            <Image src={ASSETS.loginStarfield} alt="" fill unoptimized style={{ objectFit: 'cover' }} />
          </div>

          {/* Ellipse glow top-left */}
          <div style={{ position: 'absolute', left: -104, top: -743 + 218, width: 409, height: 852 }}>
            <div style={{ position: 'absolute', inset: '-35.21% -73.34%' }}>
              <Image src={ASSETS.loginEllipse16} alt="" fill unoptimized style={{ objectFit: 'contain' }} />
            </div>
          </div>

          {/* Ellipse glow right */}
          <div style={{ position: 'absolute', left: 305, top: -661 + 218, width: 409, height: 852 }}>
            <div style={{ position: 'absolute', inset: '-19.05% -39.69%' }}>
              <Image src={ASSETS.loginEllipse18} alt="" fill unoptimized style={{ objectFit: 'contain' }} />
            </div>
          </div>

          {/* Bottom gradient fade (blends into dark panel) */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 185,
            background: 'linear-gradient(1.39deg, rgb(76,72,169) 3.6%, rgba(76,72,169,0) 177.7%)',
          }} />

          {/* Close (X) button */}
          <button
            onClick={onContinue}
            aria-label="Skip"
            style={{
              position: 'absolute', right: 20, top: 16,
              width: 29, height: 29,
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}
          >
            <Image src={ASSETS.loginCloseX} alt="close" width={29} height={29} unoptimized />
          </button>

          {/* ── 3 preview cards ── */}
          <div style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
            {/* Left card — YOUR LENS */}
            <div style={{ position: 'absolute', left: 40, top: 60 }}>
              <CardSidePanel
                title="YOUR LENS"
                content1={{ label: 'Beliefs', lines: ['A difficult work decision', 'you\'ve been circling...'] }}
                content2={{ label: 'Spiritual practice', lines: ['Exploring mindfulness', 'and meditation.'] }}
              />
            </div>

            {/* Right card — YOUR GOALS */}
            <div style={{ position: 'absolute', right: 40, top: 60 }}>
              <CardSidePanel
                title="YOUR GOALS"
                content1={{ label: 'Ambitions', lines: ['Improve health and', 'spend time outdoors.'] }}
                content2={{ label: 'Predictions', lines: ['In 3 days, energized.', 'In 7 days, opportunity.'] }}
              />
            </div>

            {/* Center card — CHAT WITH VEDA (tallest, z-top) */}
            <ChatWithVedaCard />

            {/* Blur fade edges between side cards and center */}
            <div style={{
              position: 'absolute', left: 103, top: 62, width: 21, height: 126,
              backgroundImage: `url(${ASSETS.loginCardBlur})`,
              backgroundSize: 'cover',
              filter: 'blur(4.3px)',
              transform: 'scaleX(-1)',
            }} />
            <div style={{
              position: 'absolute', right: 103, top: 62, width: 21, height: 126,
              backgroundImage: `url(${ASSETS.loginCardBlur})`,
              backgroundSize: 'cover',
              filter: 'blur(4.3px)',
            }} />
          </div>
        </div>

        {/* ── CREATE ACCOUNT content ── */}
        <div style={{
          position: 'absolute', left: 16, top: 250, width: 343,
          display: 'flex', flexDirection: 'column', gap: 24,
        }}>
          {/* Heading + tagline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p style={{
              fontFamily: 'var(--font-khand)',
              fontSize: 24, fontWeight: 600,
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
              letterSpacing: '-0.3px',
              margin: 0, lineHeight: 1.06,
              fontVariationSettings: "'wdth' 100",
            }}>
              Veda - your personal astrologer, getting to know you one conversation at a time
            </p>
          </div>

          {/* Star bullets + buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {/* Bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              {[
                '20 free conversations a day',
                'Picks up where you left off — always',
                'Predictive guidance shaped around your journey',
              ].map((text) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8, width: 328 }}>
                  <div style={{ width: 19, height: 19, position: 'relative', flexShrink: 0 }}>
                    <Image src={ASSETS.loginStar} alt="" fill unoptimized style={{ objectFit: 'contain' }} />
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-roboto)',
                    fontSize: 16, fontWeight: 400,
                    color: 'white', margin: 0,
                    lineHeight: 0.81,
                    fontVariationSettings: "'wdth' 100",
                  }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>

            {/* Buttons + footer */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: 134 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* Continue with Google */}
                <button
                  onClick={onContinue}
                  style={{
                    width: '100%', height: 48,
                    backgroundColor: 'white',
                    borderRadius: 46,
                    border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: 10,
                    cursor: 'pointer',
                    padding: '0 56px',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ width: 32, height: 32, position: 'relative', flexShrink: 0 }}>
                    <Image src={ASSETS.loginGoogleIcon} alt="" fill unoptimized style={{ objectFit: 'contain' }} />
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-roboto)',
                    fontSize: 18, fontWeight: 500,
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
                    width: '100%', height: 48,
                    backgroundColor: 'white',
                    borderRadius: 24,
                    border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: 10,
                    cursor: 'pointer',
                    padding: '0 45px',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ width: 32, height: 32, position: 'relative', flexShrink: 0 }}>
                    <Image src={ASSETS.loginFbIcon} alt="" fill unoptimized style={{ objectFit: 'contain' }} />
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-roboto)',
                    fontSize: 18, fontWeight: 500,
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
                fontSize: 12, fontWeight: 400,
                color: 'rgba(255,255,255,0.52)',
                textAlign: 'center', margin: 0,
                lineHeight: 0.81,
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
