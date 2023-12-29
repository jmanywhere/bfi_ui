import type { Config } from 'tailwindcss'
const defaultTheme = require('tailwindcss/defaultTheme')

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens:{
      'xs': '475px',
      ...defaultTheme.screens,
    },
    extend: {
      colors:{
        "soft-blue": "#5296A5",
        "off-white": "#E7E6F7",
      },
      fontFamily:{
        poppins: ["var(--font-poppins)"],
        anton : ["var(--font-anton)"],
        "roboto-condensed": ["var(--font-roboto-condensed)"],
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    base: false,
    themes:[
      {
        bfiTheme:{
          primary: "#FF9C59",
          secondary: "#FFB700",
          accent: "#C1FF9B",
          "base-100": "#F7F7F8",

        }
      }
    ]
  }
}
export default config
