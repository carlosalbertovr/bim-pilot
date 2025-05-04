/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // ajusta si usas App Router
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // si usas el nuevo App Router de Next.js
  ],
  darkMode: "class", // importante: usamos la clase "dark" en <html>
  theme: {
    extend: {},
  },
  plugins: [],
};
