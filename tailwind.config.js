module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
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
  safelist: [
    'lg:bg-red-300',
    'lg:bg-yellow-300',
    'lg:bg-green-300',
    'lg:bg-blue-300',
    'lg:bg-purple-300',

    'bg-red-300',
    'bg-yellow-300',
    'bg-green-300',
    'bg-blue-300',
    'bg-purple-300',

    'hover:bg-red-300',
    'hover:bg-yellow-300',
    'hover:bg-green-300',
    'hover:bg-blue-300',
    'hover:bg-purple-300',

    'focus:border-red-300',
    'focus:border-yellow-300',
    'focus:border-green-300',
    'focus:border-blue-300',
    'focus:border-purple-300',

    'border-red-300',
    'border-yellow-300',
    'border-green-300',
    'border-blue-300',
    'border-purple-300',

    'border-red-50',
    'border-yellow-50',
    'border-green-50',
    'border-blue-50',
    'border-purple-50',

    'bg-red-100',
    'bg-yellow-100',
    'bg-green-100',
    'bg-blue-100',
    'bg-purple-100',

    'hover:bg-red-100',
    'hover:bg-yellow-100',
    'hover:bg-green-100',
    'hover:bg-blue-100',
    'hover:bg-purple-100',

    'bg-red-200',
    'bg-yellow-200',
    'bg-green-200',
    'bg-blue-200',
    'bg-purple-200',

    'bg-red-400',
    'bg-yellow-400',
    'bg-green-400',
    'bg-blue-400',
    'bg-purple-400',

    'hover:bg-red-400',
    'hover:bg-yellow-400',
    'hover:bg-green-400',
    'hover:bg-blue-400',
    'hover:bg-purple-400',

    'lg:bg-red-400',
    'lg:bg-yellow-400',
    'lg:bg-green-400',
    'lg:bg-blue-400',
    'lg:bg-purple-400',

    'bg-red-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-purple-500',

    'bg-red-400',
    'bg-yellow-400',
    'bg-green-400',
    'bg-blue-400',
    'bg-purple-400',

    'focus:bg-red-400',
    'focus:bg-yellow-400',
    'focus:bg-green-400',
    'focus:bg-blue-400',
    'focus:bg-purple-400',

    'border-red-500',
    'border-yellow-500',
    'border-green-500',
    'border-blue-500',
    'border-purple-500',

    'hover:border-r-red-600',
    'hover:border-r-yellow-600',
    'hover:border-r-green-600',
    'hover:border-r-blue-600',
    'hover:border-r-purple-600',

    'focus:border-r-red-600',
    'focus:border-r-yellow-600',
    'focus:border-r-green-600',
    'focus:border-r-blue-600',
    'focus:border-r-purple-600',
  ],
}

// import { red, yellow, green, blue, purple } from 'tailwindcss/colors'

// const classNames = []
// const shades = [red, yellow, green, blue, purple]
// const variants = ['bg', 'border', 'ring']
// const sizes = ['', 'lg']
// const states = ['', 'hover']

// shades.map((color) => {
//   for (const variant of variants) {
//     for (const shadeKey in color) {
//       const className = `${variant}-${
//         variant === 'ring' ? 'opacity-' : ''
//       }red-${shadeKey}`
//       classNames.push(className)

//       for (const size of sizes) {
//         const sizeClassName = `${size}${size ? ':' : ''}${variant}-${
//           variant === 'ring' ? 'opacity-' : ''
//         }red-${shadeKey}`
//         classNames.push(sizeClassName)
//       }

//       for (const state of states) {
//         const stateClassName = `${state}${state ? ':' : ''}${variant}-${
//           variant === 'ring' ? 'opacity-' : ''
//         }red-${shadeKey}`
//         classNames.push(stateClassName)

//         for (const size of sizes) {
//           const stateSizeClassName = `${state}${state ? ':' : ''}${size}${
//             size ? ':' : ''
//           }${variant}-${variant === 'ring' ? 'opacity-' : ''}red-${shadeKey}`
//           classNames.push(stateSizeClassName)
//         }
//       }
//     }
//   }
// })

// console.log({ shades, classNames })
