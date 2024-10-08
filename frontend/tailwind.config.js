/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], 
  theme: {
    extend: {
      screens: {
				xs: "480px",
				ss: "620px",
				sm: "850px",
				md: "1060px",
				lg: "1200px",
				xl: "1700px",
			},
      backgroundImage: {
				"background-image": "url('/src/assets/bg_img.jpeg')",
			},
    },
  },
  plugins: [],
}