/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'tablet': '480px',
        'laptop': '1024px',
        'desktop': '1280px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, hsl(214, 47%, 23%), hsl(237, 49%, 15%))',
      },
      fontFamily: {
        'Barlow': ['Barlow', 'sans-serif'],
        'Barlow-Condensed': ['Barlow Condensed', 'sans-serif'],
        'Barlow-Semi-Condensed': ['Barlow Semi Condensed', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

