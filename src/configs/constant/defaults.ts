import type { Configuration as WebpackConfiguration } from 'webpack'
import { paths } from './paths'

// http server config
export const PORT = 9000
export const HOST = '0.0.0.0'

export const WEBPACK_STATS: WebpackConfiguration['stats'] = {
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
  version: true,
  moduleAssets: false
}

// webpack-dev-server config
export const WEBPACK_DEV_SERVER_CONFIG: Record<string, any> = {
  historyApiFallback: true,
  compress: true,
  // hot: true,
  open: false,
  overlay: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*'
  },
  // host: HOST,
  port: PORT,
  // https://github.com/webpack/webpack-dev-server/releases/tag/v4.0.0-beta.0
  static: [paths.dist],
  firewall: false,
  client: {
    host: HOST
  }
}

export const isDev = () => {
  const buildMode = process.env.NODE_ENV || 'development'
  return buildMode === 'development'
}
