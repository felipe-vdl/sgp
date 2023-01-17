/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: { ...colors,
      'mesquita': '#342a54',
      'dourado': {
        50: '#ede1cf',
        100: '#d7c49b',
        500: '#bfa15f',
        900: ' #A88843'
      }
    }
  },
  plugins: [],
}