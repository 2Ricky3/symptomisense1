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
      primary: "var(--color-primary)",
      bg: "var(--color-bg)",
      accent: "var(--color-accent)",
      muted: "var(--color-muted)",
      dark: "var(--color-dark)",
      secondary: "var(--color-secondary)",
    },
  },
},

  plugins: [require("daisyui")],
}