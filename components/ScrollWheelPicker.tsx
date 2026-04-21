'use client'
import { useEffect, useMemo, useRef } from 'react'

type Column = {
  values: string[]
  selected: number
  onChange: (index: number) => void
}

export default function ScrollWheelPicker({
  columns,
  className,
}: {
  columns: Column[]
  className?: string
}) {
  const ITEM_H = 44
  const VISIBLE = 5
  const PICKER_H = ITEM_H * VISIBLE
  const PAD = (PICKER_H - ITEM_H) / 2

  const refs = useRef<(HTMLDivElement | null)[]>([])
  const scrollEndTimers = useRef<(number | null)[]>([])

  const colIds = useMemo(() => columns.map((_, i) => `swp-col-${i}`), [columns])

  useEffect(() => {
    // keep scroll positions in sync with controlled selected indices
    columns.forEach((col, i) => {
      const el = refs.current[i]
      if (!el) return
      const top = Math.max(0, Math.min(col.values.length - 1, col.selected)) * ITEM_H
      if (Math.abs(el.scrollTop - top) > 1) el.scrollTop = top
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colIds.join('|'), ...columns.map((c) => c.selected)])

  useEffect(() => {
    return () => {
      scrollEndTimers.current.forEach((t) => {
        if (t) window.clearTimeout(t)
      })
    }
  }, [])

  function handleScroll(colIndex: number) {
    const el = refs.current[colIndex]
    const col = columns[colIndex]
    if (!el || !col) return

    const idx = Math.max(0, Math.min(col.values.length - 1, Math.round(el.scrollTop / ITEM_H)))
    if (idx !== col.selected) col.onChange(idx)

    const existing = scrollEndTimers.current[colIndex]
    if (existing) window.clearTimeout(existing)
    scrollEndTimers.current[colIndex] = window.setTimeout(() => {
      el.scrollTo({ top: idx * ITEM_H, behavior: 'smooth' })
    }, 80)
  }

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        height: PICKER_H,
        display: 'flex',
        gap: 18,
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1b1b1f',
        color: '#fff',
        overflow: 'hidden',
      }}
    >
      {/* divider lines */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: `calc(50% - ${ITEM_H / 2}px)`,
          height: 1,
          background: 'rgba(255,255,255,0.2)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: `calc(50% + ${ITEM_H / 2}px)`,
          height: 1,
          background: 'rgba(255,255,255,0.2)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {columns.map((col, colIndex) => (
        <div
          key={colIndex}
          ref={(el) => {
            refs.current[colIndex] = el
          }}
          onScroll={() => handleScroll(colIndex)}
          className="no-scrollbar"
          style={{
            height: PICKER_H,
            overflowY: 'scroll',
            scrollSnapType: 'y mandatory',
            scrollSnapStop: 'always',
            paddingTop: PAD,
            paddingBottom: PAD,
            overscrollBehavior: 'contain',
            flexShrink: 0,
            minWidth: colIndex === 2 ? 64 : 72,
          }}
        >
          {col.values.map((v, i) => {
            const isSelected = i === col.selected
            return (
              <div
                key={`${v}-${i}`}
                style={{
                  height: ITEM_H,
                  scrollSnapAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  userSelect: 'none',
                  opacity: isSelected ? 1 : 0.3,
                  fontSize: isSelected ? 16 : 14,
                  fontWeight: isSelected ? 500 : 400,
                  transition: 'opacity 120ms, font-size 120ms, font-weight 120ms',
                }}
              >
                {v}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

