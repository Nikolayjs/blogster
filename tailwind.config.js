/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      gridTemplateRows: {
        layout: 'auto 1fr auto',
      },
      fontFamily: {
        main: ['Rubik'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
