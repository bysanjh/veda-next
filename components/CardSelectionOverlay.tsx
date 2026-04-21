'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ASSETS } from '@/lib/assets'

// Fresh Figma assets (fetched 2026-04-20, valid 7 days)
const RA = {
  // 3-card reveal
  jupiterCard:    'https://www.figma.com/api/mcp/asset/8f1aa7ba-d0a6-4827-a32b-88ff7c52651e',
  moonCard3:      'https://www.figma.com/api/mcp/asset/cb3a857e-ea54-414b-a674-f8b39300c103',
  marsCard:       'https://www.figma.com/api/mcp/asset/d914f8a5-4bd7-4816-adff-231c09124d55',
  threeEllipse50: 'https://www.figma.com/api/mcp/asset/4d6fddd6-e965-42ec-9e90-570ef89b0a3b',
  threeEllipse51: 'https://www.figma.com/api/mcp/asset/4dafb7cd-e667-46a4-9d54-53fed8441c9f',
  // yes/no reveal
  moonCardYN:     'https://www.figma.com/api/mcp/asset/f1dc37cd-e63f-42a1-94f9-a6892a1fbbd0',
  ynEllipse50:    'https://www.figma.com/api/mcp/asset/5879876c-b738-45c1-bfde-bcf7100e5d75',
  ynEllipse51:    'https://www.figma.com/api/mcp/asset/b9dfc241-bc02-42d3-86ac-a38b270cbf5d',
}

// ── Arc geometry ───────────────────────────────────────────────────────────────
const CARD_COUNT = 22
const CARD_W     = 83.7
const CARD_H     = 124
const ARC_CX     = 198
const X_STEP     = 47
const ANG_STEP   = 5.5
const ANG_CTR    = 0.83
const CY_MIN     = 111
const Y_CURVE    = 0.072

function buildDeck(count = CARD_COUNT) {
  const mid = (count - 1) / 2
  return Array.from({ length: count }, (_, i) => {
    const angle   = (i - mid) * ANG_STEP + ANG_CTR
    const xOffset = (i - mid) * X_STEP
    const cy      = CY_MIN + Y_CURVE * Math.pow(angle - ANG_CTR, 2)
    return { angle, xOffset, cy }
  })
}
const DECK = buildDeck()

const PHASE = { SHUFFLE: 'shuffle', FAN: 'fan', SELECT: 'select', REVEAL: 'reveal' } as const
type Phase = typeof PHASE[keyof typeof PHASE]

// ── Card back (purple + star) ──────────────────────────────────────────────────
function CardBack() {
  return (
    <div style={{ width: '100%', height: '100%', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
      <img src={ASSETS.glitterBg2} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: '3.3% 3.5%', background: '#372e6a', borderRadius: 2 }} />
      <img src={ASSETS.star2} alt="" style={{ position: 'absolute', width: 42, height: 42, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
    </div>
  )
}

// ── Animated fan card ──────────────────────────────────────────────────────────
interface FanCardProps {
  index: number
  phase: Phase
  hoveredCard: number | null
  selectedCard: number | null   // yes_no: single selection
  selectedCards: number[]        // three_card: multi-selection
  panOffset: number
  onHover: (i: number) => void
  onHoverEnd: () => void
  onTap: (i: number) => void
}

function FanCard({ index, phase, hoveredCard, selectedCard, selectedCards, panOffset, onHover, onHoverEnd, onTap }: FanCardProps) {
  const c = DECK[index]
  const fanX   = ARC_CX + c.xOffset + panOffset
  const inView = Math.abs(c.xOffset + panOffset) <= 260
  const isHov  = hoveredCard === index && phase === PHASE.FAN
  const isSel  = selectedCard === index || selectedCards.includes(index)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let anim: any
  if (phase === PHASE.SHUFFLE) {
    anim = {
      x: fanX - CARD_W / 2, y: c.cy - CARD_H / 2, rotate: c.angle, scaleY: -1, scaleX: 1,
      opacity: inView ? 1 : 0,
      transition: { delay: index * 0.04, duration: 0.55, ease: [0.32, 0.72, 0, 1] },
    }
  } else if (phase === PHASE.FAN) {
    if (isSel) {
      anim = {
        x: fanX - CARD_W / 2, y: (c.cy - CARD_H / 2) - 300,
        rotate: 0, scaleY: -1, scaleX: 1, opacity: 0,
        transition: { type: 'spring', stiffness: 220, damping: 28, mass: 0.8 },
      }
    } else {
      anim = {
        x: fanX - CARD_W / 2,
        y: isHov ? (c.cy - CARD_H / 2) - 22 : (c.cy - CARD_H / 2),
        rotate: c.angle, scaleY: -1, scaleX: 1,
        opacity: inView ? 1 : 0,
        transition: isHov
          ? { type: 'spring', stiffness: 420, damping: 26 }
          : { type: 'spring', stiffness: 340, damping: 30 },
      }
    }
  } else if (phase === PHASE.SELECT) {
    if (selectedCard === index) {
      anim = {
        x: fanX - CARD_W / 2, y: (c.cy - CARD_H / 2) - 300,
        rotate: 0, scaleY: -1, scaleX: 1, opacity: 0,
        transition: { type: 'spring', stiffness: 220, damping: 28, mass: 0.8 },
      }
    } else {
      anim = {
        x: fanX - CARD_W / 2, y: (c.cy - CARD_H / 2) + 80,
        rotate: c.angle, scaleY: -1, scaleX: 1, opacity: 0,
        transition: { delay: index * 0.01, duration: 0.28, ease: 'easeIn' },
      }
    }
  } else {
    anim = { opacity: 0, transition: { duration: 0.1 } }
  }

  const canTap = phase === PHASE.FAN && !isSel
  return (
    <motion.div
      initial={{ x: ARC_CX - CARD_W / 2, y: CY_MIN - CARD_H / 2, rotate: 0, scaleY: -1, scaleX: 1, opacity: 0 }}
      animate={anim}
      onHoverStart={() => canTap && onHover(index)}
      onHoverEnd={() => phase === PHASE.FAN && onHoverEnd()}
      onClick={() => canTap && onTap(index)}
      style={{
        position: 'absolute', width: CARD_W, height: CARD_H,
        cursor: canTap ? 'pointer' : 'default',
        filter: isHov ? 'brightness(1.3) drop-shadow(0 0 12px rgba(200,180,255,0.9))' : 'none',
        zIndex: isHov ? 20 : 1,
      }}
    >
      <CardBack />
    </motion.div>
  )
}

// ── Three-card constants ────────────────────────────────────────────────────────
const POSITIONS = ['Past', 'Present', 'Future']
const SLOT_W    = 109.542
const SLOT_H    = 164.313
const SLOT_GAP  = 10.687
const THUMB_W   = 95.85
const THUMB_H   = 142
const PAGER_W   = 354

const CARD_READINGS = [
  { label: 'Moon (Past)',       body: 'Confusion and doubt clouded your judgment. The path forward was obscured by illusion.' },
  { label: 'Empress (Present)', body: "You're stepping into clarity and self-trust. Abundance is available to you now." },
  { label: 'Tower (Future)',    body: 'A shake-up clears the way for something stronger. What breaks was never truly yours.' },
]
const CARD_IMAGES = [RA.jupiterCard, RA.moonCard3, RA.marsCard]

// ── Props ───────────────────────────────────────────────────────────────────────
interface Props {
  mode: 'yes_no' | 'three_card'
  onClose: () => void
  onCardSelected: () => void
  revealText: string
  revealStreaming: boolean
  onRevealClose: () => void
  onAnotherReading: () => void
}

export default function CardSelectionOverlay({
  mode, onClose, onCardSelected, revealText, revealStreaming, onRevealClose, onAnotherReading,
}: Props) {
  const [sheetY, setSheetY]             = useState(100)
  const [phase, setPhase]               = useState<Phase>(PHASE.SHUFFLE)
  const [hoveredCard, setHoveredCard]   = useState<number | null>(null)
  const [selectedCard, setSelectedCard] = useState<number | null>(null)   // yes_no
  const [selectedCards, setSelectedCards] = useState<number[]>([])         // three_card
  const [panOffset, setPanOffset]       = useState(0)
  const [cardFlipped, setCardFlipped]   = useState(false)
  const [showReading, setShowReading]   = useState(false)
  const [activeReading, setActiveReading] = useState(0)

  const isDragging  = useRef(false)
  const dragStart   = useRef(0)
  const offsetStart = useRef(0)
  const MIN_PAN = -X_STEP * 6
  const MAX_PAN =  X_STEP * 6
  const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setSheetY(0)))
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setPhase(PHASE.FAN), 1800)
    return () => clearTimeout(t)
  }, [])

  function handleTap(i: number) {
    if (mode === 'yes_no') {
      if (selectedCard !== null) return
      setSelectedCard(i)
      setPhase(PHASE.SELECT)
      onCardSelected()
      setTimeout(() => {
        setPhase(PHASE.REVEAL)
        setTimeout(() => {
          setCardFlipped(true)
          setTimeout(() => setShowReading(true), 650)
        }, 300)
      }, 650)
    } else {
      if (selectedCards.includes(i)) return
      const next = [...selectedCards, i]
      setSelectedCards(next)
      if (next.length === 3) {
        onCardSelected()
        setTimeout(() => setPhase(PHASE.REVEAL), 700)
      }
    }
  }

  function goToReading(i: number) {
    setActiveReading(Math.max(0, Math.min(2, i)))
  }

  const onMouseDown = (e: React.MouseEvent) => {
    if (phase !== PHASE.FAN) return
    isDragging.current = true; dragStart.current = e.clientX; offsetStart.current = panOffset
    e.preventDefault()
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    setPanOffset(clamp(offsetStart.current + e.clientX - dragStart.current, MIN_PAN, MAX_PAN))
  }
  const onMouseUp = () => { isDragging.current = false }
  const onTouchStart = (e: React.TouchEvent) => {
    if (phase !== PHASE.FAN) return
    dragStart.current = e.touches[0].clientX; offsetStart.current = panOffset
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (phase !== PHASE.FAN) return
    setPanOffset(clamp(offsetStart.current + e.touches[0].clientX - dragStart.current, MIN_PAN, MAX_PAN))
  }

  const isReveal = phase === PHASE.REVEAL

  return (
    <>
      {/* Scrim */}
      <div style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)',
        opacity: sheetY === 0 ? 1 : 0, transition: 'opacity 0.65s ease',
        pointerEvents: 'none', zIndex: 29,
      }} />

      {/* Sheet — fixed 402px wide, always centered (matches Figma mobile frame) */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', width: 402,
        height: 730,
        transform: `translateX(-50%) translateY(${sheetY}%)`,
        transition: 'transform 0.65s cubic-bezier(0.32,0.72,0,1)', zIndex: 30,
      }}>
        <div
          style={{
            position: 'relative', width: '100%', height: '100%',
            background: '#080808', borderRadius: '24px 24px 0 0', overflow: 'hidden',
            boxShadow: '1px 0 0 rgba(255,255,255,0.17), -1px -1px 0 rgba(255,255,255,0.17)',
            userSelect: 'none',
          }}
          onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
        >
          {/* Purple glow */}
          <div style={{ position: 'absolute', top: -187, left: -76, width: 509, height: 347, pointerEvents: 'none' }}>
            <img src={ASSETS.cardPullEllipse50} alt="" style={{ position: 'absolute', inset: '-12.1% -8.3%', width: '116.6%', height: '124.2%' }} />
          </div>

          {/* Close */}
          <button onClick={isReveal ? onRevealClose : onClose} style={{
            position: 'absolute', top: 24, right: 24, zIndex: 10,
            background: 'none', border: 'none', cursor: 'pointer', width: 32, height: 32, padding: 0,
          }}>
            <img src={ASSETS.closeX} alt="Close" style={{ width: 32, height: 32 }} />
          </button>

          {/* Title crossfade */}
          <div style={{ position: 'absolute', top: 24, left: 24, zIndex: 5, height: 30, overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              <motion.p
                key={isReveal ? 'reveal' : 'pick'}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 22, color: '#fff', letterSpacing: -0.66, whiteSpace: 'nowrap', margin: 0 }}
              >
                {isReveal ? (mode === 'yes_no' ? 'Your card' : 'Your cards') : 'The deck is open. Trust the pull.'}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* ── PICK VIEW ─────────────────────────────────────────────────────── */}
          <AnimatePresence>
            {!isReveal && (
              <motion.div
                key="pick"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                style={{
                  position: 'absolute', inset: 0,
                  pointerEvents: (phase === PHASE.SELECT || (mode === 'three_card' && selectedCards.length === 3)) ? 'none' : 'auto',
                }}
              >
                {/* Slots */}
                {mode === 'yes_no' ? (
                  <div style={{
                    position: 'absolute', top: 85, left: '50%', transform: 'translateX(-50%)',
                    width: 198, height: 297, background: 'rgba(217,217,217,0.06)',
                    border: `1.13px solid ${selectedCard !== null ? '#747474' : '#282828'}`,
                    borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'border-color 0.3s', zIndex: 5, overflow: 'hidden',
                  }}>
                    {selectedCard === null && (
                      <p style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 13.5, color: 'rgba(255,255,255,0.2)', textAlign: 'center', letterSpacing: -0.41, width: 80, lineHeight: 1.4, margin: 0 }}>
                        Tap on a card to get reading
                      </p>
                    )}
                  </div>
                ) : (
                  <div style={{ position: 'absolute', top: 68, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: SLOT_GAP }}>
                    {POSITIONS.map((label, i) => (
                      <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                        <div style={{
                          width: SLOT_W, height: SLOT_H, background: 'rgba(217,217,217,0.06)',
                          border: `1.13px solid ${selectedCards.length > i ? '#747474' : '#282828'}`,
                          borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'border-color 0.3s', overflow: 'hidden',
                        }}>
                          {selectedCards.length > i ? (
                            <div style={{ width: THUMB_W, height: THUMB_H }}><CardBack /></div>
                          ) : (
                            <p style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 7.5, color: 'rgba(255,255,255,0.18)', textAlign: 'center', letterSpacing: -0.23, lineHeight: 1.4, margin: 0, padding: '0 8px' }}>
                              {'Tap on a card\nto get reading'}
                            </p>
                          )}
                        </div>
                        <p style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 12, color: selectedCards.length > i ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.38)', letterSpacing: -0.36, margin: 0, transition: 'color 0.3s' }}>
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Selection count (3-card) */}
                {mode === 'three_card' && (
                  <AnimatePresence>
                    {phase === PHASE.FAN && selectedCards.length > 0 && (
                      <motion.p
                        key={selectedCards.length}
                        initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        style={{ position: 'absolute', top: 272, width: '100%', textAlign: 'center', fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 13, color: 'rgba(255,255,255,0.32)', pointerEvents: 'none', margin: 0 }}
                      >
                        {selectedCards.length}/3 selected
                      </motion.p>
                    )}
                  </AnimatePresence>
                )}

                {/* Fan */}
                <div
                  onMouseDown={onMouseDown} onTouchStart={onTouchStart} onTouchMove={onTouchMove}
                  style={{ position: 'absolute', top: mode === 'yes_no' ? 382 : 352, left: 0, width: '100%', height: 380, cursor: phase === PHASE.FAN ? 'grab' : 'default' }}
                >
                  {DECK.map((_, i) => (
                    <FanCard
                      key={i} index={i} phase={phase}
                      hoveredCard={hoveredCard} selectedCard={selectedCard} selectedCards={selectedCards}
                      panOffset={panOffset}
                      onHover={setHoveredCard} onHoverEnd={() => setHoveredCard(null)} onTap={handleTap}
                    />
                  ))}
                </div>

                {/* Edge fades */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: 52, height: '100%', zIndex: 3, pointerEvents: 'none', background: 'linear-gradient(to right, #080808 0%, transparent 100%)' }} />
                <div style={{ position: 'absolute', top: 0, right: 0, width: 52, height: '100%', zIndex: 3, pointerEvents: 'none', background: 'linear-gradient(to left, #080808 0%, transparent 100%)' }} />

                {/* Swipe hint */}
                <AnimatePresence>
                  {phase === PHASE.FAN && (
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
                      style={{ position: 'absolute', top: mode === 'yes_no' ? 629 : 647, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 4, pointerEvents: 'none', whiteSpace: 'nowrap' }}
                    >
                      <img src={ASSETS.swipeIcon} alt="" style={{ width: 20, height: 20, opacity: 0.6 }} />
                      {mode === 'three_card' && (
                        <p style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 12, color: '#7d7e83', lineHeight: 1.2, margin: 0 }}>
                          Pick 3 cards — Past, Present &amp; Future
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Shuffle label */}
                <AnimatePresence>
                  {phase === PHASE.SHUFFLE && (
                    <motion.p
                      initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.4 } }} exit={{ opacity: 0 }}
                      style={{ position: 'absolute', bottom: mode === 'yes_no' ? 100 : 80, width: '100%', textAlign: 'center', fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 14, color: 'rgba(255,255,255,0.45)', pointerEvents: 'none', margin: 0 }}
                    >
                      Shuffling the deck…
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── REVEAL VIEW (yes_no) ───────────────────────────────────────────── */}
          {mode === 'yes_no' && (
            <AnimatePresence>
              {isReveal && (
                <motion.div
                  key="reveal-yn"
                  initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.35 } }}
                  style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
                >
                  {/* Glow — ellipse50 (large purple blob) + ellipse51 (circular, centered on card) */}
                  <div style={{ position: 'absolute', left: -76, top: -187, width: 509, height: 347, pointerEvents: 'none', zIndex: 0 }}>
                    <img src={RA.ynEllipse50} alt="" style={{ position: 'absolute', inset: '-12.13% -8.27%', width: '116.6%', height: '124.2%' }} />
                  </div>
                  <div style={{ position: 'absolute', top: 67, left: 30, width: 342, height: 342, pointerEvents: 'none', zIndex: 0 }}>
                    <img src={RA.ynEllipse51} alt="" style={{ position: 'absolute', inset: '-29.2%', width: '158.4%', height: '158.4%' }} />
                  </div>

                  {/* 3D flip */}
                  <div style={{ position: 'absolute', top: 89, left: '50%', transform: 'translateX(-50%)', width: 197, height: 295, perspective: 900, zIndex: 2 }}>
                    <div style={{
                      width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d',
                      transform: cardFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
                      transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)',
                    }}>
                      <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', borderRadius: 10, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 48px rgba(147,112,219,0.22)' } as React.CSSProperties}>
                        <img src={RA.moonCardYN} alt="The Moon" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      </div>
                      <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', borderRadius: 10, overflow: 'hidden' } as React.CSSProperties}>
                        <CardBack />
                      </div>
                    </div>
                  </div>

                  {/* Reading panel */}
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={showReading ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                    transition={{ duration: 0.45 }}
                    style={{ position: 'absolute', top: 415, left: 24, right: 24, bottom: 16, display: 'flex', flexDirection: 'column' }}
                  >
                    <p style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 22, color: '#fff', letterSpacing: -1.1, lineHeight: 'normal', marginBottom: 12, flexShrink: 0 }}>
                      The Moon pulled you aside.
                    </p>
                    <div style={{ flex: 1, overflowY: 'auto', marginBottom: 16 }}>
                      {revealText ? (
                        <p style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 16, color: '#fff', letterSpacing: -0.48, lineHeight: '1.45', margin: 0, whiteSpace: 'pre-wrap' }}>
                          {revealText}
                        </p>
                      ) : (
                        <span style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                          <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                        </span>
                      )}
                    </div>
                    <button onClick={onAnotherReading} style={{ background: '#4c48a9', borderRadius: 8, padding: '16px', border: 'none', cursor: 'pointer', width: '100%', flexShrink: 0, fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 18, color: '#fff', letterSpacing: -0.72 }}>
                      Get another reading
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* ── REVEAL VIEW (three_card) ───────────────────────────────────────── */}
          {mode === 'three_card' && (
            <AnimatePresence>
              {isReveal && (
                <motion.div
                  key="reveal-3c"
                  initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.35 } }}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  {/* Glow blobs — always centered behind Moon card */}
                  <div style={{ position: 'absolute', left: -76, top: -187, width: 509, height: 347, pointerEvents: 'none', zIndex: 0 }}>
                    <img src={RA.threeEllipse50} alt="" style={{ position: 'absolute', inset: '-12.13% -8.27%', width: '116.6%', height: '124.2%' }} />
                  </div>
                  <div style={{ position: 'absolute', left: -12, top: 56, width: 426, height: 263, pointerEvents: 'none', zIndex: 0 }}>
                    <img src={RA.threeEllipse51} alt="" style={{ position: 'absolute', inset: '-42.19% -26.04%', width: '152.08%', height: '184.38%' }} />
                  </div>

                  {/* Three cards — flex row, centered, equal size */}
                  <div style={{
                    position: 'absolute',
                    top: 92,
                    left: 0, right: 0,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    gap: 8,
                    padding: '0 12px',
                    boxSizing: 'border-box',
                    overflow: 'visible',
                    zIndex: 2,
                  }}>
                    {CARD_IMAGES.map((src, i) => (
                      <motion.div
                        key={i}
                        onClick={() => goToReading(i)}
                        animate={{
                          scale: activeReading === i ? 1.04 : 1,
                          boxShadow: activeReading === i
                            ? '0 8px 24px rgba(139,92,246,0.4)'
                            : '0 0 0 rgba(0,0,0,0)',
                        }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        style={{
                          flex: 1,
                          minWidth: 0,
                          maxWidth: 'calc(33.333% - 6px)',
                          aspectRatio: '2/3',
                          borderRadius: 12,
                          overflow: 'hidden',
                          cursor: 'pointer',
                          border: activeReading === i
                            ? '1px solid rgba(139,92,246,0.5)'
                            : '1px solid rgba(255,255,255,0.1)',
                          transitionProperty: 'border-color',
                          transitionDuration: '0.25s',
                          transformOrigin: 'center center',
                        }}
                      >
                        <img src={src} alt={POSITIONS[i]} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Swipe hint */}
                  <div style={{ position: 'absolute', top: 284, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 3, pointerEvents: 'none', whiteSpace: 'nowrap' }}>
                    <img src={ASSETS.swipeIcon} alt="" style={{ width: 20, height: 20 }} />
                    <p style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 12, color: '#7d7e83', lineHeight: 1.2, margin: 0 }}>
                      Tap a card to read it
                    </p>
                  </div>

                  {/* Per-card readings — active card full white, inactive dimmed */}
                  <div style={{ position: 'absolute', top: 320, left: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 12, zIndex: 2 }}>
                    {CARD_READINGS.map((r, i) => (
                      <button
                        key={i}
                        onClick={() => goToReading(i)}
                        style={{ display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                      >
                        <p style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 14, color: '#ffffff', opacity: activeReading === i ? 1 : 0.35, transition: 'opacity 0.25s ease', letterSpacing: -0.42, lineHeight: 'normal', margin: 0 }}>{r.label}</p>
                        <p style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 16, color: '#ffffff', opacity: activeReading === i ? 1 : 0.35, transition: 'opacity 0.25s ease', letterSpacing: -0.48, lineHeight: 1.45, margin: 0 }}>{r.body}</p>
                      </button>
                    ))}
                  </div>

                  {/* Summary (from API) */}
                  <div style={{ position: 'absolute', left: 24, top: 491, right: 24, display: 'flex', flexDirection: 'column', gap: 6, zIndex: 2 }}>
                    <p style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 16, color: 'rgba(255,255,255,0.5)', letterSpacing: -0.48, lineHeight: 'normal', margin: 0 }}>
                      Summarized reading:
                    </p>
                    {revealText ? (
                      <p style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 16, color: '#fff', letterSpacing: -0.48, lineHeight: 1.45, margin: 0, whiteSpace: 'pre-wrap' }}>
                        {revealText}
                      </p>
                    ) : (
                      <span style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                        <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={onAnotherReading}
                    style={{ position: 'absolute', top: 651, left: '50%', transform: 'translateX(-50%)', width: PAGER_W, background: '#4c48a9', borderRadius: 8, padding: '16px', border: 'none', cursor: 'pointer', fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 18, color: '#fff', letterSpacing: -0.72 }}
                  >
                    Get another reading
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          )}

        </div>
      </div>
    </>
  )
}
