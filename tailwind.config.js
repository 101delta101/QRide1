/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        '4xl': '2rem', // You can adjust the value as needed
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem', // Another custom value
      },
    },
  },
  plugins: [],
}

