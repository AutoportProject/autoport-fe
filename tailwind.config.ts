import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'archivo-black': ['var(--font-archivo-black)'],
      },
    },
  },
  plugins: [],
}

export default config