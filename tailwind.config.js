/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {

    container: {
      center: true,
      padding: {
        DEFAULT: "12px",
      },
    },
    extend: {
      colors: {
        blackColor: "#222222",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      borderRadius: {
        defaultRadius: "16px",
      },
    },
  },
  
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '632px',
          margin: '0 auto',
        }
      })
    }
  ]
};
