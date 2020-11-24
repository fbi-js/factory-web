import webpack from 'webpack'
import { join } from 'path'
import { paths } from './paths'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

export default (data: Record<string, any>) => {
  const buildMode = process.env.NODE_ENV
  const isDev = buildMode === 'development'
  const appName = process.env.npm_package_name
  const appVersion = process.env.npm_package_version
  const distDir = join(process.cwd(), 'dist')

  return {
    mode: buildMode,
    devtool: isDev ? 'inline-source-map' : false,
    entry: {
      main: join(paths.src, 'main.js')
    },
    output: {
      path: paths.dist,
      publicPath: '/',
      filename: isDev ? '[name].js?v=[contenthash]' : 'js/[name].[contenthash].js'
    },
    module: {
      rules: [
        // JavaScript: Use Babel to transpile JavaScript files
        {
          test: /\.(js|jsx)$/,
          use: ['babel-loader'],
          exclude: /node_modules/
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
                MiniCssExtractPlugin.loader,
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
        },
        // images
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource'
        },
        // fonts and SVGs
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'asset/inline'
        }
      ]
    },
    plugins: [
      // Make appName & appVersion available as a constant
      new webpack.DefinePlugin({ appName: JSON.stringify(appName) }),
      new webpack.DefinePlugin({ appVersion: JSON.stringify(appVersion) }),
      // Removes/cleans build folders and unused assets when rebuilding
      new CleanWebpackPlugin(),
      // Copies files from target to destination folder
      new CopyWebpackPlugin({
        patterns: [
          {
            from: paths.public,
            to: 'assets',
            globOptions: {
              ignore: ['*.DS_Store']
            }
          }
        ]
      }),
      new HtmlWebpackPlugin({
        title: data.title || 'My App',
        template: join(paths.public, 'index.html'),
        filename: 'index.html' // output file
      }),
      isDev
        ? new webpack.HotModuleReplacementPlugin()
        : // Extracts CSS into separate files
          // Note: style-loader is for development, MiniCssExtractPlugin is for production
          new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash].css',
            chunkFilename: '[id].css'
          })
    ],
    resolve: {
      extensions: ['*', '.js', '.vue'],
      symlinks: false
    },
    resolveLoader: {
      modules: ['node_modules', 'factory-web/node_modules']
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
            minimizer: [new CssMinimizerPlugin(), '...'],
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
