import type { WebpackConfiguration } from '../types'

import webpack from 'webpack'
import { join, resolve } from 'path'
import { paths } from './helpers/paths'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { WEBPACK_DEV_SERVER_CONFIG, WEBPACK_STATS } from './defaults'

export default (data: Record<string, any>): WebpackConfiguration => {
  const buildMode = process.env.NODE_ENV || 'development'
  const isDev = buildMode === 'development'
  const isTs = data.factory?.features?.typescript

  const config = {
    mode: buildMode,
    devtool: isDev ? 'inline-source-map' : false,
    entry: {
      main: join(paths.src, `main.${isTs ? 'ts' : 'js'}`)
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
          test: /\.(js|ts)x?$/,
          use: ['babel-loader'],
          exclude: resolve('node_modules')
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
        {
          test: /\.(scss|css)$/,
          use: isDev
            ? [
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
            : [
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
        }
      ]
    },
    plugins: [
      new webpack.ProgressPlugin(),
      // Make appName & appVersion available as a constant
      new webpack.DefinePlugin(data.DefinePluginData || {}),
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
      new HtmlWebpackPlugin({
        title: data.title || 'My App',
        template: join(paths.public, 'index.html'),
        filename: 'index.html', // output file
        // https://github.com/jantimon/html-webpack-plugin/blob/657bc605a5dbdbbdb4f8154bd5360492c5687fc9/examples/template-parameters/webpack.config.js#L20
        templateParameters: (
          compilation: { options: any },
          assets: any,
          assetTags: any,
          options: any
        ) => {
          return {
            compilation,
            webpackConfig: compilation.options,
            htmlWebpackPlugin: {
              tags: assetTags,
              files: assets,
              options
            },
            isLocal: isDev,
            serverUrl: `http://localhost:${data.port}`
          }
        }
      }),
      isDev
        ? new webpack.HotModuleReplacementPlugin()
        : // Extracts CSS into separate files
          // Note: style-loader is for development, MiniCssExtractPlugin is for production
          new MiniCssExtractPlugin({
            filename: `${paths.css}/[name].[contenthash].css`,
            chunkFilename: `${paths.css}/[name]-[id].css`
          })
    ].filter(Boolean),
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.mjs', '.wasm', '.json'],
      alias: {
        '@': resolve('src/')
      }
    },
    performance: {
      hints: false
    },
    stats: WEBPACK_STATS,
    ...(isDev
      ? {
          devServer: WEBPACK_DEV_SERVER_CONFIG
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

  if (isTs) {
    config.plugins.push(new ForkTsCheckerWebpackPlugin())
  }

  return config as WebpackConfiguration
}
