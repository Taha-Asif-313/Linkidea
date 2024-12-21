/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#089403",
      },
      fontFamily: {
        primary: ["Noto Sans", "sans-serif"],
      },
      backgroundImage: {
        "gradient-purple-blue": "linear-gradient(135deg, #7e3ff2, #3b82f6)",
        "gradient-green-black": "linear-gradient(135deg, #008202 30%, #0a0a0a)", // Purple to blue gradient
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
