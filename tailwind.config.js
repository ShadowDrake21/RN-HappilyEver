/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        'poppins-thin': ['Poppins-Thin'],
        'poppins-light': ['Poppins-Light'],
        'poppins-regular': ['Poppins-Regular'],
        'poppins-medium': ['Poppins-Medium'],
        'poppins-semibold': ['Poppins-SemiBold'],
        'poppins-bold': ['Poppins-Bold'],
        'playfairdisplay-regular': ['PlayfairDisplay-Regular'],
        'playfairdisplay-italic': ['PlayfairDisplay-Italic'],
        'playfairdisplay-mediumitalic': ['PlayfairDisplay-MediumItalic'],
        'playfairdisplay-semibold': ['PlayfairDisplay-SemiBold'],
        'playfairdisplay-semibolditalic': ['PlayfairDisplay-SemiBoldItalic'],
      },
    },
  },
  plugins: [],
};
