/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  safelist: [
    'bg-ingredient',
    'bg-appliance',
    'bg-ustensil',
    'hover:bg-ingredient',
    'hover:bg-appliance',
    'hover:bg-ustensil',
  ],
  theme: {
    extend: {
      colors: {
        'yellow'    : '#FFD15B',
        'black'     : '#1B1B1B',
        'grey'      : '#7A7A7A',
        'grey-light': '#C6C6C6',
        'ingredient': '#FFD15B',
        'appliance' : '#FBFF50',
        'ustensil'  : '#FF8C5B',
      },
      fontFamily: {
        'body'  : ['Manrope', 'sans-serif'],
        'title' : ['Anton', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

