import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['var(--font-roboto)', 'sans-serif'],
        khand: ['var(--font-khand)', 'sans-serif'],
      },
      colors: {
        'veda-bg': '#0a0a12',
        'veda-header': '#101010',
        'veda-card': '#2e2065',
        'veda-card-alt': '#2f265e',
        'veda-chat-bg': '#1b1b1f',
        'veda-pill': '#292930',
        'veda-purple': '#4c48a9',
        'veda-tarot-bg': '#372e6a',
      },
      backdropBlur: {
        '5': '5px',
      },
    },
  },
  plugins: [],
}

export default config
