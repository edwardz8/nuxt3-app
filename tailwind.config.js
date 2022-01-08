module.exports = {
  content: [
    "./assets/**/*.css",
    "./assets/css/*.css",
    "./components/*.{vue,js}",
    "./components/**/*.{vue,js}",
    "./pages/*.vue",
    "./pages/**/*.vue",
    "./layouts/**/*.vue",
    "./layouts/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    fontFamily: {
      'display': ['Oswald'],
      'body': ['Open Sans'],
    },
    extend: {},
  },
  plugins: [],
}