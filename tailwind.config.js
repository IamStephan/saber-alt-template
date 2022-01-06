module.exports = {
  content: ['./src/**/*.{html,css}'],
  presets: [
    require('./lib/tailwindcss-preset-colors'),
    require('./lib/tailwindcss-preset-screens'),
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
