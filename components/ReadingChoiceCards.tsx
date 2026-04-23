'use client'
import Image from 'next/image'
import { ASSETS } from '@/lib/assets'

interface ReadingChoiceCardsProps {
  onYesNo: () => void
  onThreeCard: () => void
}

export default function ReadingChoiceCards({ onYesNo, onThreeCard }: ReadingChoiceCardsProps) {
  return (
    <div className="flex flex-col gap-[12px] w-full msg-in">
      {/* Yes/No Tarot */}
      <button
        onClick={onYesNo}
        className="hover:opacity-90 active:opacity-80 transition-opacity"
        style={{ padding: 0, border: 'none', display: 'block', width: '100%', cursor: 'pointer', borderRadius: 12, overflow: 'hidden' }}
      >
        <img src="/yes-no-widget.png" alt="Yes/No Tarot" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 12 }} />
      </button>

      {/* 3-card spread */}
      <button
        onClick={onThreeCard}
        className="hover:opacity-90 active:opacity-80 transition-opacity"
        style={{ padding: 0, border: 'none', display: 'block', width: '100%', cursor: 'pointer', borderRadius: 12, overflow: 'hidden' }}
      >
        <img src="/three-card-widget.png" alt="3-card spread" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 12 }} />
      </button>
    </div>
  )
}
