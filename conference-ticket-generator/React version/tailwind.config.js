/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "neutral-0": "hsl(0, 0%, 100%)",
        "neutral-300": "hsl(252, 6%, 83%)",
        "neutral-500": "hsl(245, 15%, 58%)",
        "neutral-700": "hsl(245, 19%, 35%)",
        "neutral-900": "hsl(248, 70%, 10%)",
        "orange-500": "hsl(7, 88%, 67%)",
        "orange-700": "hsl(7, 71%, 60%)",
        "gradient-text-from": "hsl(7, 86%, 67%)",
        "gradient-text-to": "hsl(0, 0%, 100%)",
      },
      fontFamily: {
        Inconsolata: "Inconsolata",
      },
    },
  },
  plugins: [],
};
