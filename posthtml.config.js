module.exports = {
  plugins: {
    'posthtml-pipeline': {
      plugins: [
        require('posthtml-extends').default(),
        require('posthtml-tokens').default({
          tokens: {
            '[[hello]]': 'WHIIIIIOOOOO',
            '[[title]]': 'Template Project',
          },
        }),
      ],
      legacyPlugins: [require('posthtml-expressions')()],
    },
  },
}
