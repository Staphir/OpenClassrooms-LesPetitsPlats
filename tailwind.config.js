/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'yellow'    : '#FFD15B',
        'black'     : '#1B1B1B',
        'grey'      : '#7A7A7A',
        'grey-light': '#C6C6C6',
      },
      fontFamily: {
        'body'  : ['Manrope', 'sans-serif'],
        'title' : ['Anton', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

