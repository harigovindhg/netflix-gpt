/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'radialglow': 'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y),rgba(255, 255, 255, 0.06),transparent 40%)',
        'radialglowAfter': 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y),rgba(255, 255, 255, 0.4),transparent 40%)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '100' },
        }
      },
      animation: {
        fadeInSmooth: 'fadeIn 250ms ease-in-out normal',
      }
    },
  },
  plugins: [],
}

