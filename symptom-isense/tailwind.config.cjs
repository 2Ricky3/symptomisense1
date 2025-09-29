/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
};
