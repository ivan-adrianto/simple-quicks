/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        ["grey-1"]: "#4F4F4F",
        ["grey-2"]: "#828282",
        ["grey-3"]: "#C4C4C4",
        ["grey-4"]: "#F8F8F8",
        ["grey-5"]: "#E0E0E0",
        ['grey-6']: "#BDBDBD",
        blue: "#2F80ED",
        purple: "#8885FF",
        orange: "#F8B76B",
        red: "#EB5757",
      },
    },
  },
  plugins: [],
};
