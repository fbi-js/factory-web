import path from 'path'

// http server config
export const PORT = 9000
export const HOST = '0.0.0.0'
// webpack-dev-server config
export const WEBPACK_DEV_CONFIG = {
  contentBase: path.join(process.cwd(), 'dist'),
  logLevel: 'silent',
  injectClient: false,
  writeToDisk: true,
  historyApiFallback: true,
  compress: true,
  hot: true,
  host: 'localhost',
  open: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*'
  },
  disableHostCheck: true
}
