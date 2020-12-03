import path from 'path'
import WebpackDevServer from 'webpack-dev-server'
// http server config
export const PORT = 9000
export const HOST = '0.0.0.0'
// webpack-dev-server config
export const WEBPACK_DEV_CONFIG:WebpackDevServer.Configuration = {
  contentBase: path.join(process.cwd(), 'dist'),
  clientLogLevel: 'silent',
  historyApiFallback: true,
  compress: true,
  injectHot: true,
  hot: true,
  // noInfo: true,
  open: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*'
  },
  disableHostCheck: true
}
