/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "500px",
        md: "768px",
        mds: "978px",
        lg: "1200px",
        xl: "1350px",
        "2xl": "1536px",
        custom: "1440px",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        title: ["Roboto", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        quaternary: "#213555",
        black: "#3E5879",
        gray: "#D8C4B6",
        white: "#F5EFE7",
      },
      backgroundColor: {
        quaternary: "#213555",
        black: "#3E5879",
        gray: "#D8C4B6",
        white: "#F5EFE7",
      },
    },
  },
  plugins: [],
};
