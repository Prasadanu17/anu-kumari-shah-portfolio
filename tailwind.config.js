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
        bgWarm: '#E6E2DD',
        bgWarmSec: '#ECE8E3',
        cardWarm: '#FAF8F5',
        textCharcoal: '#2A2825',
        textMutedWarm: '#66625C',
        borderWarm: '#D3CEC7',
        accentSlate: '#2A2825',
        accentSubtle: '#4A4641',
        bgDark: '#E6E2DD',
        bgDarkSec: '#ECE8E3',
        textLight: '#2A2825',
        textMuted: '#66625C',
        accentEmerald: '#2A2825',
        emeraldHighlight: '#2A2825',
        primary: {
          50: '#faf8f5',
          100: '#f4f1ea',
          200: '#eae6e1',
          300: '#dfebd5',
          400: '#d0cbc4',
          500: '#2a2825',
          600: '#1f1e1b',
          700: '#171614',
          800: '#100f0e',
          900: '#080807',
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