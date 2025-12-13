/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', "ui-serif", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#0B0B0C",
        paper: "#FAF7F2",
        sand: "#E8E1D6",
        stone: "#B8B1A6",
        brand: {
          DEFAULT: "#9A6B3B", // warm brown/gold accent
          dark: "#6F4B27",
        },
      },
      boxShadow: {
        soft: "0 12px 30px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
