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

// ─── Side panel card (YOUR LENS / YOUR GOALS) ────────────────────────────────

function SideCard({ title, editIconSrc, section1, section2 }: {
  title: string
  editIconSrc: string
  section1: { label: string; text: string }
  section2: { label: string; text: string }
}) {
  return (
    <div style={{
      width: 110, height: 143,
      backgroundColor: '#101010',
      border: '2.27px solid rgba(162,160,208,0.78)',
      borderRadius: 10.76,
      overflow: 'hidden',
      padding: '11px 11px 8px',
      flexShrink: 0,
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontFamily: 'var(--font-roboto)', fontSize: 5.9, color: 'rgba(255,255,255,0.63)', letterSpacing: '-0.24px' }}>
          {title}
        </span>
        <div style={{ backgroundColor: '#4c48a9', borderRadius: 2.5, padding: '2.8px 4px', display: 'flex', alignItems: 'center', gap: 2 }}>
          <img src={editIconSrc} alt="" style={{ width: 4, height: 4, display: 'block' }} />
          <span style={{ fontFamily: 'var(--font-khand)', fontSize: 5.1, color: 'white', textTransform: 'uppercase', letterSpacing: '0.5px' }}>EDIT</span>
        </div>
      </div>

      {/* Section 1 */}
      <p style={{ fontFamily: 'var(--font-roboto)', fontSize: 5.8, color: 'white', fontWeight: 500, letterSpacing: '-0.23px', margin: '0 0 3px', lineHeight: 1.1 }}>
        {section1.label}
      </p>
      <div style={{ height: 0, borderTop: '0.64px solid rgba(255,255,255,0.2)', marginBottom: 4 }} />
      <p style={{ fontFamily: 'var(--font-roboto)', fontSize: 5.2, color: 'white', letterSpacing: '-0.21px', lineHeight: 1.1, margin: '0 0 8px', whiteSpace: 'pre-wrap' }}>
        {section1.text}
      </p>

      {/* Section 2 */}
      <p style={{ fontFamily: 'var(--font-roboto)', fontSize: 5.8, color: 'white', fontWeight: 500, letterSpacing: '-0.23px', margin: '0 0 3px', lineHeight: 1.1 }}>
        {section2.label}
      </p>
      <div style={{ height: 0, borderTop: '0.64px solid rgba(255,255,255,0.2)', marginBottom: 4 }} />
      <p style={{ fontFamily: 'var(--font-roboto)', fontSize: 5.2, color: 'white', letterSpacing: '-0.21px', lineHeight: 1.1, margin: 0, whiteSpace: 'pre-wrap' }}>
        {section2.text}
      </p>
    </div>
  )
}

// ─── Center CHAT WITH VEDA card ───────────────────────────────────────────────

function ChatCard() {
  return (
    <div style={{
      width: 149, height: 194,
      backgroundColor: '#101010',
      border: '3.07px solid rgba(162,160,208,0.78)',
      borderRadius: 14.5,
      overflow: 'hidden',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      top: 26,
      zIndex: 2,
    }}>
      <p style={{
        fontFamily: 'var(--font-khand)',
        fontSize: 9.2, color: 'white',
        letterSpacing: '-0.37px', lineHeight: 1.3,
        padding: '12px 7px 0',
        margin: 0,
      }}>
        CHAT WITH VEDA
      </p>

      <div style={{ padding: '4px 7px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* Veda msg 1 */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end' }}>
          <img src={A.avatarBlue} alt="" style={{ width: 15, height: 15, borderRadius: 8, flexShrink: 0, display: 'block' }} />
          <div style={{
            flex: 1,
            background: 'linear-gradient(233deg, rgba(139,149,187,0.2), rgba(79,85,108,0.2))',
            border: '0.38px solid #4d536b',
            borderRadius: '3px 3px 3px 0',
            padding: '4.6px',
            backdropFilter: 'blur(1.9px)',
          }}>
            <p style={{ fontFamily: 'var(--font-roboto)', fontSize: 6.1, color: '#faeff4', lineHeight: 1.2, margin: 0 }}>
              {"Hello lovely, I am Veda, the world's first AI psychic advisor 🔮\n\nI'm happy to provide clarity through psychic, tarot, numerology, and love and relationship readings."}
            </p>
          </div>
        </div>

        {/* User reply */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ backgroundColor: '#ac408c', borderRadius: '3px 3px 0 3px', padding: '4.6px' }}>
            <p style={{ fontFamily: 'var(--font-roboto)', fontSize: 6.1, color: 'white', lineHeight: 1.2, margin: 0, whiteSpace: 'nowrap' }}>
              What about my horoscope?
            </p>
          </div>
        </div>

        {/* Veda msg 2 */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end' }}>
          <img src={A.avatarPurple} alt="" style={{ width: 15, height: 15, borderRadius: 8, flexShrink: 0, display: 'block' }} />
          <div style={{
            flex: 1,
            background: 'linear-gradient(214deg, rgba(139,149,187,0.2), rgba(79,85,108,0.2))',
            border: '0.38px solid #4d536b',
            borderRadius: '3px 3px 3px 0',
            padding: '4.6px',
            backdropFilter: 'blur(1.9px)',
          }}>
            <p style={{ fontFamily: 'var(--font-roboto)', fontSize: 6.1, color: '#faeff4', lineHeight: 1.2, margin: 0 }}>
              {"Sure, I'd love to give you a quick horoscope reading! What's your zodiac sign?"}
            </p>
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 8px 8px' }}>
        <div style={{
          border: '0.39px solid #7d61a7',
          borderRadius: 25,
          height: 22,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 6,
          paddingRight: 3,
          justifyContent: 'space-between',
        }}>
          <p style={{ fontFamily: 'var(--font-roboto)', fontSize: 5, color: '#8b8aa8', margin: 0, overflow: 'hidden', whiteSpace: 'nowrap' }}>
            What will my love life look like in the future?
          </p>
          <div style={{ position: 'relative', width: 17, height: 17, flexShrink: 0 }}>
            <div style={{ position: 'absolute', inset: 0, backgroundColor: '#4c48a9', borderRadius: 9 }} />
            <img src={A.sendIcon} alt="" style={{ position: 'absolute', top: 4, left: 4, width: 9, height: 9 }} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main LoginScreen ─────────────────────────────────────────────────────────

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
        height: 695,
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

        {/* Purple top section */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 239,
          backgroundColor: '#4c48a9',
          borderRadius: '30.74px 30.74px 0 0',
          overflow: 'hidden',
        }}>
          {/* Starfield texture — mix-blend-lighten, opacity 20% */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.2, mixBlendMode: 'lighten', overflow: 'hidden' }}>
            <img src={A.starfield} alt="" style={{ position: 'absolute', width: '363%', height: '145%', left: '-90%', top: 0, objectFit: 'cover', maxWidth: 'none' }} />
          </div>

          {/* Ellipse glow top-left */}
          <div style={{ position: 'absolute', left: -114, top: -816, width: 449, height: 936 }}>
            <div style={{ position: 'absolute', inset: '-35.21% -73.34%' }}>
              <img src={A.ellipse16} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
            </div>
          </div>

          {/* Ellipse glow right */}
          <div style={{ position: 'absolute', left: 335, top: -726, width: 449, height: 936 }}>
            <div style={{ position: 'absolute', inset: '-19.05% -39.69%' }}>
              <img src={A.ellipse18} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
            </div>
          </div>

          {/* Bottom gradient fade into dark panel */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 203,
            background: 'linear-gradient(1.39deg, rgb(76,72,169) 3.6%, rgba(76,72,169,0) 177.7%)',
          }} />

          {/* X / Close button — white Lucide X */}
          <button
            onClick={onContinue}
            aria-label="Skip"
            style={{
              position: 'absolute', right: 18, top: 18,
              width: 32, height: 32,
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}
          >
            <img src={A.closeX} alt="close" style={{ width: 32, height: 32, display: 'block' }} />
          </button>

          {/* Three preview cards */}
          <div style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
            {/* Left card — YOUR LENS */}
            <div style={{ position: 'absolute', left: 44, top: 66 }}>
              <SideCard
                title="YOUR LENS"
                editIconSrc={A.editIcon}
                section1={{
                  label: 'Beliefs',
                  text: "A difficult work decision you've been circling.\n\nA question about where you belong.",
                }}
                section2={{
                  label: 'Spiritual practice',
                  text: "You're exploring mindfulness and meditation.\n\nYou're drawn to practices that connect you with nature.",
                }}
              />
            </div>

            {/* Right card — YOUR GOALS */}
            <div style={{ position: 'absolute', right: 0, left: 258, top: 66 }}>
              <SideCard
                title="YOUR GOALS"
                editIconSrc={A.editIcon2}
                section1={{
                  label: 'Ambitions',
                  text: 'You want to improve your health and spend more time outdoors.',
                }}
                section2={{
                  label: 'Predicitions',
                  text: 'In 3 days, you will feel energized.\n\nIn 7 days, a new opportunity will arise.',
                }}
              />
            </div>

            {/* Center card — CHAT WITH VEDA */}
            <ChatCard />

            {/* Blur edges between side cards and center */}
            <div style={{
              position: 'absolute', left: 114, top: 68, width: 23, height: 138,
              backgroundImage: `url(${A.cardBlur})`,
              backgroundSize: 'cover',
              filter: 'blur(4.7px)',
              transform: 'scaleX(-1)',
            }} />
            <div style={{
              position: 'absolute', right: 114, top: 68, width: 23, height: 138,
              backgroundImage: `url(${A.cardBlur})`,
              backgroundSize: 'cover',
              filter: 'blur(4.7px)',
            }} />
          </div>
        </div>

        {/* CREATE ACCOUNT content */}
        <div style={{
          position: 'absolute', left: 18, top: 274,
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
