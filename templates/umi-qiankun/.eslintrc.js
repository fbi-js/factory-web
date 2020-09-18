const lint = require('fbi-lint').reactEslint
module.exports = {
  ...lint,
  extends: [...lint.extends],
  rules: {
    ...lint.rules,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react/self-closing-comp': [
      2,
      {
        component: true,
        html: true,
      },
    ],
  },
  settings: {
    ...lint.settings,
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.tsx', '.js'],
      },
    },
  },
}
