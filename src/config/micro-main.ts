import type { Configuration } from 'webpack'

import { join } from 'path'
import webpack from 'webpack'
import { paths } from './helpers/paths'
import { IConfigOption } from '../types'

export const getConfig = (options: IConfigOption) => {
  const { mode, port, startEntry, title, cosEnv } = options
  const isDev = mode === 'development'
  const opts = {
    orgName: 'mf',
    projectName: 'base',
    orgPackagesAsExternal: true,
    webpackConfigEnv: null,
    standalone: false,
    standaloneOptions: {}
  }
  const webpackConfigEnv = opts.webpackConfigEnv || {
    isLocal: isDev,
    COS_ENV: cosEnv,
    standalone: false
  }

  const CopyWebpackPlugin = require('copy-webpack-plugin')
  // const HtmlWebpackPlugin = require('html-webpack-plugin')
  // const StandaloneSingleSpaPlugin = require('standalone-single-spa-webpack-plugin')
  const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

  let apps = []
  try {
    const userConfig = require(join(paths.cwd, 'apps.config'))
    apps = userConfig.apps
  } catch {}
  const config: Configuration = {
    entry: join(paths.src, 'index.ts'),
    output: {
      filename: isDev
        ? `${opts.orgName}-${opts.projectName}.js?v=[hash]`
        : `${opts.orgName}-${opts.projectName}.[hash].js`,
      libraryTarget: 'system',
      path: paths.dist,
      jsonpFunction: `webpackJsonp_${opts.projectName}`,
      devtoolNamespace: `${opts.projectName}`
    },
    module: {
      rules: [
        {
          parser: {
            system: false
          }
        },
        {
          test: /\.(js|ts)x?$/,
          use: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },
    externals: opts.orgPackagesAsExternal
      ? ['single-spa', new RegExp(`^@${opts.orgName}/`)]
      : ['single-spa'],
    plugins: [
      new webpack.DefinePlugin({
        COS_ENV: JSON.stringify(webpackConfigEnv.COS_ENV),
        APPS: JSON.stringify(apps)
      }),
      new ForkTsCheckerWebpackPlugin({ typescript: require.resolve('typescript') }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/common-deps',
            to: 'common-deps/'
          }
        ]
      })
      // isDev &&
      //   new StandaloneSingleSpaPlugin({
      //     appOrParcelName: `@${opts.orgName}/${opts.projectName}`,
      //     disabled: !webpackConfigEnv.standalone,
      //     HtmlWebpackPlugin,
      //     ...opts.standaloneOptions
      //   })
    ].filter(Boolean),
    resolve: {
      extensions: ['.ts', '.js', '.mjs', '.jsx', '.wasm', '.json']
    }
  }

  return config
}

export const deps = {
  // 'standalone-single-spa-webpack-plugin': '^1.1.0',
  'fork-ts-checker-webpack-plugin': '^6.0.4',
  '@types/systemjs': '^6.1.0'
}
