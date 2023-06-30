module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '9/10': '90%',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        fb: {
          50: '#f4f5fb',
          100: '#e7ebf7',
          200: '#cad4ed',
          300: '#9cb1dd',
          400: '#6687ca',
          500: '#4267b2',
          600: '#325197',
          700: '#29417b',
          800: '#253867',
          900: '#243256',
          950: '#182039',
        },
      },
      keyframes: {
        'slide-right': {
          '0%': { opacity: 0, transform: 'translate3d(100%, 0, 0)' },
        },
        'slide-top': {
          '0%': { opacity: 0, transform: 'translate3d(0, -100%, 0)' },
        },
      },
      animation: {
        'slide-right': 'slide-right 1s',
        'slide-top': 'slide-top 0.5s',
      },
    },
  },
  variant: {
    extend: {
      display: ['group-hover'],
      opacity: ['group-hover'],
      scale: ['group-hover'],
    },
  },
  plugins: [],
}
