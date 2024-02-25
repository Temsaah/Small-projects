/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"],
  theme: {
    extend: {
      gridTemplateRows: {
        "40-60": "40% 1fr",
      },
      colors: {
        "primary-vd-grayishblue": "hsl(217, 19%, 35%)",
        "primary-desat-darkblue": "hsl(214, 17%, 51%)",
        "primary-grayish-blue": "hsl(212, 23%, 69%)",
        "primary-l-grayishblue": "hsl(210, 46%, 95%)",
      },
      fontFamily: {
        monrope: "Manrope",
      },
    },
  },
  plugins: [require("tailwind-fontawesome")],
};
