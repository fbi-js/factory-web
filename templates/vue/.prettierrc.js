const { prettier } = require('fbi-lint')

module.exports = {
  ...prettier,
  endOfLine: 'auto',
}
