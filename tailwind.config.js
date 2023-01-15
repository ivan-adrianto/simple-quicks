/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        "grey-1": "#4F4F4F",
        "grey-2": "#828282",
        "grey-3": "#C4C4C4",
        "grey-4": "#F8F8F8",
        "grey-5": "#E0E0E0",
        "grey-6": "#BDBDBD",
        blue: "#2F80ED",
        "blue-transparent": "#E9F3FF",
        purple: "#8885FF",
        "purple-transparent": "#EEDCFF",
        orange: "#F8B76B",
        "orange-transparent": "#FCEED3",
        red: "#EB5757",
        green: "#43B78D",
        "green-transparent": "#D2F2EA",
      },
    },
  },
  plugins: [],
};
