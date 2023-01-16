/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
    colors: { ...colors,
      'mesquita': '#342a54',
      'dourado': {
        50: '#fcfaf7',
        100: '#dac9a3 ',
        500: '#bfa15f',
        900: ' #A88843'
      }
    }
  },
  plugins: [],
}