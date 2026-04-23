'use client'

export default function Header() {
  return (
    <>
      {/* Main header bar */}
      <div
        className="absolute top-0 left-0 right-0 z-20"
        style={{
          height: '100.768px',
          backgroundColor: '#101010',
          borderBottom: '1.072px solid rgba(255,255,255,0.2)',
        }}
      >
        {/* Hamburger — left */}
        <button
          className="absolute flex flex-col justify-center gap-[5px]"
          style={{ left: 17, top: '50%', transform: 'translateY(-50%)', width: 24, height: 24 }}
          aria-label="Menu"
        >
          <span style={{ display: 'block', height: 2, backgroundColor: 'white', borderRadius: 1 }} />
          <span style={{ display: 'block', height: 2, backgroundColor: 'white', borderRadius: 1 }} />
          <span style={{ display: 'block', height: 2, backgroundColor: 'white', borderRadius: 1 }} />
        </button>

        {/* Logo — centered */}
        <div
          className="absolute flex items-baseline"
          style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <span
            className="font-khand font-medium text-white uppercase whitespace-nowrap"
            style={{ fontSize: '25.728px', letterSpacing: '1.029px' }}
          >
            ASTROLOGY
          </span>
          <span
            className="font-khand font-light text-white whitespace-nowrap"
            style={{ fontSize: '25.728px', letterSpacing: '0.64px' }}
          >
            .com
          </span>
        </div>
      </div>

    </>
  )
}
