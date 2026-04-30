'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
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

// ── Arc geometry (optimized for iPhone 16: 393x852) ─────────────────────────────
const CARD_COUNT = 22
const CARD_W     = 70      // Slightly smaller cards for mobile
const CARD_H     = 104     // Proportional height
const SHEET_W    = 393     // iPhone 16 width
const ARC_CX     = SHEET_W / 2  // Center of sheet
const X_STEP     = 40
const ANG_STEP   = 5.5
const ANG_CTR    = 0.83
const CY_MIN     = 180     // Moved down for better mobile visibility
const Y_CURVE    = 0.072

// Arc pivot point (below visible area for rotational browsing)
const ARC_PIVOT_Y = 600

function buildDeck(count = CARD_COUNT) {
  const mid = (count - 1) / 2
  return Array.from({ length: count }, (_, i) => {
    const angle   = (i - mid) * ANG_STEP + ANG_CTR
    const xOffset = (i - mid) * X_STEP
    const cy      = CY_MIN + Y_CURVE * Math.pow(angle - ANG_CTR, 2)
    return { angle, xOffset, cy, index: i }
  })
}
const DECK = buildDeck()

const PHASE = { SHUFFLE: 'shuffle', FAN: 'fan', SELECT: 'select', REVEAL: 'reveal' } as const
type Phase = typeof PHASE[keyof typeof PHASE]

// Shuffle sub-phases - realistic riffle shuffle
const SHUFFLE_STEP = { 
  STACK: 'stack',           // Cards gather into a stack
  SPLIT: 'split',           // Split into two halves (left/right hands)
  RIFFLE_UP: 'riffle_up',   // Both halves rise up, tilted
  RIFFLE_DOWN: 'riffle_down', // Cards interleave falling down
  COLLECT: 'collect',       // Collect back together
  SPREAD: 'spread'          // Spread into arc
} as const
type ShuffleStep = typeof SHUFFLE_STEP[keyof typeof SHUFFLE_STEP]

// ── Card back ─────────────────────────────────────────────────────────────────
function CardBack() {
  return (
    <div style={{ width: '100%', height: '100%', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
      <img src="/card-back.svg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  )
}

// ── Animated fan card with enhanced animations ──────────────────────────────────
interface FanCardProps {
  index: number
  phase: Phase
  shuffleStep: ShuffleStep
  hoveredCard: number | null
  selectedCard: number | null
  selectedCards: number[]
  arcRotation: number
  onHover: (i: number) => void
  onHoverEnd: () => void
  onTap: (i: number) => void
  mode: 'yes_no' | 'three_card'
}

function FanCard({ index, phase, shuffleStep, hoveredCard, selectedCard, selectedCards, arcRotation, onHover, onHoverEnd, onTap, mode }: FanCardProps) {
  const c = DECK[index]
  const mid = (CARD_COUNT - 1) / 2
  
  // Calculate arc position with rotation
  const baseAngle = (index - mid) * ANG_STEP + ANG_CTR
  const rotatedAngle = baseAngle + arcRotation
  const radians = (rotatedAngle * Math.PI) / 180
  const arcRadius = 480
  
  // Position on arc
  const arcX = ARC_CX + Math.sin(radians) * arcRadius * 0.6
  const arcY = c.cy + (1 - Math.cos(radians)) * arcRadius * 0.08
  
  // Check if card is in view based on rotation
  const inView = Math.abs(rotatedAngle) < 70
  const isHov = hoveredCard === index && phase === PHASE.FAN
  const isSel = selectedCard === index || selectedCards.includes(index)
  
  // Slot position for selected card (centered in slot)
  const slotX = ARC_CX - CARD_W / 2
  const slotY = mode === 'yes_no' ? 70 + (245 - CARD_H) / 2 : 68 + (140 - CARD_H) / 2

  // Animation states based on phase and shuffle step
  const getAnimation = () => {
    // SHUFFLE phase animations - realistic riffle shuffle
    if (phase === PHASE.SHUFFLE) {
      const stackX = ARC_CX - CARD_W / 2
      const stackY = 250 // Center stack position for mobile
      const isLeftHalf = index < CARD_COUNT / 2
      const halfIndex = isLeftHalf ? index : index - Math.floor(CARD_COUNT / 2)
      
      // STACK - cards gather into neat stack
      if (shuffleStep === SHUFFLE_STEP.STACK) {
        return {
          x: stackX,
          y: stackY - index * 0.5,
          rotate: 0,
          scaleY: -1,
          scaleX: 1,
          opacity: 1,
          transition: { 
            duration: 0.3,
            delay: index * 0.01,
            ease: [0.4, 0, 0.2, 1]
          },
        }
      }
      
      // SPLIT - split into two halves (left and right hands)
      if (shuffleStep === SHUFFLE_STEP.SPLIT) {
        const splitOffset = isLeftHalf ? -55 : 55
        const tilt = isLeftHalf ? 8 : -8
        return {
          x: stackX + splitOffset,
          y: stackY - halfIndex * 0.5,
          rotate: tilt,
          scaleY: -1,
          scaleX: 1,
          opacity: 1,
          transition: {
            duration: 0.25,
            delay: 0.02,
            type: 'spring',
            stiffness: 400,
            damping: 28,
          },
        }
      }
      
      // RIFFLE_UP - both halves rise up, tilted inward like hands lifting
      if (shuffleStep === SHUFFLE_STEP.RIFFLE_UP) {
        const splitOffset = isLeftHalf ? -45 : 45
        const tilt = isLeftHalf ? 15 : -15
        return {
          x: stackX + splitOffset,
          y: stackY - 80 - halfIndex * 0.4,
          rotate: tilt,
          scaleY: -1,
          scaleX: 1,
          opacity: 1,
          transition: {
            duration: 0.2,
            type: 'spring',
            stiffness: 350,
            damping: 22,
          },
        }
      }
      
      // RIFFLE_DOWN - cards interleave falling down one by one
      if (shuffleStep === SHUFFLE_STEP.RIFFLE_DOWN) {
        // Interleave: alternate between left and right halves
        const interleaveIndex = isLeftHalf 
          ? halfIndex * 2 
          : halfIndex * 2 + 1
        const fallDelay = (CARD_COUNT - interleaveIndex) * 0.025
        
        return {
          x: stackX + (isLeftHalf ? -8 : 8) * (1 - interleaveIndex / CARD_COUNT),
          y: stackY + 15 + interleaveIndex * 0.7,
          rotate: (isLeftHalf ? 3 : -3) * (1 - interleaveIndex / CARD_COUNT),
          scaleY: -1,
          scaleX: 1,
          opacity: 1,
          transition: {
            duration: 0.15,
            delay: fallDelay,
            ease: [0.2, 0, 0.4, 1],
          },
        }
      }
      
      // COLLECT - tap/square up the deck
      if (shuffleStep === SHUFFLE_STEP.COLLECT) {
        return {
          x: stackX,
          y: stackY - index * 0.5,
          rotate: 0,
          scaleY: -1,
          scaleX: 1,
          opacity: 1,
          transition: {
            duration: 0.2,
            delay: 0.05,
            type: 'spring',
            stiffness: 400,
            damping: 30,
          },
        }
      }
      
      // SPREAD - fan out into arc from center outward
      if (shuffleStep === SHUFFLE_STEP.SPREAD) {
        // Spread from center - cards closest to center animate first
        const centerIndex = Math.floor(CARD_COUNT / 2)
        const distFromCenter = Math.abs(index - centerIndex)
        const spreadDelay = distFromCenter * 0.04
        
        return {
          x: arcX - CARD_W / 2,
          y: arcY - CARD_H / 2,
          rotate: rotatedAngle,
          scaleY: -1,
          scaleX: 1,
          opacity: 1,
          transition: {
            duration: 0.45,
            delay: spreadDelay,
            type: 'spring',
            stiffness: 200,
            damping: 24,
          },
        }
      }
    }
    
    // FAN phase - interactive browsing
    if (phase === PHASE.FAN) {
      if (isSel) {
        // Card rises up when selected
        return {
          x: slotX,
          y: slotY,
          rotate: 0,
          scaleY: -1,
          scaleX: 1,
          scale: 1,
          opacity: 1,
          transition: {
            type: 'spring',
            stiffness: 180,
            damping: 22,
            mass: 0.8,
          },
        }
      }
      
      // Normal fan card with hover effect
      return {
        x: arcX - CARD_W / 2,
        y: isHov ? (arcY - CARD_H / 2) - 28 : (arcY - CARD_H / 2),
        rotate: rotatedAngle,
        scaleY: -1,
        scaleX: 1,
        scale: isHov ? 1.08 : 1,
        opacity: inView ? 1 : 0,
        transition: isHov
          ? { type: 'spring', stiffness: 400, damping: 22 }
          : { type: 'spring', stiffness: 280, damping: 26 },
      }
    }
    
    // SELECT phase
    if (phase === PHASE.SELECT) {
      if (selectedCard === index) {
        // Selected card moves to slot
        return {
          x: slotX,
          y: slotY,
          rotate: 0,
          scaleY: -1,
          scaleX: 1,
          scale: 1,
          opacity: 1,
          transition: {
            type: 'spring',
            stiffness: 160,
            damping: 20,
            mass: 0.9,
          },
        }
      }
      
      // Other cards fall away - systematic from selected card outward
      const distFromSelected = Math.abs(index - (selectedCard || 0))
      return {
        x: arcX - CARD_W / 2,
        y: (arcY - CARD_H / 2) + 100,
        rotate: rotatedAngle,
        scaleY: -1,
        scaleX: 1,
        opacity: 0,
        transition: {
          duration: 0.35,
          delay: distFromSelected * 0.025,
          ease: [0.4, 0, 1, 1],
        },
      }
    }
    
    // REVEAL phase - hide fan cards
    return {
      opacity: 0,
      transition: { duration: 0.15 },
    }
  }

  const anim = getAnimation()
  const canTap = phase === PHASE.FAN && !isSel
  
  return (
    <motion.div
      initial={{ 
        x: ARC_CX - CARD_W / 2, 
        y: 350, 
        rotate: 0, 
        scaleY: -1, 
        scaleX: 1, 
        opacity: 0 
      }}
      animate={anim}
      onHoverStart={() => canTap && onHover(index)}
      onHoverEnd={() => phase === PHASE.FAN && onHoverEnd()}
      onClick={() => canTap && onTap(index)}
      style={{
        position: 'absolute',
        width: CARD_W,
        height: CARD_H,
        cursor: canTap ? 'pointer' : 'default',
        filter: isHov 
          ? 'brightness(1.35) drop-shadow(0 0 16px rgba(180,160,255,0.95))' 
          : isSel 
            ? 'drop-shadow(0 8px 24px rgba(0,0,0,0.5))'
            : 'none',
        // Z-index: rightmost cards on top (higher index = higher z)
        zIndex: isHov ? 50 : isSel ? 40 : index,
        transformOrigin: 'center bottom',
      }}
    >
      <CardBack />
    </motion.div>
  )
}

// ── Three-card constants (iPhone 16 optimized) ─────────────────────────────────
const POSITIONS = ['Past', 'Present', 'Future']
const SLOT_W    = 95
const SLOT_H    = 140
const SLOT_GAP  = 8
const THUMB_W   = 80
const THUMB_H   = 118
const PAGER_W   = 320

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
  const [shuffleStep, setShuffleStep]   = useState<ShuffleStep>(SHUFFLE_STEP.STACK)
  const [hoveredCard, setHoveredCard]   = useState<number | null>(null)
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [arcRotation, setArcRotation]   = useState(0)
  const [cardFlipped, setCardFlipped]   = useState(false)
  const [showReading, setShowReading]   = useState(false)
  const [activeReading, setActiveReading] = useState(0)

  // Momentum scrolling
  const isDragging      = useRef(false)
  const dragStartX      = useRef(0)
  const rotationStart   = useRef(0)
  const velocity        = useRef(0)
  const lastX           = useRef(0)
  const lastTime        = useRef(0)
  const momentumFrame   = useRef<number | null>(null)
  
  const carouselSwipeX  = useRef(0)
  const carouselSwipeY  = useRef(0)
  
  const MIN_ROTATION = -35
  const MAX_ROTATION = 35
  const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

  // Sheet animation
  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setSheetY(0)))
  }, [])

  // Shuffle sequence timing - realistic riffle shuffle
  useEffect(() => {
    // Stack → Split → Riffle Up → Riffle Down → Collect → Spread → FAN
    const timers: NodeJS.Timeout[] = []
    
    timers.push(setTimeout(() => setShuffleStep(SHUFFLE_STEP.SPLIT), 450))
    timers.push(setTimeout(() => setShuffleStep(SHUFFLE_STEP.RIFFLE_UP), 700))
    timers.push(setTimeout(() => setShuffleStep(SHUFFLE_STEP.RIFFLE_DOWN), 950))
    timers.push(setTimeout(() => setShuffleStep(SHUFFLE_STEP.COLLECT), 1550))
    timers.push(setTimeout(() => setShuffleStep(SHUFFLE_STEP.SPREAD), 1850))
    timers.push(setTimeout(() => setPhase(PHASE.FAN), 2800))
    
    return () => timers.forEach(clearTimeout)
  }, [])

  // Momentum animation
  const animateMomentum = useCallback(() => {
    if (Math.abs(velocity.current) < 0.1) {
      momentumFrame.current = null
      return
    }
    
    velocity.current *= 0.94 // Friction
    setArcRotation(prev => clamp(prev + velocity.current, MIN_ROTATION, MAX_ROTATION))
    momentumFrame.current = requestAnimationFrame(animateMomentum)
  }, [])

  // Cleanup momentum on unmount
  useEffect(() => {
    return () => {
      if (momentumFrame.current) {
        cancelAnimationFrame(momentumFrame.current)
      }
    }
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

  // Mouse drag for arc rotation
  const onMouseDown = (e: React.MouseEvent) => {
    if (phase !== PHASE.FAN) return
    if (momentumFrame.current) {
      cancelAnimationFrame(momentumFrame.current)
      momentumFrame.current = null
    }
    isDragging.current = true
    dragStartX.current = e.clientX
    rotationStart.current = arcRotation
    lastX.current = e.clientX
    lastTime.current = Date.now()
    velocity.current = 0
    e.preventDefault()
  }
  
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    const dx = e.clientX - dragStartX.current
    const newRotation = clamp(rotationStart.current + dx * 0.12, MIN_ROTATION, MAX_ROTATION)
    setArcRotation(newRotation)
    
    // Track velocity
    const now = Date.now()
    const dt = now - lastTime.current
    if (dt > 0) {
      velocity.current = (e.clientX - lastX.current) * 0.12 / (dt / 16)
    }
    lastX.current = e.clientX
    lastTime.current = now
  }
  
  const onMouseUp = () => {
    if (isDragging.current) {
      isDragging.current = false
      // Start momentum if there's velocity
      if (Math.abs(velocity.current) > 0.5) {
        momentumFrame.current = requestAnimationFrame(animateMomentum)
      }
    }
  }

  // Touch drag for arc rotation
  const onTouchStart = (e: React.TouchEvent) => {
    if (phase !== PHASE.FAN) return
    if (momentumFrame.current) {
      cancelAnimationFrame(momentumFrame.current)
      momentumFrame.current = null
    }
    isDragging.current = true
    dragStartX.current = e.touches[0].clientX
    rotationStart.current = arcRotation
    lastX.current = e.touches[0].clientX
    lastTime.current = Date.now()
    velocity.current = 0
  }
  
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || phase !== PHASE.FAN) return
    const dx = e.touches[0].clientX - dragStartX.current
    const newRotation = clamp(rotationStart.current + dx * 0.12, MIN_ROTATION, MAX_ROTATION)
    setArcRotation(newRotation)
    
    // Track velocity
    const now = Date.now()
    const dt = now - lastTime.current
    if (dt > 0) {
      velocity.current = (e.touches[0].clientX - lastX.current) * 0.12 / (dt / 16)
    }
    lastX.current = e.touches[0].clientX
    lastTime.current = now
  }
  
  const onTouchEnd = () => {
    if (isDragging.current) {
      isDragging.current = false
      if (Math.abs(velocity.current) > 0.5) {
        momentumFrame.current = requestAnimationFrame(animateMomentum)
      }
    }
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

  return (
    <>
      {/* Scrim */}
      <div style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)',
        opacity: sheetY === 0 ? 1 : 0, transition: 'opacity 0.65s ease',
        pointerEvents: 'none', zIndex: 29,
      }} />

      {/* Sheet — iPhone 16 optimized (393px), always centered */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', width: SHEET_W,
        maxWidth: '100vw',
        height: 'min(730px, calc(100dvh - 80px))',
        transform: `translateX(-50%) translateY(${sheetY}%)`,
        transition: 'transform 0.65s cubic-bezier(0.32,0.72,0,1)', zIndex: 30,
        overflow: 'hidden', borderRadius: '24px 24px 0 0', border: 'none',
        background: '#080808',
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
          <div style={{ position: 'absolute', top: -120, left: -58, width: '130%', height: 300, pointerEvents: 'none' }}>
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
                    position: 'absolute', top: 70, left: '50%',
                    transform: 'translateX(-50%)',
                    width: 165, height: 245, background: 'rgba(217,217,217,0.06)',
                    border: selectedCard !== null ? 'none' : '1.13px solid #282828',
                    borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'border-color 0.3s', zIndex: 5, overflow: 'hidden',
                  }}>
                    {selectedCard !== null ? (
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.3 }}
                        style={{ width: '100%', height: '100%', border: 'none' }}
                      >
                        <CardBack />
                      </motion.div>
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
                            <motion.div 
                              initial={{ scale: 0.85, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                              style={{ width: THUMB_W, height: THUMB_H }}
                            >
                              <CardBack />
                            </motion.div>
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
                  onMouseDown={onMouseDown} 
                  onTouchStart={onTouchStart} 
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                  style={{ 
                    position: 'absolute', 
                    top: mode === 'yes_no' ? 320 : 300, 
                    left: 0, 
                    width: '100%', 
                    height: 350, 
                    cursor: phase === PHASE.FAN ? 'grab' : 'default',
                    touchAction: 'none',
                  }}
                >
                  {DECK.map((_, i) => (
                    <FanCard
                      key={i} 
                      index={i} 
                      phase={phase}
                      shuffleStep={shuffleStep}
                      hoveredCard={hoveredCard} 
                      selectedCard={selectedCard} 
                      selectedCards={selectedCards}
                      arcRotation={arcRotation}
                      onHover={setHoveredCard} 
                      onHoverEnd={() => setHoveredCard(null)} 
                      onTap={handleTap}
                      mode={mode}
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
                      style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 4, pointerEvents: 'none', whiteSpace: 'nowrap' }}
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
                      style={{ position: 'absolute', bottom: 60, width: '100%', textAlign: 'center', fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 14, color: 'rgba(255,255,255,0.45)', pointerEvents: 'none', margin: 0 }}
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
                    top: 25, width: 350, height: 350,
                    pointerEvents: 'none', zIndex: 0,
                    background: 'radial-gradient(circle, rgba(114,129,188,0.22) 0%, rgba(114,129,188,0.10) 40%, rgba(114,129,188,0.03) 66%, transparent 82%)',
                  }} />

                  {/* Spacer below the "Your card" header */}
                  <div style={{ flexShrink: 0, height: 60 }} />

                  {/* Card — compact size to leave generous room for reading text */}
                  <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', paddingBottom: 20, zIndex: 2 }}>
                    <motion.div 
                      initial={{ scale: 0.95, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      style={{
                        width: 165,
                        height: 245,
                        perspective: 900,
                      }}
                    >
                      <motion.div 
                        initial={{ rotateY: 180 }}
                        animate={{ rotateY: cardFlipped ? 0 : 180 }}
                        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                          width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d',
                        }}
                      >
                        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', borderRadius: 10, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 48px rgba(147,112,219,0.22)' } as React.CSSProperties}>
                          <img src={RA.moonCardYN} alt="The Moon" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        </div>
                        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', borderRadius: 10, overflow: 'hidden' } as React.CSSProperties}>
                          <CardBack />
                        </div>
                      </motion.div>
                    </motion.div>
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
                    position: 'absolute', left: 0, top: 50, width: '100%', height: 220,
                    pointerEvents: 'none', zIndex: 0,
                    background: 'radial-gradient(ellipse 60% 65% at 50% 42%, rgba(110,95,215,0.55) 0%, rgba(80,65,175,0.25) 44%, rgba(60,50,140,0.07) 70%, transparent 85%)',
                  }} />

                  {/* Swipe carousel — all 3 cards anchored to center, x-offset drives position */}
                  <div style={{ position: 'absolute', top: 80, left: 0, right: 0, height: 160 }}>
                    {CARD_IMAGES.map((src, i) => {
                      const slot = (i - activeReading + 3) % 3
                      // slot 0=center, slot 1=right (+100px), slot 2=left (-100px)
                      const xOff = slot === 0 ? 0 : slot === 1 ? 100 : -100
                      const isCenter = slot === 0
                      return (
                        <motion.div
                          key={i}
                          style={{
                            position: 'absolute', left: '50%', marginLeft: -52, top: 0,
                            width: 104, height: 155, borderRadius: 8, overflow: 'hidden', cursor: 'pointer',
                            zIndex: isCenter ? 2 : 1,
                            boxShadow: isCenter ? '15px 0 30px rgba(0,0,0,0.4), -15px 0 30px rgba(0,0,0,0.4)' : 'none',
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
                  <div style={{ position: 'absolute', top: 248, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 3, pointerEvents: 'none', whiteSpace: 'nowrap' }}>
                    <img src={ASSETS.swipeIcon} alt="" style={{ width: 18, height: 18 }} />
                    <p style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 11, color: '#7d7e83', lineHeight: 1.2, margin: 0 }}>
                      Swipe to switch cards
                    </p>
                  </div>

                  {/* Scrollable content */}
                  <div className="no-scrollbar" style={{ position: 'absolute', top: 275, left: 0, right: 0, bottom: 80, overflowY: 'auto', padding: '0 20px' }}>
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
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px 20px', background: 'linear-gradient(to top, #080808 65%, transparent)' }}>
                    <button
                      onClick={onAnotherReading}
                      style={{
                        width: '100%', background: '#372e6a', borderRadius: 8, padding: '14px 0',
                        border: 'none', cursor: 'pointer',
                        fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 16, color: '#fff', letterSpacing: -0.64,
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
