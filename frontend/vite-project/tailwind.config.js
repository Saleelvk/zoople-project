/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif','inter',"Protest Guerrilla"],
        Orbitron:[ "Orbitron", "sans-serif"],
        inter:["Inter"," system-ui"]
      },
    },
  },
  plugins: [],
}