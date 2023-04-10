/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./application/templates/**/*.html',],
  theme: {
    extend: {
      colors:{
        'DarkBlue': '#02060f',
      },
      transitionDelay: {
        '0': '0ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
        '1200': '1200ms',

      },
      spacing: {
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '192': '48rem',
        '224': '56rem',
        '256':'64rem',
        '288': '72rem',
        '448': '112rem',
      },
    },
  },
  plugins: [],
}
