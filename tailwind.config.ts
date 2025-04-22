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
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
        pixel: ['var(--font-press-start-2p)']
      },
      colors: {
        'brand-green': '#AEF359', // Added brand green color from logo
        
        // Theme Alpha (Pixel Punch)
        'alpha-primary': '#FF5733', // Example: Bright Orange
        'alpha-secondary': '#33FF57', // Example: Bright Green
        'alpha-accent': '#3357FF', // Example: Bright Blue
        'alpha-bg': '#F0F0F0',    // Example: Light Gray BG
        'alpha-text': '#222222',    // Example: Dark Text
        
        // Theme Beta (Mystic Mesh)
        'beta-primary': '#8E44AD', // Example: Purple
        'beta-secondary': '#7F8C8D', // Example: Gray
        'beta-accent': '#F1C40F', // Example: Yellow
        'beta-bg': '#34495E',    // Example: Dark Blue BG
        'beta-text': '#ECF0F1',    // Example: Light Text

        // Theme Gamma (Neon Vector)
        'gamma-primary': '#00FFFF', // Example: Cyan
        'gamma-secondary': '#FF00FF', // Example: Magenta
        'gamma-accent': '#39FF14', // Example: Neon Green
        'gamma-bg': '#1A1A1A',    // Example: Very Dark Gray BG
        'gamma-text': '#FFFFFF',    // Example: White Text
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        pulseArrows: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        bounceLeftArrow: {
          '0%, 100%': { transform: 'translateX(-4px)' },
          '50%': { transform: 'translateX(0)' },
        },
        bounceRightArrow: {
          '0%, 100%': { transform: 'translateX(4px)' },
          '50%': { transform: 'translateX(0)' },
        }
      },
      animation: {
        'pulse-arrows': 'pulseArrows 1.5s ease-in-out infinite',
        'bounce-left-arrow': 'bounceLeftArrow 1s ease-in-out infinite',
        'bounce-right-arrow': 'bounceRightArrow 1s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
export default config 