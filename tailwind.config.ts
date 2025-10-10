import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,md,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './data/**/*.{json,md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // used across the site
        surface: '#f8fafc', // light page bg
        brand: {
          50:  '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',   // used a lot
          600: '#059669',   // used a lot
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        lavender: {
          400: '#c7b9ff',
          500: '#b8a8ff',
          600: '#a28dff',
        },
        mint: {
          500: '#93BEA4',
        },
      },
      boxShadow: {
        soft: '0 8px 24px rgba(16, 24, 40, 0.06)',
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(60% 50% at 50% 0%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 35%, rgba(255,255,255,0) 100%)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        drift1: {
          '0%,100%': { transform: 'translate(0,0)' },
          '50%': { transform: 'translate(6px,-4px)' },
        },
        drift2: {
          '0%,100%': { transform: 'translate(0,0)' },
          '50%': { transform: 'translate(-8px,6px)' },
        },
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 14s ease-in-out infinite',
        'drift-1': 'drift1 12s ease-in-out infinite',
        'drift-2': 'drift2 10s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
