const plugin = require("tailwindcss/plugin")
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    container: false // tắt class container mặc định
  },
  theme: {
    extend: {}
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".container": {
          // set up class container mới
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto"
        }
      })
    })
  ]
}
