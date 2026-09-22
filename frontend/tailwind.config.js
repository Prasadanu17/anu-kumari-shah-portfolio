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
          300: '#0a0e0c',
          400: '#070908',
        },
        titanium: {
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(30, 111, 92, 0.35)',
          muted: '#8E9793',
          faint: '#4E5753',
        },
        neural: {
          emerald: '#1e6f5c',
          teal: '#28967d',
          sage: '#6bb2a0',
          amber: '#e9a84e',
        },
        // Semantic tokens
        bgWarm: '#070908',
        bgWarmSec: '#0d1310',
        cardWarm: '#111815',
        textCharcoal: '#F4F5F4',
        textMutedWarm: '#8E9793',
        borderWarm: 'rgba(255, 255, 255, 0.08)',
        accentSlate: '#1e6f5c',
        accentSubtle: '#8E9793',
        bgDark: '#070908',
        bgDarkSec: '#0d1310',
        textLight: '#F4F5F4',
        textMuted: '#8E9793',
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