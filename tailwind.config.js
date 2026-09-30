/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        accent: {
          50: "#eefcf7",
          500: "#14b88a",
          600: "#0d9f77",
          700: "#087d60",
        },
        surface: { light: "#f8fafc", dark: "#0f172a" },
      },
    },
  },
  plugins: [],
};
