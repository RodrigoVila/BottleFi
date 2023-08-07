/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        background: "background 4s ease infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        opacityRed: "rgba(205, 4, 4, 0.7)",
        opacityOrange: "rgba(249, 74, 41, 0.8)",
        opacityYellow: "rgba(252, 226, 42, 0.8)",
        darkGlass: "rgba(255, 255, 255, 0.2)",
        glass: "rgba(255, 255, 255, 0.5)",
        lightGlass: "rgba(255, 255, 255, 0.7)",
        lightOverlay: "rgba(0, 0, 0, 0.35)",
        overlay: "rgba(0, 0, 0, 0.5)",
        darkOverlay: "rgba(0, 0, 0, 0.7)",
      },
      fontFamily: {
        fondamento: ["Fondamento", "cursive"],
        montserrat: ["Montserrat", "sans-serif"],
        cormorant: ["Cormorant Garamond", "serif"],
        lato: ["Lato", "sans-serif"],
      },
      keyframes: {
        background: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
