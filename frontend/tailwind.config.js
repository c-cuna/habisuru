/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'lato': ['Lato', 'sans-serif']
      },
      backgroundImage: {
        'banner': "url('../public/images/banner.jpg')",
      }
    },
  },
  plugins: [],
}

