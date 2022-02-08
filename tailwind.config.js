module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  content: ['./src/**/*.js', './src/**/**/*.jsx'],
  theme: {
    fill: (theme) => ({
      red: theme('colors.red.primary')
    }),
    colors: {
      white: '#ffffff',
      blue: {
        medium: '#458eff'
      },
      black: {
        light: '#262626',
        faded: '#00000059'
      },
      gray: {
        base: '#616161',
        background: '#fafafa',
        primary: '#dbdbdb'
      },
      red: {
        primary: '#ed4956'
      }
    }
  },
  variants: {
    extend: {
      display: ['group-hover']
    }
  }
}