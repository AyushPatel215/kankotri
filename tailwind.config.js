/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm skin / nude base
        sand: { DEFAULT: '#F4E6D8', 200: '#EAD5C1', 100: '#FBF3EA' },
        // Cocoa — main text
        cocoa: '#4B2E22',
        // Darkest cocoa — button text, music button
        night: '#3A2318',
        // Antique gold — ornament; bronze for readable gold text on light
        gold: { DEFAULT: '#D4AF6A', 600: '#A8833F', 200: '#F1DDA6', 100: '#FAF0D2' },
        bronze: '#8A5A2B',
        // Rose — hearts, script names
        blush: { DEFAULT: '#E9B8B3', 600: '#B06A68' },
      },
      fontFamily: {
        gu: ['Rasa', '"Noto Serif Gujarati"', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Pinyon Script"', 'cursive'],
      },
    },
  },
  plugins: [],
};
