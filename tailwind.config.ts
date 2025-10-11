// /tailwind.config.ts
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
      fontFamily: {
        sans: ['Inter', 'Manrope', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },

      // Radii + shadow tokens
      borderRadius: {
        card: '20px',
        pill: '999px',
      },
      boxShadow: {
        soft: '0 8px 24px rgba(15, 23, 42, 0.06)', // matches brief
      },

      // Brand palette & accents
      colors: {
        // Core surfaces & text
        surface: '#F9FAF8', // Ivory Mist
        text: {
          primary: '#0F172A',   // Charcoal
          secondary: '#475569', // Slate
        },

        // Brand emerald scale
        brand: {
          50:  '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#0EA47A', // Primary
          700: '#0C8D69', // Gradient start
          800: '#065F46',
          900: '#064E3B',
        },

        // Gradient endpoints
        gradient: {
          start: '#0C8D69', // Emerald 700
          end:   '#19B6AE', // Teal 500
        },

        // Accents
        sage: {
          50:  '#F2F7F4',
          100: '#E7EFEA',
          200: '#D7E5DC',
          300: '#C9DBCF',
          400: '#B7D0C0',
          500: '#9DB7A7',
          600: '#86A190',
        },
        gold: {
          mist: '#E9E2CF',
        },

        // Lavender / purple accent (per your request)
        lavender: {
          400: '#C7B9FF',
          500: '#B8A8FF',
          600: '#A28DFF',
        },
      },

      // Reusable backgrounds
      backgroundImage: {
        'hero-radial':
          'radial-gradient(60% 50% at 50% 0%, rgba(249,250,248,0.95) 0%, rgba(249,250,248,0.6) 35%, rgba(249,250,248,0) 100%)',
        'brand-gradient':    'linear-gradient(90deg, #0C8D69 0%, #19B6AE 100%)',
        'lavender-gradient': 'linear-gradient(90deg, #B8A8FF 0%, #A28DFF 100%)',
      },

      // Calm micro-motions
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
