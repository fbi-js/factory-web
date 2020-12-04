import type { Configuration } from 'webpack'
import type { IConfigOption } from '../types'

import StyleLintPlugin from 'stylelint-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'

export const getConfig = (data: IConfigOption) => {
  const config: Configuration = {
    plugins: [
      new ESLintPlugin({
        extensions: ['js', 'ts', 'jsx', 'tsx'],
        files: 'src'
      }),

      new StyleLintPlugin({
        files: 'src/**/*.{css,scss,jsx}'
      })
    ]
  }

  return config
}
