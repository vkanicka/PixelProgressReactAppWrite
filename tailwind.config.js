/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "my-blue": "#a0dde3",
        "my-lilac-400": "#DDADFF",
        "my-lilac-600": "#C370FF",
        "my-lime-300": "#caff8a",
        "lightgray": "#d3d3d3",
        "my-cyan": "#00FFFF",
        "lightblue": "#ADD8E6"
      },
    },
  },
  plugins: [],
}