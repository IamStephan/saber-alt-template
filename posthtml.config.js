module.exports = {
  plugins: {
    'posthtml-pipeline': {
      plugins: [
        require('posthtml-extends').default(),
        require('posthtml-tokens').default({
          tokens: {
            '[[title]]': 'Template Project',
            '[[page_name]]': 'Content Header',
            '[[city_scroll:50]]': ({ readFile }) =>
              readFile('./src/tokens/city_scroll.html'),
            '[[breadcrumbs]]': ({ readFile }) =>
              readFile('./src/tokens/breadcrumbs.html'),
            '[[breadcrumbs]]': ({ readFile }) =>
              readFile('./src/tokens/breadcrumbs.html'),
            '[[single_silo_nav]]': ({ readFile }) =>
              readFile('./src/tokens/single_silo_nav.html'),
            '[[content]]': ({ readFile }) =>
              readFile('./src/tokens/content.html'),
          },
        }),
      ],
      legacyPlugins: [require('posthtml-expressions')()],
    },
  },
}
