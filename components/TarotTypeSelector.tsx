'use client'
import { ASSETS } from '@/lib/assets'

interface TarotTypeSelectorProps {
  onYesNo: () => void
  onThreeCard: () => void
}

function CardBack({ rotate, right, zIndex = 1 }: { rotate: number; right: number; zIndex?: number }) {
  return (
    <div style={{
      position: 'absolute',
      right,
      top: '50%',
      transform: `translateY(-50%) rotate(${rotate}deg)`,
      width: 60,
      height: 90,
      borderRadius: 4,
      overflow: 'hidden',
      zIndex,
      boxShadow: '2px 4px 8px rgba(0,0,0,0.35)',
    }}>
      <img
        src={ASSETS.backOfCard18}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  )
}

export default function TarotTypeSelector({ onYesNo, onThreeCard }: TarotTypeSelectorProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>

      {/* Yes/No Tarot card */}
      <button
        onClick={onYesNo}
        style={{ padding: 0, border: 'none', display: 'block', width: '100%', cursor: 'pointer', borderRadius: 12, overflow: 'hidden' }}
      >
        <img src="/yes-no-widget.png" alt="Yes/No Tarot" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 12 }} />
      </button>

      {/* 3-card spread card */}
      <button
        onClick={onThreeCard}
        style={{ padding: 0, border: 'none', display: 'block', width: '100%', cursor: 'pointer', borderRadius: 12, overflow: 'hidden' }}
      >
        <img src="/three-card-widget.png" alt="3-card spread" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 12 }} />
      </button>

    </div>
  )
}
