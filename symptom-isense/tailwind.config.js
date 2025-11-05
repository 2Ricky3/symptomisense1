/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        primary: '#152026',
        bg: '#FFFFFF',
        accent: '#455059',
        muted: '#5C6A73',
        dark: '#293540',
        secondary: '#4A5568',
      },
    },
  },
  plugins: [],
}