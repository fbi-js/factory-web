import type { Configuration } from 'webpack'

import StyleLintPlugin from 'stylelint-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'

export const getConfig = (env: string) => {
  const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin

  const config: Configuration = {
    module: {
      rules: [
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: 'vue-loader',
          options: {
            shadowMode: true
          }
        }
      ]
    },
    plugins: [
      new ESLintPlugin({
        extensions: ['js', 'vue'],
        files: 'src'
      }),

      new StyleLintPlugin({
        files: 'src/**/*.{css,scss,vue}'
      }),

      new VueLoaderPlugin()
    ]
  }

  return config
}

export const deps = {
  'vue-loader': '^15.9.5'
}
