module.exports = {
  content: ['./src/**/*.{html,css}'],
  presets: [
    require('@ut-essentials/tailwindcss-preset-themable'),
    require('./lib/tailwindcss-preset-typography'),
    require('@ut-essentials/tailwindcss-preset-screens'),
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
