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
        'glowBGGradient': '-webkit-radial-gradient(top, circle cover, #3c3b52 0%, #252233 80%)'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '100' },
        },
        rippleSpin: {
          '0%': {
            top: '29px',
            left: '29px',
            width: 0,
            height: 0,
            opacity: 1
          },
          '100%': {
            top: '-1px',
            left: '-1px',
            width: '58px',
            height: '58px',
            opacity: 0
          }
        },
        scale: {
          '50%': {
            scale: 'var(--scale-x, 1) var(--scale-y, 1)'
          }
        }
      },
      animation: {
        fadeInSmooth: 'fadeIn 250ms ease-in-out normal',
        rippleSpinner: 'rippleSpin 1s cubic-bezier(0, 0.2, 0.8, 1) infinite'

      }
    },
  },
  plugins: [],
}

