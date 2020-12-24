import type { WebpackConfiguration } from '../../types'

import webpack from 'webpack'
import { join, resolve } from 'path'
import WebpackBar from 'webpackbar'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

import { getMergePaths, isProd, getEnvMode } from '../../helpers/utils'
import {
  WEBPACK_DEV_SERVER_CONFIG,
  WEBPACK_DEV_STATS,
  WEBPACK_BUILD_STATS
} from '../constant/defaults'

export const getWebpackBaseConfig = (data: Record<string, any>): WebpackConfiguration => {
  const paths = getMergePaths(data.paths)
  const isDev = !isProd()
  const isTs = data.factory?.features?.typescript
  const htmlWebpackPluginTemplatePath = join(paths.public, 'index.html')

  const config = {
    mode: getEnvMode(),
    devtool: isDev ? 'inline-source-map' : false,
    entry: {
      main: join(paths.src, `main.${isTs ? 'ts' : 'js'}`)
    },
    output: {
      path: paths.dist,
      publicPath: process.env.ASSET_PATH || '/',
      filename: isDev ? '[name].js?v=[fullhash]' : `${paths.js}/[name].[fullhash].js`,
      assetModuleFilename: isDev
        ? '[name][ext][query]'
        : `${paths.assets}/[name].[hash][ext][query]`
    },
    cache: {
      type: 'filesystem'
    },
    module: {
      rules: [
        // JavaScript: Use Babel to transpile JavaScript files
        {
          test: /\.(j|t)sx?$/,
          use: ['babel-loader'],
          exclude: resolve('node_modules')
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 4 * 1024 // 4kb
            }
          },
          generator: {
            filename: isDev ? '[name][ext][query]' : `${paths.img}/[name].[hash][ext][query]`
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          type: 'asset/resource'
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          type: 'asset/resource'
        },
        // Styles: Inject CSS into the head with source maps
        {
          test: /\.(sc|sa|c)ss$/,
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
                    publicPath: paths.cssExtractPublicPath
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
      new WebpackBar({
        name: data.pkg.name || '',
        color: '#0052D9'
      }),
      // Make appName & appVersion available as a constant
      new webpack.DefinePlugin(data.definePluginData || {}),
      // Removes/cleans build folders and unused assets when rebuilding
      new CleanWebpackPlugin(),
      // Copies files from target to destination folder
      new CopyWebpackPlugin({
        patterns: [
          {
            from: paths.public,
            globOptions: {
              dot: true
            },
            filter: (resourcePath) => !resourcePath.endsWith('index.html')
          }
        ]
      }),
      new HtmlWebpackPlugin({
        title: data.title || 'My App',
        template: htmlWebpackPluginTemplatePath,
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
            filename: `${paths.css}/[name].[contenthash].css`
          })
    ].filter(Boolean),
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.mjs', '.wasm', '.json'],
      modules: ['node_modules', join(__dirname, '../../../node_modules')],
      alias: {
        '@': resolve('src/')
      }
    },
    resolveLoader: {
      modules: ['node_modules', join(__dirname, '../../../node_modules')]
    },
    performance: {
      hints: false
    },
    stats: isDev ? WEBPACK_DEV_STATS : WEBPACK_BUILD_STATS,
    ...(isDev
      ? {
          devServer: WEBPACK_DEV_SERVER_CONFIG
        }
      : {
          optimization: {
            minimize: true,
            minimizer: [`...`, new CssMinimizerPlugin()],
            // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
            // instead of having their own. This also helps with long-term caching, since the chunks will only
            // change when actual code changes, not the webpack runtime.
            runtimeChunk: {
              name: 'runtime'
            },
            chunkIds: 'named'
          },
          performance: {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
          }
        })
  }

  if (isTs) {
    config.plugins.push(
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          diagnosticOptions: {
            semantic: true,
            syntactic: true
          },
          mode: 'write-references'
        }
      })
    )
  }

  return config as WebpackConfiguration
}
