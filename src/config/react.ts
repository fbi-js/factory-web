import type { Configuration } from 'webpack'

import StyleLintPlugin from 'stylelint-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'

export const getConfig = (env: string) => {
  const config: Configuration = {
    plugins: [
      new ESLintPlugin({
        extensions: ['js', 'jsx'],
        files: 'src'
      }),

      new StyleLintPlugin({
        files: 'src/**/*.{css,scss,jsx}'
      }),

    ],
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
  }

  return config
}

export const deps = {
  '@babel/preset-react': '^7.12.7',
  '@babel/plugin-proposal-class-properties': '^7.12.1',
  "react-hot-loader": "^4.13.0",
}
