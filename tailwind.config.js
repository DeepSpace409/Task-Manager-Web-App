/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",  // For Next.js
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",      // For Next.js 13+ app directory
    "./src/**/*.{js,ts,jsx,tsx}",      // For other React projects
    "./styles/**/*.{css,scss}", // For global styles
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}