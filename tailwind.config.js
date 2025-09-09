/* eslint-disable no-undef */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}", // React-filer
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'), // prose
    require('@tailwindcss/line-clamp'), // line-clamp
  ],
}