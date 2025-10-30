/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'burgundy': {
          DEFAULT: '#8B1538',
          primary: '#8B1538',
        },
        'orange': {
          DEFAULT: '#F68D2E',
          accent: '#F68D2E',
        },
        'deep-red': '#A41E34',
        'dark-gray': '#2C2C2C',
        'light-gray': '#F5F5F5',
      },
      fontFamily: {
        'heading': ['"Bebas Neue"', 'cursive'],
        'body': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'brand': '8px',
      },
    },
  },
  plugins: [],
}
