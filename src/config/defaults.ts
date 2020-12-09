import type { Options } from 'webpack'
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'

import { join } from 'path'
import { paths } from './helpers/paths'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

// http server config
export const PORT = 9000
export const HOST = '0.0.0.0'

export const WEBPACK_STATS: Options.Stats = {
  assets: true,
  // `webpack --colors` equivalent
  colors: true,
  children: false,
  chunks: false,
  chunkModules: false,
  chunkOrigins: false,
  // Add errors
  errors: true,
  // Add details to errors (like resolving log)
  errorDetails: true,
  hash: false,
  modules: false,
  timings: true,
  // Add webpack version information
  version: true
}

// webpack-dev-server config
export const WEBPACK_DEV_SERVER_CONFIG: DevServerConfiguration = {
  contentBase: paths.dist,
  clientLogLevel: 'silent',
  historyApiFallback: true,
  compress: true,
  hot: true,
  open: false,
  overlay: true,
  stats: 'errors-only',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*'
  },
  disableHostCheck: true,
  host: HOST,
  port: PORT,
  noInfo: true
}

export const CSS_LOADER_OPTIONS_DEV = [
  'style-loader',
  { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
  { loader: 'postcss-loader', options: { sourceMap: true } },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
      // Prefer `dart-sass`
      implementation: require('sass')
    }
  }
]

export const CSS_LOADER_OPTIONS_PROD = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: paths.css
    }
  },
  {
    loader: 'css-loader',
    options: {
      importLoaders: 2,
      sourceMap: false
    }
  },
  'postcss-loader',
  {
    loader: 'sass-loader',
    options: {
      // Prefer `dart-sass`
      implementation: require('sass')
    }
  }
]

export const isDev = () => {
  const buildMode = process.env.NODE_ENV || 'development'
  return buildMode === 'development'
}
