const path = require('path')
const fs = require('fs')

module.exports = {
  plugins: {
    'posthtml-pipeline': {
      plugins: [
        require('posthtml-extends').default(),
        require('posthtml-tokens').default({
          tokens: {
            '[[title]]': 'Template Project',
            '[[page_name]]': 'Content Header',
            '[[city_scroll:50]]': () => {
              const pathToToken = path.resolve(
                process.cwd(),
                './src/tokens/city_scroll.html'
              )
              return fs.readFileSync(pathToToken, 'utf8')
            },

            '[[breadcrumbs]]': () => {
              const pathToToken = path.resolve(
                process.cwd(),
                './src/tokens/breadcrumbs.html'
              )
              return fs.readFileSync(pathToToken, 'utf8')
            },
            '[[breadcrumbs]]': () => {
              const pathToToken = path.resolve(
                process.cwd(),
                './src/tokens/breadcrumbs.html'
              )
              return fs.readFileSync(pathToToken, 'utf8')
            },
            '[[single_silo_nav]]': () => {
              const pathToToken = path.resolve(
                process.cwd(),
                './src/tokens/single_silo_nav.html'
              )
              return fs.readFileSync(pathToToken, 'utf8')
            },
            '[[content]]': () => {
              const pathToToken = path.resolve(
                process.cwd(),
                './src/tokens/content.html'
              )
              return fs.readFileSync(pathToToken, 'utf8')
            },
          },
        }),
      ],
      legacyPlugins: [require('posthtml-expressions')()],
    },
  },
}
