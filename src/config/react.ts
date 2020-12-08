import type { Configuration } from 'webpack'
import type { IConfigOption } from '../types'

import { join } from 'path'
import { paths } from './helpers/paths'
import StyleLintPlugin from 'stylelint-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'

export const getConfig = (data: IConfigOption) => {
  const isTs = data.factory?.features?.typescript

  const config: Configuration = {
    entry: {
      main: join(paths.src, `main.${isTs ? 'tsx' : 'js'}`)
    },
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
