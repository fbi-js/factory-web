// Docs: https://github.com/fbi-js/factory-web#Configuration
const config = require('@fbi-js/webpack-config-vue').default

module.exports = config({
  options: {
    presets: ['react', 'typescript']
  }
})
