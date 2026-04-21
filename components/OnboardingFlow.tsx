'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import ScrollWheelPicker from '@/components/ScrollWheelPicker'

interface BirthProfile {
  name: string
  dob: { month: string; day: string; year: string }
  tob: { hour: string; minute: string; ampm: string } | null
  location: string
}

interface OnboardingFlowProps {
  onComplete: (profile: BirthProfile) => void
  onClose?: () => void
}

// Figma asset URLs for onboarding steps
const OB = {
  closeX:   'https://www.figma.com/api/mcp/asset/5c27609b-1d3a-4b43-af13-d4c85447f994',
  userIcon: 'https://www.figma.com/api/mcp/asset/b3299cd9-8991-494e-a9fa-e6a13c57f0c3',
  mapPin:   'https://www.figma.com/api/mcp/asset/a177341a-0a81-4609-ace7-67d196e00e89',
  editIcon: 'https://www.figma.com/api/mcp/asset/23dba3a4-69ae-4417-a3de-87c43ebb9314',
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]
const DAYS  = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'))
const YEARS = Array.from({ length: 100 }, (_, i) => String(2006 - i))
const HOURS   = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'))
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))
const AMPMS   = ['AM', 'PM']
const MINUTES_5 = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'))

const CITIES = [
  'New York, United States','Los Angeles, United States','Chicago, United States',
  'Houston, United States','Phoenix, United States','San Diego, United States',
  'Dallas, United States','San Francisco, United States','Austin, United States',
  'Seattle, United States','Boston, United States','Denver, United States',
  'Miami, United States','Nashville, United States','Portland, United States',
  'Las Vegas, United States','Atlanta, United States','Philadelphia, United States',
  'London, United Kingdom','Paris, France','Tokyo, Japan','Mumbai, India',
  'Sydney, Australia','Toronto, Canada','Berlin, Germany','Dubai, UAE',
  'Singapore, Singapore','Barcelona, Spain','Amsterdam, Netherlands',
  'Indore, India','Delhi, India','Bangalore, India','Chennai, India',
  'Kolkata, India','Hyderabad, India','Pune, India',
]

// ─── Picker constants ─────────────────────────────────────────────────────────
const ITEM_H   = 40
const PICKER_H = ITEM_H * 7   // 280 — 7 items visible
const PICKER_PAD = (PICKER_H - ITEM_H) / 2  // 120

function distSize(d: number) { return d === 0 ? 23 : d === 1 ? 18 : d === 2 ? 14 : 12 }
function distColor(d: number) { return d === 0 ? '#ffffff' : d === 1 ? '#aeaeae' : d === 2 ? '#c2c2c2' : '#d7d7d7' }

// ─── ScrollPicker ─────────────────────────────────────────────────────────────
function ScrollPicker({
  items,
  initialIndex = 0,
  onChange,
  align = 'center',
}: {
  items: string[]
  initialIndex?: number
  onChange: (val: string) => void
  align?: 'center' | 'right'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const prevIdx = useRef(initialIndex)
  const didInit = useRef(false)
  const [sel, setSel] = useState(initialIndex)

  useEffect(() => {
    if (!ref.current || didInit.current) return
    ref.current.scrollTop = initialIndex * ITEM_H
    didInit.current = true
  }, [initialIndex])

  const onScroll = useCallback(() => {
    if (!ref.current) return
    const idx = Math.max(0, Math.min(items.length - 1, Math.round(ref.current.scrollTop / ITEM_H)))
    setSel(idx)
    if (idx !== prevIdx.current) { prevIdx.current = idx; onChange(items[idx]) }
  }, [items, onChange])

  return (
    <div
      ref={ref}
      onScroll={onScroll}
      className="no-scrollbar"
      style={{
        height: PICKER_H,
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        paddingTop: PICKER_PAD,
        paddingBottom: PICKER_PAD,
        flexShrink: 0,
      }}
    >
      {items.map((item, i) => {
        const d = Math.abs(i - sel)
        return (
          <div
            key={`${item}-${i}`}
            style={{
              height: ITEM_H,
              scrollSnapAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: align === 'right' ? 'flex-end' : 'center',
              fontSize: distSize(d),
              fontFamily: 'var(--font-roboto)',
              color: distColor(d),
              userSelect: 'none',
              transition: 'font-size 100ms, color 100ms',
            }}
          >
            {item}
          </div>
        )
      })}
    </div>
  )
}

// ─── CtaButton ────────────────────────────────────────────────────────────────
function CtaButton({ label, disabled, isLoading, onClick }: {
  label: string
  disabled?: boolean
  isLoading?: boolean
  onClick: () => void
}) {
  const inactive = disabled || isLoading
  return (
    <button
      onClick={onClick}
      disabled={inactive}
      style={{
        width: '100%',
        height: 52,
        borderRadius: 10,
        border: 'none',
        background: inactive ? 'rgba(76,72,169,0.42)' : '#4c48a9',
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 400,
        fontFamily: 'var(--font-roboto)',
        letterSpacing: '-0.72px',
        cursor: inactive ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        flexShrink: 0,
        transition: 'background 200ms',
      }}
    >
      {isLoading ? (
        <>
          <div className="spin-cw" style={{
            width: 16, height: 16, borderRadius: 8,
            border: '2px solid transparent',
            borderBottomColor: 'rgba(255,255,255,0.6)',
            borderLeftColor: 'rgba(255,255,255,0.6)',
          }} />
          Generating…
        </>
      ) : label}
    </button>
  )
}

// ─── ConfirmRow ───────────────────────────────────────────────────────────────
function ConfirmRow({ label, value, onEdit }: { label: string; value: string; onEdit: () => void }) {
  return (
    <div
      onClick={onEdit}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 0',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        cursor: 'pointer',
        flexShrink: 0,
        gap: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: 0, flex: 1 }}>
        <span style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: 20,
          fontWeight: 400,
          color: 'rgba(255,255,255,0.6)',
          letterSpacing: '-0.6px',
          whiteSpace: 'nowrap',
        }}>
          {label}&nbsp;
        </span>
        <span style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: 20,
          fontWeight: 400,
          color: '#ffffff',
          letterSpacing: '-0.6px',
        }}>
          {value}
        </span>
      </div>
      <img src={OB.editIcon} alt="Edit" style={{ width: 18, height: 18, flexShrink: 0, opacity: 0.65 }} />
    </div>
  )
}

// ─── CloseBtn ─────────────────────────────────────────────────────────────────
function CloseBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, flexShrink: 0 }}
    >
      <img src={OB.closeX} alt="Close" style={{ width: 24, height: 24, display: 'block' }} />
    </button>
  )
}

// ─── Main OnboardingFlow ───────────────────────────────────────────────────────
export default function OnboardingFlow({ onComplete, onClose }: OnboardingFlowProps) {
  const [step, setStep]           = useState(1)
  const [isExiting, setIsExiting] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [focused, setFocused]     = useState<'name' | 'location' | null>(null)

  const [name, setName]               = useState('')
  const [dobMonth, setDobMonth]       = useState(MONTHS[0])
  const [dobDay, setDobDay]           = useState(DAYS[0])
  const [dobYear, setDobYear]         = useState(YEARS[25])
  const [tobHour, setTobHour]         = useState(HOURS[0])
  const [tobMin, setTobMin]           = useState(MINUTES_5[0])
  const [tobAmpm, setTobAmpm]         = useState(AMPMS[0])
  const [skipTob, setSkipTob]         = useState(false)
  const [location, setLocation]       = useState('')
  const [locationQuery, setLocationQuery] = useState('')
  const [showDropdown, setShowDropdown]   = useState(false)

  const filteredCities = locationQuery.length >= 1
    ? CITIES.filter((c) => c.toLowerCase().includes(locationQuery.toLowerCase())).slice(0, 5)
    : []

  function doClose() {
    if (onClose) { onClose(); return }
    const profile: BirthProfile = { name: name || 'User', dob: { month: dobMonth, day: dobDay, year: dobYear }, tob: null, location }
    localStorage.setItem('veda_user_profile', JSON.stringify(profile))
    onComplete(profile)
  }

  function transition(fn: () => void) {
    setIsExiting(true)
    setTimeout(() => { fn(); setIsExiting(false) }, 280)
  }
  const next       = () => transition(() => setStep((s) => s + 1))
  const goToStep   = (s: number) => transition(() => setStep(s))

  function handleComplete() {
    if (generating) return
    setGenerating(true)
    const profile: BirthProfile = {
      name,
      dob: { month: dobMonth, day: dobDay, year: dobYear },
      tob: skipTob ? null : { hour: tobHour, minute: tobMin, ampm: tobAmpm },
      location,
    }
    localStorage.setItem('veda_user_profile', JSON.stringify(profile))
    setTimeout(() => onComplete(profile), 1200)
  }

  // Shared styles
  const titleStyle: React.CSSProperties = {
    fontFamily: 'var(--font-dm-sans)',
    fontSize: 22,
    fontWeight: 500,
    color: '#ffffff',
    letterSpacing: '-1.1px',
    lineHeight: 1.2,
    margin: 0,
    flex: 1,
  }

  function inputStyle(isFocused: boolean): React.CSSProperties {
    return {
      width: '100%',
      boxSizing: 'border-box' as const,
      background: 'transparent',
      border: `1px solid ${isFocused ? '#ffffff' : 'rgba(255,255,255,0.27)'}`,
      borderRadius: 12,
      padding: '14px 44px 14px 14px',
      fontSize: 20,
      fontWeight: 400,
      fontFamily: 'var(--font-dm-sans)',
      color: '#ffffff',
      letterSpacing: '-1px',
      outline: 'none',
      transition: 'border-color 150ms',
      flexShrink: 0,
    }
  }

  // ─── Picker section shared layout (date + time steps) ─────────────────────
  function PickerWrapper({ children }: { children: React.ReactNode }) {
    const maskH = PICKER_H / 2 - ITEM_H / 2  // 120px — exact zone above/below center item
    return (
      <div style={{ position: 'relative', flexShrink: 0 }}>
        {children}
        {/* Fade masks — hide the non-center items into the sheet background */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: maskH,
          background: 'linear-gradient(to bottom, #1b1b1f 30%, rgba(27,27,31,0) 100%)',
          pointerEvents: 'none', zIndex: 3,
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: maskH,
          background: 'linear-gradient(to top, #1b1b1f 30%, rgba(27,27,31,0) 100%)',
          pointerEvents: 'none', zIndex: 3,
        }} />
        {/* Center item selection lines — exactly at top/bottom edge of selected item */}
        <div style={{
          position: 'absolute',
          top: `calc(50% - ${ITEM_H / 2}px)`,
          left: 0, right: 0, height: 1,
          background: 'rgba(255,255,255,0.14)',
          pointerEvents: 'none', zIndex: 4,
        }} />
        <div style={{
          position: 'absolute',
          top: `calc(50% + ${ITEM_H / 2}px)`,
          left: 0, right: 0, height: 1,
          background: 'rgba(255,255,255,0.14)',
          pointerEvents: 'none', zIndex: 4,
        }} />
      </div>
    )
  }

  // ─── Step content ──────────────────────────────────────────────────────────
  function renderStep() {
    switch (step) {

      // ── 1 · Name ──────────────────────────────────────────────────────────
      case 1:
        return (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <h2 style={titleStyle}>Add your name</h2>
              <CloseBtn onClick={doClose} />
            </div>
            <div style={{ position: 'relative' }}>
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && name.trim().length >= 2) next() }}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
                placeholder="First and last name"
                className="ob-input"
                style={inputStyle(focused === 'name')}
              />
              <img
                src={OB.userIcon}
                alt=""
                style={{
                  position: 'absolute', right: 14, top: '50%',
                  transform: 'translateY(-50%)',
                  width: 20, height: 20, opacity: 0.5,
                  pointerEvents: 'none',
                }}
              />
            </div>
            <CtaButton label="Continue" disabled={name.trim().length < 2} onClick={next} />
          </>
        )

      // ── 2 · Date of birth ─────────────────────────────────────────────────
      case 2:
        return (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <h2 style={titleStyle}>Add your date of birth</h2>
              <CloseBtn onClick={doClose} />
            </div>
            <PickerWrapper>
              <div style={{ display: 'flex', gap: 27, overflow: 'hidden' }}>
                <div style={{ flex: 2, overflow: 'hidden' }}>
                  <ScrollPicker items={MONTHS} onChange={setDobMonth} align="right" />
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <ScrollPicker items={DAYS} onChange={setDobDay} />
                </div>
                <div style={{ flex: 1.2, overflow: 'hidden' }}>
                  <ScrollPicker items={YEARS} initialIndex={25} onChange={setDobYear} />
                </div>
              </div>
            </PickerWrapper>
            <CtaButton label="Continue" onClick={next} />
          </>
        )

      // ── 3 · Time of birth ─────────────────────────────────────────────────
      case 3:
        return (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <h2 style={titleStyle}>Add your time of birth</h2>
              <CloseBtn onClick={doClose} />
            </div>
            <PickerWrapper>
              <ScrollWheelPicker
                columns={[
                  {
                    values: HOURS,
                    selected: Math.max(0, HOURS.indexOf(tobHour)),
                    onChange: (i) => setTobHour(HOURS[i] ?? HOURS[0]),
                  },
                  {
                    values: MINUTES_5,
                    selected: Math.max(0, MINUTES_5.indexOf(tobMin)),
                    onChange: (i) => setTobMin(MINUTES_5[i] ?? MINUTES_5[0]),
                  },
                  {
                    values: AMPMS,
                    selected: Math.max(0, AMPMS.indexOf(tobAmpm)),
                    onChange: (i) => setTobAmpm(AMPMS[i] ?? AMPMS[0]),
                  },
                ]}
              />
            </PickerWrapper>
            <button
              onClick={() => { setSkipTob(true); next() }}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                fontFamily: 'var(--font-roboto)', fontSize: 13,
                color: 'rgba(255,255,255,0.4)',
                textDecoration: 'underline',
                textUnderlineOffset: 3,
                alignSelf: 'center',
                flexShrink: 0,
              }}
            >
              I don&apos;t know my birth time
            </button>
            <CtaButton label="Continue" onClick={next} />
          </>
        )

      // ── 4 · Location ──────────────────────────────────────────────────────
      case 4:
        return (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <h2 style={titleStyle}>Add your location of birth</h2>
              <CloseBtn onClick={doClose} />
            </div>
            {/* Dropdown renders above input to stay within sheet bounds */}
            {showDropdown && filteredCities.length > 0 && (
              <div style={{
                background: 'rgba(55,55,55,0.7)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 8,
                boxShadow: '2px 4px 6.2px 0px rgba(0,0,0,0.46)',
                overflow: 'hidden',
                flexShrink: 0,
              }}>
                {filteredCities.map((city, i) => (
                  <button
                    key={city}
                    onMouseDown={() => {
                      setLocation(city)
                      setLocationQuery(city)
                      setShowDropdown(false)
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 16px',
                      height: 40,
                      width: '100%',
                      textAlign: 'left',
                      background: i === 0 ? 'rgba(255,255,255,0.16)' : 'none',
                      border: 'none',
                      borderBottom: i < filteredCities.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: 18,
                      fontWeight: 400,
                      letterSpacing: '-0.9px',
                      color: '#ffffff',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.2)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = i === 0 ? 'rgba(255,255,255,0.16)' : 'none' }}
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
            <div style={{ position: 'relative' }}>
              <input
                autoFocus
                value={locationQuery}
                onChange={(e) => { setLocationQuery(e.target.value); setLocation(e.target.value); setShowDropdown(true) }}
                onFocus={() => { setFocused('location'); setShowDropdown(true) }}
                onBlur={() => { setFocused(null); setTimeout(() => setShowDropdown(false), 150) }}
                placeholder="City, Country"
                className="ob-input"
                style={inputStyle(focused === 'location')}
              />
              <img
                src={OB.mapPin}
                alt=""
                style={{
                  position: 'absolute', right: 14, top: '50%',
                  transform: 'translateY(-50%)',
                  width: 20, height: 20, opacity: 0.5,
                  pointerEvents: 'none',
                }}
              />
            </div>
            <CtaButton label="Continue" disabled={location.trim().length < 2} onClick={next} />
          </>
        )

      // ── 5 · Confirm ───────────────────────────────────────────────────────
      case 5:
        return (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <h2 style={titleStyle}>Confirm all information</h2>
              <CloseBtn onClick={doClose} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <ConfirmRow label="First name :" value={name} onEdit={() => goToStep(1)} />
              <ConfirmRow
                label="Date of birth :"
                value={`${dobDay} ${dobMonth}, ${dobYear}`}
                onEdit={() => goToStep(2)}
              />
              <ConfirmRow
                label="Birth time :"
                value={skipTob ? 'Unknown' : `${tobHour}:${tobMin}${tobAmpm}`}
                onEdit={() => goToStep(3)}
              />
              <ConfirmRow
                label="Birth location :"
                value={location || '—'}
                onEdit={() => goToStep(4)}
              />
            </div>
            <CtaButton label="Create account" onClick={handleComplete} isLoading={generating} />
          </>
        )

      default:
        return null
    }
  }

  return (
    <>
      {/* Dimmed backdrop */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 40, backgroundColor: 'rgba(0,0,0,0.55)' }} />

      {/* Sheet — solid dark, rounded top corners */}
      <div
        className="ob-sheet-enter"
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          zIndex: 50,
          background: '#1b1b1f',
          borderRadius: '20px 20px 0 0',
          padding: '20px 16px 44px',
          overflow: 'visible',
        }}
      >
        {/* Animated step content */}
        <div
          key={`step-${step}`}
          className={isExiting ? 'ob-step-exit' : 'ob-step-enter'}
          style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
        >
          {renderStep()}
        </div>
      </div>
    </>
  )
}
