import type { Configuration } from 'webpack'

import webpack from 'webpack'
import { paths } from './paths'
import { join, resolve } from 'path'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

type WebpackMode = 'development' | 'production' | 'none'

export default (data: Record<string, any>): Configuration => {
  const buildMode = process.env.NODE_ENV || 'development'
  const isDev = buildMode === 'development'
  const appName = process.env.npm_package_name
  const appVersion = process.env.npm_package_version
  const distDir = join(process.cwd(), 'dist')

  return {
    mode: buildMode as WebpackMode,
    devtool: isDev ? 'inline-source-map' : false,
    entry: {
      main: join(paths.src, 'main.js')
    },
    output: {
      path: paths.dist,
      publicPath: isDev ? '/' : '/',
      filename: isDev ? '[name].js?v=[hash]' : `${paths.js}/[name].[hash].js`
    },
    module: {
      rules: [
        // JavaScript: Use Babel to transpile JavaScript files
        {
          test: /\.(js|jsx)$/,
          use: ['babel-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 5000,
            name: isDev ? '[name].[ext]?[hash:8]' : `${paths.img}/[name].[hash:8].[ext]`,
            esModule: false
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 5000,
            name: isDev ? '[name].[ext]?[hash:8]' : `${paths.assets}/[name].[hash:8].[ext]`,
            esModule: false
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 5000,
            name: isDev ? '[name].[ext]?[hash:8]' : `${paths.assets}/[name].[hash:8].[ext]`,
            esModule: false
          }
        },
        // Styles: Inject CSS into the head with source maps
        // TODO:这个公共loader处理css文件时好像会报错 先注释掉
        {
          // test: /\.(scss|css)$/,
          // use: isDev
          //   ? [
          //       'style-loader',
          //       { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
          //       { loader: 'postcss-loader', options: { sourceMap: true } },
          //       {
          //         loader: 'sass-loader',
          //         options: {
          //           sourceMap: true,
          //           // Prefer `dart-sass`
          //           implementation: require('sass')
          //         }
          //       }
          //     ]
          //   : [
          //       {
          //         loader: MiniCssExtractPlugin.loader,
          //         options: {
          //           publicPath: paths.css
          //         }
          //       },
          //       {
          //         loader: 'css-loader',
          //         options: {
          //           importLoaders: 2,
          //           sourceMap: false
          //         }
          //       },
          //       'postcss-loader',
          //       {
          //         loader: 'sass-loader',
          //         options: {
          //           // Prefer `dart-sass`
          //           implementation: require('sass')
          //         }
          //       }
          //     ]
        }
      ]
    },
    plugins: [
      new webpack.ProgressPlugin(),
      // Make appName & appVersion available as a constant
      // new webpack.DefinePlugin({ appName: JSON.stringify(appName) }),
      // new webpack.DefinePlugin({ appVersion: JSON.stringify(appVersion) }),
      // Removes/cleans build folders and unused assets when rebuilding
      new CleanWebpackPlugin(),
      // Copies files from target to destination folder
      new CopyWebpackPlugin({
        patterns: [
          {
            from: paths.public,
            to: 'assets',
            globOptions: {
              ignore: ['*.DS_Store', 'index.html']
            }
          }
        ]
      }),
      // new HtmlWebpackPlugin({
      //   title: data.title || 'My App',
      //   template: join(paths.public, 'index.html'),
      //   filename: 'index.html' // output file
      // }),
      isDev
        ? new webpack.HotModuleReplacementPlugin()
        : // Extracts CSS into separate files
          // Note: style-loader is for development, MiniCssExtractPlugin is for production
          new MiniCssExtractPlugin({
            filename: `${paths.css}/[name].[contenthash].css`,
            chunkFilename: `${paths.css}/[name]-[id].css`
          })
    ],
    resolve: {
      alias: {
        '@': resolve('src/')
      }
    },
    performance: {
      hints: false
    },
    node: {
      // prevent webpack from injecting useless setImmediate polyfill because Vue
      // source contains it (although only uses it if it's native).
      setImmediate: false,
      // prevent webpack from injecting mocks to Node native modules
      // that does not make sense for the client
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    },
    stats: {
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
    },
    ...(isDev
      ? {
          devServer: {
            historyApiFallback: true,
            contentBase: distDir,
            open: true,
            compress: true,
            hot: true,
            port: 8080,
            overlay: true,
            stats: 'errors-only'
          }
        }
      : {
          optimization: {
            minimize: true,
            minimizer: [new CssMinimizerPlugin()],
            // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
            // instead of having their own. This also helps with long-term caching, since the chunks will only
            // change when actual code changes, not the webpack runtime.
            runtimeChunk: {
              name: 'runtime'
            }
          },
          performance: {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
          }
        })
  }
}
