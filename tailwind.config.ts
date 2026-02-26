import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* MGE-PMS matched palette */
        'primary-green': '#15803d',  /* PMS primary-700 — deep forest green */
        'accent-yellow': '#d4e42d',  /* Bright yellow — high contrast against deep greens */
      },
    },
  },
  plugins: [],
}
export default config
