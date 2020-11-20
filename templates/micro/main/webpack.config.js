const webpackMerge = require('webpack-merge')
const singleSpaDefaults = require('webpack-config-single-spa-ts')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = (webpackConfigEnv, opts) => {
  const orgName = 'project-name'
  const projectName = 'root-config'
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName,
    webpackConfigEnv,
  })
  const href = `http://localhost:${opts.port}`
  const config = webpackMerge.smart(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      historyApiFallback: true,
    },
    entry: path.resolve('./src/index.ts'),
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: 'src/index.html',
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal === 'true',
          orgName,
          href,
        },
      }),
      new webpack.DefinePlugin({
        COS_ENV: JSON.stringify(webpackConfigEnv.COS_ENV),
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/common-deps',
            to: 'common-deps/',
          },
        ],
      }),
      new MiniCssExtractPlugin(),
    ],
    resolve: {
      alias: {
        '@': path.resolve('src/'),
      },
    },
  })
  return config
}
