module.exports = {
  plugins: {
    '@ut-essentials/posthtml-pipeline': {
      pipelinePlugins: [
        require('@ut-essentials/posthtml-extends').default(),
        require('@ut-essentials/posthtml-tokens').default({
          tokens: {
            global: {
              '[[title]]': 'Template Project',
              '[[page_name]]': 'Content Header',
              '[phone]': '1-800-922-2488',
              '[license number]': 'Contractor License #826234',
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
              '[[top_nav]]': ({ readFile }) =>
                readFile('./src/tokens/top_nav.html'),
              '[[bottom_nav]]': ({ readFile }) =>
                readFile('./src/tokens/bottom_nav.html'),
              '[[display_addresses]]': ({ readFile }) =>
                readFile('./src/tokens/display_addresses.html'),
            },
          },
        }),
      ],
      plugins: [require('posthtml-expressions')()],
    },
  },
}
