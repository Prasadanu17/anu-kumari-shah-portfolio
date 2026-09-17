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
        // Modern AI/ML Obsidian & Titanium Palette
        obsidian: {
          DEFAULT: '#07080B',
          50: '#181A22',
          100: '#13151D',
          200: '#0E1017',
          300: '#0B0C11',
          400: '#07080B',
        },
        titanium: {
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(255, 255, 255, 0.18)',
          muted: '#8E95A5',
          faint: '#4E5463',
        },
        neural: {
          sky: '#38BDF8',
          emerald: '#10B981',
          violet: '#818CF8',
          amber: '#F59E0B',
        },
        // Backward-compatible semantic tokens
        bgWarm: '#07080B',
        bgWarmSec: '#0E1017',
        cardWarm: '#12151E',
        textCharcoal: '#F4F4F7',
        textMutedWarm: '#949BA8',
        borderWarm: 'rgba(255, 255, 255, 0.08)',
        accentSlate: '#38BDF8',
        accentSubtle: '#8E95A5',
        bgDark: '#07080B',
        bgDarkSec: '#0E1017',
        textLight: '#F4F4F7',
        textMuted: '#949BA8',
        accentEmerald: '#10B981',
        emeraldHighlight: '#34D399',
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#38BDF8',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
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