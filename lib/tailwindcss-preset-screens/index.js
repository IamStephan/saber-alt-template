module.exports = {
  theme: {
    /**
     * Note on breakpoints:
     * =====================
     * It makes more sense to create the template
     * from a desktop-first perspective than mobile
     * first. The reasoning behind this is that the
     * designers at Treehouse first start with a desktop
     * design and then move to mobile. On some occasions
     * the mobile design doesn't exist and needs to be infered
     */
    screens: {
      '3xl': { max: '1719px' },
      '2xl': { max: '1535px' },
      xl: { max: '1279px' },
      lg: { max: '1023px' },
      md: { max: '767px' },
      sm: { max: '639px' },
      xs: { max: '479px' },
    },
    extend: {
      maxWidth: {
        'screen-3xl': '1719px',
        'screen-2xl': '1535px',
        'screen-xl': '1279px',
        'screen-lg': '1023px',
        'screen-md': '767px',
        'screen-sm': '639px',
        'screen-xs': '479px',
      },
    },
  },
}
