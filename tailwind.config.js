/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./application/templates/**/*.html',],
  theme: {
    extend: {
      spacing: {
        '192': '48rem',
        '224': '56rem',
        '256':'64rem',
        '288': '72rem',
      },
    },
  },
  plugins: [],
}
