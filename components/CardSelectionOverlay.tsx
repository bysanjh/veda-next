'use client'
import Image from 'next/image'
import { useRef } from 'react'
import { ASSETS } from '@/lib/assets'

interface CardSelectionOverlayProps {
  mode: 'yes_no' | 'three_card'
  onClose: () => void
  onCardSelected: (slotIndex?: number) => void
  selectedSlots: number[]
}

const CARD_ROTATIONS = [-24.74, -19.02, -12.81, -8.2, -1.3, 5.31, 10.28, 14.48, 22.8, 26.4]
const CARD_OFFSETS = [-214.56, -171.43, -125.73, -76.92, -28.34, 20.83, 71.3, 120.71, 168.36, 211.46]

export default function CardSelectionOverlay({
  mode,
  onClose,
  onCardSelected,
  selectedSlots,
}: CardSelectionOverlayProps) {
  const fanRef = useRef<HTMLDivElement>(null)
  const numSlots = mode === 'yes_no' ? 1 : 3

  function handleCardClick(slotIndex: number) {
    if (mode === 'yes_no') {
      onCardSelected(0)
    } else {
      const nextEmpty = [0, 1, 2].find((i) => !selectedSlots.includes(i))
      if (nextEmpty !== undefined) {
        onCardSelected(nextEmpty)
      }
    }
  }

  return (
    <div className="absolute inset-x-0 bottom-0 z-30 overflow-hidden rounded-tl-[24px] rounded-tr-[24px] overlay-slide-up"
      style={{ height: 730, backgroundColor: '#080808', boxShadow: '1px 0 0 rgba(255,255,255,0.17), -1px -1px 0 rgba(255,255,255,0.17)' }}
    >
      {/* Purple bg blob */}
      <div className="absolute" style={{ left: -76, top: -187, width: 509, height: 347 }}>
        <div className="absolute" style={{ inset: '-12.13% -8.27%' }}>
          <Image src={ASSETS.ellipse50} alt="" fill unoptimized className="object-contain" />
        </div>
      </div>

      {/* Header */}
      <div className="absolute left-[24px] top-[24px] right-[24px] flex items-start justify-between">
        <p
          className="font-roboto font-normal text-white text-[22px] m-0"
          style={{ letterSpacing: '-0.66px', fontVariationSettings: "'wdth' 100" }}
        >
          The deck is open. Trust the pull.
        </p>
        <button onClick={onClose} className="relative w-[32px] h-[32px] shrink-0 ml-[8px] mt-[2px]">
          <Image src={ASSETS.closeX} alt="close" fill unoptimized className="object-contain" />
        </button>
      </div>

      {/* Card slots */}
      <div
        className="absolute flex gap-[12px] justify-center"
        style={{
          left: '50%',
          transform: 'translateX(-50%)',
          top: 85,
          width: numSlots === 1 ? 198 : 370,
        }}
      >
        {Array.from({ length: numSlots }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-center rounded-[9px]"
            style={{
              width: numSlots === 1 ? 198 : 110,
              height: 297,
              backgroundColor: selectedSlots.includes(i) ? 'rgba(55,46,106,0.6)' : 'rgba(217,217,217,0.06)',
              border: '1.127px solid #282828',
            }}
          >
            {!selectedSlots.includes(i) && (
              <p
                className="font-roboto font-normal text-center text-[13.5px] m-0"
                style={{
                  color: 'rgba(255,255,255,0.2)',
                  letterSpacing: '-0.406px',
                  width: 80,
                  fontVariationSettings: "'wdth' 100",
                }}
              >
                Tap on a card to get reading
              </p>
            )}
            {selectedSlots.includes(i) && (
              <div className="flex flex-col items-center gap-2">
                <div className="relative w-[70px] h-[100px] rounded-[6px] overflow-hidden" style={{ backgroundColor: '#372e6a' }}>
                  <Image src={ASSETS.star2} alt="" fill unoptimized className="object-contain p-4" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Swipe hint */}
      <div
        className="absolute flex items-center gap-[3px]"
        style={{ bottom: 101, left: '50%', transform: 'translateX(-50%)' }}
      >
        <div className="relative w-[24px] h-[24px]">
          <Image src={ASSETS.swipeIcon} alt="" fill unoptimized className="object-contain" />
        </div>
        <p
          className="font-roboto font-normal text-white text-[14px] m-0 whitespace-nowrap"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Swipe left &amp; right to view the full deck
        </p>
      </div>

      {/* Card fan — scrollable */}
      <div
        ref={fanRef}
        className="absolute card-fan-container no-scrollbar"
        style={{ bottom: 0, left: 0, right: 0, height: 233, overflow: 'hidden' }}
      >
        <div
          className="absolute"
          style={{ bottom: 39, left: '50%', width: 600, height: 205 }}
        >
          {CARD_OFFSETS.map((offsetX, i) => (
            <div
              key={i}
              className="absolute flex items-center justify-center cursor-pointer"
              style={{
                left: '50%',
                marginLeft: offsetX - 42,
                bottom: 0,
                width: 84,
                height: 124,
                transform: `rotate(${CARD_ROTATIONS[i]}deg) scaleY(-1)`,
              }}
              onClick={() => handleCardClick(i)}
            >
              <div
                className="relative overflow-hidden"
                style={{
                  width: 83.7,
                  height: 124,
                  borderRadius: 2.9,
                  boxShadow: '3.1px 0 2.2px rgba(36,27,61,0.6)',
                }}
              >
                {/* Card glitter bg */}
                <div className="absolute inset-0">
                  <Image src={ASSETS.glitterBg} alt="" fill unoptimized className="object-cover" />
                </div>
                {/* Purple bg */}
                <div
                  className="absolute"
                  style={{ inset: '2px 3px', borderRadius: 1.4, backgroundColor: '#372e6a' }}
                />
                {/* Star */}
                <div
                  className="absolute flex items-center justify-center"
                  style={{ left: 22, top: 43, width: 40, height: 40 }}
                >
                  <div style={{ transform: 'rotate(180deg)', position: 'relative', width: 38, height: 38 }}>
                    <Image src={ASSETS.star2} alt="" fill unoptimized className="object-contain" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
