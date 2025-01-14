/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Add this line
  ],
  darkMode: 'class', //Enables dark mode with a class
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
