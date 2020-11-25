import type { Configuration } from 'webpack'

import ESLintPlugin from 'eslint-webpack-plugin'
import StyleLintPlugin from 'stylelint-webpack-plugin'

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
        files: 'src',
        fix: true
      } as any),

      new StyleLintPlugin({
        files: 'src/**/*.{css,scss,vue}'
      }),

      new VueLoaderPlugin()
    ],
    resolve: {
      extensions: ['*', '.js', '.vue'],
      alias: {
        vue: 'vue/dist/vue.esm.js'
      }
    }
  }

  return config
}

export const deps = {
  'vue-loader': '^15.9.5',
  '@babel/plugin-proposal-class-properties': '^7.12.1'
}
