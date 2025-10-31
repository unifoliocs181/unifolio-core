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
        'unifolio-dark': '#0a0a0a',
        'unifolio-white': '#ffffff',
        'unifolio-gray': '#ededed',
        'unifolio-lightgray': '#f5f5f5',
        'unifolio-mediumgray': '#6b7280',
        'unifolio-border': '#e5e7eb',
      },
      fontFamily: {
        'unifolio-montserrat': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
