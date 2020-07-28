module.exports = {
  purge: [
    './src/**/*.vue'
  ],
  theme: {
    extend: {
      height: {
        circle: '23px'
      },
      width: {
        circle: '30px'
      }
    },
    borderWidth: {
      default: '1px',
      '0': '0',
      '1': '1px',
      '2': '2px',
      '4': '4px',
    },
    stroke: theme => ({
      'red': theme('colors.red.500'),
      'black': theme('colors.black'),
    })
  },
  variants: {},
  plugins: [],
}
