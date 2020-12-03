import type { Options } from 'webpack'
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'

import { join } from 'path'
import { paths } from './helpers/paths'

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
  contentBase: join(paths.cwd, paths.dist),
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
  port: PORT
}
