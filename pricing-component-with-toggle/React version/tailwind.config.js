/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: "Montserrat",
      },
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(to bottom right, hsl(236, 72%, 79%), hsl(237, 63%, 64%))",
        "bg-top": "url('./images/bg-top.svg')",
        "bg-bottom": "url('./images/bg-bottom.svg')",
      },
      backgroundPosition: {
        "top-right": "top -35px left 200px",
      },
      colors: {
        "primary-very-light-grayish-blue": "hsl(240, 78%, 98%)",
        "primary-light-grayish-blue": "hsl(234, 14%, 74%)",
        "primary-grayish-blue": "hsl(233, 13%, 49%)",
        "primary-dark-grayish-blue": "hsl(232, 13%, 33%)",
        "primary-light-blue": "hsl(237, 63%, 64%)",
      },
    },
  },
  plugins: [],
};
