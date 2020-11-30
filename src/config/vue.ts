import type { Configuration } from 'webpack'

import { join } from 'path'
import { paths } from './helpers/paths'
import { IConfigOption } from '../types'
import ESLintPlugin from 'eslint-webpack-plugin'
import StyleLintPlugin from 'stylelint-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export const getConfig = (options: IConfigOption) => {
  const { title } = options
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

      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        title: title || 'My App',
        template: join(paths.public, 'index.html'),
        filename: 'index.html' // output file
      })
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
  'vue-template-compiler': '^2.6.12',
  '@babel/plugin-proposal-class-properties': '^7.12.1'
}
