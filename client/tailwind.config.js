/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#009dff",
      },
      fontFamily: {
        primary: ["Noto Sans", "sans-serif"],
      },
      backgroundImage: {
        "gradient-custom": "linear-gradient(90deg, rgba(0,157,255,1) 0%, #00519a 100%)", // Purple to blue gradient
      },
      keyframes: {
        pop: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.4)" },
        },
      },
      animation: {
        pop: "pop 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
