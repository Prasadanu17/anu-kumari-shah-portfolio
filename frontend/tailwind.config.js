/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // High-End Emerald & Obsidian AI/ML Palette
        emeraldBrand: {
          DEFAULT: '#1e6f5c',
          50: '#f2f9f7',
          100: '#d7efe8',
          200: '#b0dfd4',
          300: '#7ec6b6',
          400: '#4da694',
          500: '#1e6f5c',
          600: '#165748',
          700: '#13473c',
          800: '#113b32',
          900: '#0f312a',
        },
        obsidian: {
          DEFAULT: '#070908',
          50: '#161d19',
          100: '#111815',
          200: '#0d1310',
        },
        // Sophisticated Charcoal & Warm Cream Editorial Palette
        charcoal: {
          DEFAULT: '#171717',
          50: '#262626',
          100: '#1f1f1f',
          200: '#1c1c1c',
          300: '#171717',
        },
        cream: '#EAD9B8',        // Primary headings
        ivory: '#F5EBDD',        // Body text & primary content
        beige: '#C8B99F',        // Secondary text, dates, metadata
        borderMuted: '#8E8170',  // Subtle borders & dividers
        titanium: {
          border: 'rgba(142, 129, 112, 0.2)',
          borderHover: 'rgba(234, 217, 184, 0.4)',
          muted: '#C8B99F',
          faint: '#8E8170',
        },
        neural: {
          emerald: '#1e6f5c',
          teal: '#28967d',
          sage: '#6bb2a0',
          amber: '#e9a84e',
        },
        // Semantic tokens
        bgWarm: '#171717',
        bgWarmSec: '#1c1c1c',
        cardWarm: '#1f1f1f',
        textCharcoal: '#EAD9B8',
        textMutedWarm: '#C8B99F',
        borderWarm: 'rgba(142, 129, 112, 0.25)',
        accentSlate: '#8E8170',
        accentSubtle: '#C8B99F',
        bgDark: '#171717',
        bgDarkSec: '#1c1c1c',
        textLight: '#EAD9B8',
        textMuted: '#C8B99F',
        accentEmerald: '#1e6f5c',
        emeraldHighlight: '#28967d',
        primary: {
          50: '#f2f9f7',
          100: '#d7efe8',
          200: '#b0dfd4',
          300: '#7ec6b6',
          400: '#4da694',
          500: '#1e6f5c',
          600: '#165748',
          700: '#13473c',
          800: '#113b32',
          900: '#0f312a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    }
  },
  plugins: [],
}