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
  moonCardYN:     'https://www.figma.com/api/mcp/asset/5a6b5798-cb6a-4ba6-9029-f4bea04ec4ac',
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
const FAN_TOP_YES_NO = 382
const FAN_TOP_THREE_CARD = 352
const SHUFFLE_CENTER_Y = 128

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

function arcPose(virtualOffset: number) {
  const angle = (virtualOffset / X_STEP) * ANG_STEP + ANG_CTR
  return {
    x: ARC_CX + virtualOffset - CARD_W / 2,
    y: CY_MIN + Y_CURVE * Math.pow(angle - ANG_CTR, 2) - CARD_H / 2,
    rotate: angle,
  }
}

function shuffleOffset(index: number, pass: number) {
  const dir = index % 2 === 0 ? 1 : -1
  const layer = ((index * 7 + pass * 5) % 11) - 5
  return {
    x: dir * (18 + (index % 5) * 5) + layer * 2,
    y: ((index + pass) % 4) * 3 - 6,
    rotate: dir * (7 + (index % 4) * 2) + layer * 0.8,
  }
}

const PHASE = { SHUFFLE: 'shuffle', FAN: 'fan', SELECT: 'select', REVEAL: 'reveal' } as const
type Phase = typeof PHASE[keyof typeof PHASE]

// ── Card back ─────────────────────────────────────────────────────────────────
function CardBack() {
  return (
    <div style={{ width: '100%', height: '100%', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
      {/* Scale slightly larger so the SVG's right/bottom drop-shadow is clipped,
          leaving the card rectangle centered and filling the frame */}
      <img src="/card-back.svg" alt="" style={{ position: 'absolute', top: 0, left: 0, width: '107%', height: '104%' }} />
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
  fanTop: number
  onHover: (i: number) => void
  onHoverEnd: () => void
  onTap: (i: number) => void
}

function FanCard({ index, phase, hoveredCard, selectedCard, selectedCards, panOffset, fanTop, onHover, onHoverEnd, onTap }: FanCardProps) {
  const c = DECK[index]
  const virtualOffset = c.xOffset + panOffset
  const fan = arcPose(virtualOffset)
  const inView = Math.abs(virtualOffset) <= 280
  const isHov  = hoveredCard === index && phase === PHASE.FAN
  const isSel  = selectedCard === index || selectedCards.includes(index)
  const selectedOrder = selectedCards.indexOf(index)
  const slotCenterX = selectedCard === index
    ? ARC_CX
    : selectedOrder >= 0
      ? 24 + selectedOrder * (SLOT_W + SLOT_GAP) + SLOT_W / 2
      : ARC_CX
  const slotCenterY = selectedCard === index
    ? 85 + 297 / 2 - fanTop
    : 68 + SLOT_H / 2 - fanTop
  const liftDelay = selectedCard === index ? 0 : Math.max(0, selectedOrder) * 0.08

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let anim: any
  if (phase === PHASE.SHUFFLE) {
    const s1 = shuffleOffset(index, 1)
    const s2 = shuffleOffset(index, 2)
    const s3 = shuffleOffset(index, 3)
    anim = {
      x: [
        ARC_CX - CARD_W / 2,
        ARC_CX - CARD_W / 2 + s1.x,
        ARC_CX - CARD_W / 2 + s2.x,
        ARC_CX - CARD_W / 2 + s3.x,
        fan.x,
      ],
      y: [
        SHUFFLE_CENTER_Y - CARD_H / 2,
        SHUFFLE_CENTER_Y - CARD_H / 2 + s1.y,
        SHUFFLE_CENTER_Y - CARD_H / 2 + s2.y,
        SHUFFLE_CENTER_Y - CARD_H / 2 + s3.y,
        fan.y,
      ],
      rotate: [0, s1.rotate, s2.rotate, s3.rotate, fan.rotate],
      scaleY: -1,
      scaleX: 1,
      opacity: [0, 1, 1, 1, inView ? 1 : 0],
      transition: {
        delay: Math.abs(index - (CARD_COUNT - 1) / 2) * 0.012,
        duration: 1.55,
        times: [0, 0.22, 0.44, 0.64, 1],
        ease: [0.22, 1, 0.36, 1],
      },
    }
  } else if (phase === PHASE.FAN) {
    if (isSel) {
      anim = {
        x: slotCenterX - CARD_W / 2,
        y: slotCenterY - CARD_H / 2,
        rotate: 0,
        scaleY: -1,
        scaleX: 1,
        opacity: 0,
        transition: {
          x: { type: 'spring', stiffness: 260, damping: 28, mass: 0.78, delay: liftDelay },
          y: { type: 'spring', stiffness: 260, damping: 28, mass: 0.78, delay: liftDelay },
          rotate: { type: 'spring', stiffness: 260, damping: 30, delay: liftDelay },
          opacity: { delay: 0.38 + liftDelay, duration: 0.12 },
        },
      }
    } else {
      anim = {
        x: fan.x,
        y: isHov ? fan.y - 22 : fan.y,
        rotate: fan.rotate, scaleY: -1, scaleX: 1,
        opacity: inView ? 1 : 0,
        transition: isHov
          ? { type: 'spring', stiffness: 420, damping: 26 }
          : { type: 'spring', stiffness: 340, damping: 30 },
      }
    }
  } else if (phase === PHASE.SELECT) {
    if (selectedCard === index) {
      anim = {
        x: slotCenterX - CARD_W / 2,
        y: slotCenterY - CARD_H / 2,
        rotate: 0,
        scaleY: -1,
        scaleX: 1,
        opacity: 0,
        transition: {
          x: { type: 'spring', stiffness: 260, damping: 28, mass: 0.78 },
          y: { type: 'spring', stiffness: 260, damping: 28, mass: 0.78 },
          rotate: { type: 'spring', stiffness: 260, damping: 30 },
          opacity: { delay: 0.42, duration: 0.16 },
        },
      }
    } else {
      anim = {
        x: fan.x, y: fan.y + 96,
        rotate: fan.rotate, scaleY: -1, scaleX: 1, opacity: 0,
        transition: { delay: index * 0.01, duration: 0.28, ease: 'easeIn' },
      }
    }
  } else {
    anim = { opacity: 0, transition: { duration: 0.1 } }
  }

  const canTap = phase === PHASE.FAN && !isSel
  return (
    <motion.div
      initial={{ x: ARC_CX - CARD_W / 2, y: SHUFFLE_CENTER_Y - CARD_H / 2, rotate: 0, scaleY: -1, scaleX: 1, opacity: 0 }}
      animate={anim}
      onHoverStart={() => canTap && onHover(index)}
      onHoverEnd={() => phase === PHASE.FAN && onHoverEnd()}
      onClick={() => canTap && onTap(index)}
      style={{
        position: 'absolute', width: CARD_W, height: CARD_H,
        willChange: 'transform, opacity',
        cursor: canTap ? 'pointer' : 'default',
        filter: isHov ? 'brightness(1.3) drop-shadow(0 0 12px rgba(200,180,255,0.9))' : 'none',
        zIndex: isHov ? 30 : isSel ? 24 : 1,
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
  { label: 'Moon (Past)',       body: 'Confusion and doubt clouded your judgment.' },
  { label: 'Empress (Present)', body: "You're stepping into clarity and self-trust." },
  { label: 'Tower (Future)',    body: 'A shake-up clears the way for something stronger.' },
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

  const isDragging      = useRef(false)
  const dragStart       = useRef(0)
  const offsetStart     = useRef(0)
  const carouselSwipeX  = useRef(0)
  const carouselSwipeY  = useRef(0)
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
          setTimeout(() => setShowReading(true), 700)
        }, 300)
      }, 2500)
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

  const onCarouselTouchStart = (e: React.TouchEvent) => {
    carouselSwipeX.current = e.touches[0].clientX
    carouselSwipeY.current = e.touches[0].clientY
  }
  const onCarouselTouchEnd = (e: React.TouchEvent) => {
    const dx = carouselSwipeX.current - e.changedTouches[0].clientX
    const dy = Math.abs(carouselSwipeY.current - e.changedTouches[0].clientY)
    if (Math.abs(dx) > 40 && Math.abs(dx) > dy) {
      setActiveReading(prev => dx > 0 ? (prev + 1) % 3 : (prev + 2) % 3)
    }
  }

  const isReveal = phase === PHASE.REVEAL
  const fanTop = mode === 'yes_no' ? FAN_TOP_YES_NO : FAN_TOP_THREE_CARD

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
        height: 'min(730px, calc(100dvh - 121px))',
        transform: `translateX(-50%) translateY(${sheetY}%)`,
        transition: 'transform 0.65s cubic-bezier(0.32,0.72,0,1)', zIndex: 30,
      }}>
        <div
          style={{
            position: 'relative', width: '100%', height: '100%',
            background: '#080808', borderRadius: '24px 24px 0 0', overflow: 'hidden',
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
                    {selectedCard !== null ? (
                      <div style={{ width: '100%', height: '100%' }}><CardBack /></div>
                    ) : (
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
                  style={{ position: 'absolute', top: fanTop, left: 0, width: '100%', height: 380, cursor: phase === PHASE.FAN ? 'grab' : 'default' }}
                >
                  {DECK.map((_, i) => (
                    <FanCard
                      key={i} index={i} phase={phase}
                      hoveredCard={hoveredCard} selectedCard={selectedCard} selectedCards={selectedCards}
                      panOffset={panOffset}
                      fanTop={fanTop}
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
                  style={{ position: 'absolute', inset: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                >
                  {/* Circular glow — decorative, absolute */}
                  <div style={{
                    position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                    top: 33, width: 420, height: 420,
                    pointerEvents: 'none', zIndex: 0,
                    background: 'radial-gradient(circle, rgba(114,129,188,0.22) 0%, rgba(114,129,188,0.10) 40%, rgba(114,129,188,0.03) 66%, transparent 82%)',
                  }} />

                  {/* Spacer below the "Your card" header */}
                  <div style={{ flexShrink: 0, height: 80 }} />

                  {/* Card — compact size to leave generous room for reading text */}
                  <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', paddingBottom: 28, zIndex: 2 }}>
                    <div style={{
                      width: 198,
                      height: 297,
                      perspective: 900,
                    }}>
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
                  </div>

                  {/* Reading panel — fills remaining space */}
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={showReading ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                    transition={{ duration: 0.45 }}
                    style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', paddingLeft: 24, paddingRight: 24, paddingBottom: 'max(16px, env(safe-area-inset-bottom, 0px))', zIndex: 2 }}
                  >
                    {/* Heading — always visible, not inside scroll */}
                    <p style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 20, color: '#fff', letterSpacing: -1, lineHeight: 'normal', margin: '0 0 10px', flexShrink: 0 }}>
                      You&apos;ve pulled The Moon card.{'\n'}This is a NO.
                    </p>
                    {/* Reading body — scrolls only if unusually long */}
                    <div className="no-scrollbar" style={{ flex: 1, minHeight: 0, overflowY: 'auto', marginBottom: 10 }}>
                      {revealText ? (
                        revealText
                          .split(/(?<=[.!?])\s+(?=[A-Z])/g)
                          .filter(s => s.trim())
                          .map((para, i) => (
                            <p key={i} style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 15.4, color: '#fff', letterSpacing: -0.46, lineHeight: '1.4', margin: i === 0 ? 0 : '12px 0 0' }}>
                              {para.trim()}
                            </p>
                          ))
                      ) : (
                        <span style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                          <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                        </span>
                      )}
                    </div>
                    <button onClick={onAnotherReading} style={{ background: '#372e6a', borderRadius: 8, padding: '12px 0', border: 'none', cursor: 'pointer', width: '100%', flexShrink: 0, fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 17, color: '#fff', letterSpacing: -0.68 }}>
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
                  style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
                  onTouchStart={onCarouselTouchStart}
                  onTouchEnd={onCarouselTouchEnd}
                >
                  {/* Glow — wide ellipse behind cards */}
                  <div style={{
                    position: 'absolute', left: -12, top: 56, width: 426, height: 263,
                    pointerEvents: 'none', zIndex: 0,
                    background: 'radial-gradient(ellipse 60% 65% at 50% 42%, rgba(110,95,215,0.55) 0%, rgba(80,65,175,0.25) 44%, rgba(60,50,140,0.07) 70%, transparent 85%)',
                  }} />

                  {/* Swipe carousel — all 3 cards anchored to center, x-offset drives position */}
                  <div style={{ position: 'absolute', top: 92, left: 0, right: 0, height: 186 }}>
                    {CARD_IMAGES.map((src, i) => {
                      const slot = (i - activeReading + 3) % 3
                      // slot 0=center, slot 1=right (+117px), slot 2=left (-117px)
                      const xOff = slot === 0 ? 0 : slot === 1 ? 117 : -117
                      const isCenter = slot === 0
                      return (
                        <motion.div
                          key={i}
                          style={{
                            position: 'absolute', left: '50%', marginLeft: -61.5, top: 0,
                            width: 123, height: 184, borderRadius: 8, overflow: 'hidden', cursor: 'pointer',
                            zIndex: isCenter ? 2 : 1,
                            boxShadow: isCenter ? '19px 0 36px rgba(0,0,0,0.4), -19px 0 36px rgba(0,0,0,0.4)' : 'none',
                          }}
                          animate={{ x: xOff }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          onClick={() => setActiveReading(i)}
                        >
                          <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                          <motion.div
                            animate={{ opacity: isCenter ? 0 : 1 }}
                            transition={{ duration: 0.2 }}
                            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', borderRadius: 8 }}
                          />
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Swipe hint */}
                  <div style={{ position: 'absolute', top: 284, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 3, pointerEvents: 'none', whiteSpace: 'nowrap' }}>
                    <img src={ASSETS.swipeIcon} alt="" style={{ width: 20, height: 20 }} />
                    <p style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 12, color: '#7d7e83', lineHeight: 1.2, margin: 0 }}>
                      Swipe to switch cards
                    </p>
                  </div>

                  {/* Scrollable content */}
                  <div className="no-scrollbar" style={{ position: 'absolute', top: 312, left: 0, right: 0, bottom: 88, overflowY: 'auto', padding: '0 24px' }}>
                    {/* Per-card reading — fades when active card changes */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeReading}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        style={{ marginBottom: 20 }}
                      >
                        <p style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 14, color: 'rgba(255,255,255,0.6)', letterSpacing: -0.42, lineHeight: 'normal', margin: '0 0 6px' }}>
                          {CARD_READINGS[activeReading].label}
                        </p>
                        <p style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 16, color: '#fff', letterSpacing: -0.48, lineHeight: 1.45, margin: 0 }}>
                          {CARD_READINGS[activeReading].body}
                        </p>
                      </motion.div>
                    </AnimatePresence>

                    {/* Summarized reading — shared for all cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <p style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 14, color: 'rgba(255,255,255,0.5)', letterSpacing: -0.42, lineHeight: 'normal', margin: 0 }}>
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
                  </div>

                  {/* Button pinned at bottom */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 24px 24px', background: 'linear-gradient(to top, #080808 65%, transparent)' }}>
                    <button
                      onClick={onAnotherReading}
                      style={{
                        width: '100%', background: '#372e6a', borderRadius: 8, padding: '16px 0',
                        border: 'none', cursor: 'pointer',
                        fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 18, color: '#fff', letterSpacing: -0.72,
                      }}
                    >
                      Get another reading
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

        </div>
      </div>
    </>
  )
}
