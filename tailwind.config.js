/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensure all relevant files are included
  theme: {
    extend: {
      animation: {
        marquee: "marquee 15s linear infinite", // Define marquee animation
      },
      keyframes: {
        marquee: {
          "0%": { transform: 'translateX(100%)' }, // Start from right
          "100%": { transform: 'translateX(-100%)' }, // Move to left
        },
      },
    },
  },
  plugins: [],
};
