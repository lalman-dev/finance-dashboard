/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        surface: {
          DEFAULT: "#ffffff",
          dark: "#111318",
        },
        page: {
          DEFAULT: "#f4f5f7",
          dark: "#0c0e13",
        },
        border: {
          DEFAULT: "rgba(0,0,0,0.08)",
          dark: "rgba(255,255,255,0.07)",
        },
      },
    },
  },
  plugins: [],
};
