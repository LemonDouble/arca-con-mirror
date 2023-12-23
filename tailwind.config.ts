import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'lemon-yellow': '#FDD940',
      'black': {
        1: '#111827',
        2: '#374151',
        3: '#9CA3AF',
      },
      'white': {
        1: '#F8FAFC',
        2: '#E2E8F0',
        3: '#CBD5E1',
      },
      'success' : '#5BC55F',
      'error' : '#E83D3A',
      'warning' :'#FC9C44'
    }
  },
  plugins: [],
}
export default config
