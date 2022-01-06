const { neutral } = require('tailwindcss/colors')

module.exports = {
  theme: {
    extend: {
      colors: {
        template: {
          primary: {
            50: '#fff3f1',
            100: '#ffe4e0',
            200: '#ffcdc5',
            300: '#ffaa9d',
            400: '#ff7a65',
            500: '#fe5035',
            600: '#ed3f24',
            700: '#c7270e',
            800: '#a42410',
            900: '#882414',
          },
        },
        gray: neutral,
      },
    },
  },
}
