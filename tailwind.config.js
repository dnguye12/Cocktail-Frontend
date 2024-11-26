/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", 'sans-serif'],
        boba: ["Bona Nova", "serif"]
      },
      colors: {
        "my-bg": "#00142D",
        "my-border": "#643337",
        "my-orange": "#ED722F",
        "my-dark-blue": "#00142D",
        "my-blue": "#023e8a",
        "my-pink": "#f43f5e"
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["dracula"]
  }
};
