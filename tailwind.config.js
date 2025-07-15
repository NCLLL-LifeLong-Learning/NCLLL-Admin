/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "app/**/*.{vue,js,ts,jsx,tsx}",
    "components/**/*.{vue,js,ts,jsx,tsx}",
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        noto_sans_khmer: ["Noto Sans Khmer", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
