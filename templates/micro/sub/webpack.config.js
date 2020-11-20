const webpackMerge = require('webpack-merge')
const singleSpaDefaults = require('webpack-config-single-spa-react-ts')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function guid() {
  return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

module.exports = (webpackConfigEnv, opts) => {
  const orgName = 'project-name'
  const projectName = 'app-react'
  const hash = guid()
  const isProd = opts.mode === 'production'
  const hashStr = isProd ? `-${hash}` : ''
  const href = `http://localhost:${opts.port}`
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName,
    webpackConfigEnv,
  })
  const excludeLib = ['react','react-dom']
  defaultConfig.externals = defaultConfig.externals.filter(it=> !excludeLib.includes(it) )
  return webpackMerge.smart(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    output: {
      filename: `${orgName}-${projectName}${hashStr}.js`,
    },
    entry: path.resolve('./src/index.tsx'),
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve('./public/index.html'),
        title: `${href}${
          isProd ? `/${projectName}` : ''
        }/${orgName}-${projectName}${hashStr}.js`,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('src/'),
      },
    }
  })
}
