const { eslint } = require('fbi-lint')

module.exports = {
  ...eslint,
  env: {
    browser: true,
    node: true,
  },
}
