/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#152B2E',
        teal: {
          DEFAULT: '#0F6E6E',
          50: '#EAF6F5',
          100: '#D9F2EC',
          400: '#2C9090',
          500: '#0F6E6E',
          600: '#0C5B5B',
          700: '#0A4747',
          900: '#0A3333',
        },
        navy: {
          DEFAULT: '#133C55',
          700: '#0D2C3F',
        },
        amber: {
          DEFAULT: '#E8A33D',
          soft: '#FBEBD2',
        },
        sand: '#F7FAF9',
      },
      fontFamily: {
        display: ['"Newsreader"', 'serif'],
        sans: ['"IBM Plex Sans Arabic"', '"IBM Plex Sans"', 'sans-serif'],
      },
      borderRadius: {
        clinic: '1.25rem',
      },
      boxShadow: {
        soft: '0 8px 30px -12px rgba(19, 60, 85, 0.18)',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        rise: 'rise 0.6s ease-out both',
      },
    },
  },
  plugins: [],
}
