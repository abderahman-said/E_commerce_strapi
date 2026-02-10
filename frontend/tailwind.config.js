/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0f172a',
          light: '#1e293b',
        },
        secondary: '#ffffff',
        accent: {
          DEFAULT: '#c5a059',
          light: '#fdfaf3',
          dark: '#b08d45',
        },
        muted: '#64748b',
        border: '#e2e8f0',
      }
    },
  },
  plugins: [],
}
