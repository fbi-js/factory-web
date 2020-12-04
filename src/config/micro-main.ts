import type { Configuration } from 'webpack'

import { join } from 'path'
import webpack from 'webpack'
import { paths } from './helpers/paths'
import { IConfigOption } from '../types'

export const getConfig = (options: IConfigOption) => {
  const userConfig = require(join(paths.cwd, 'micro-app'))
  const { mode, cosEnv } = options
  const isDev = mode === 'development'
  const opts = {
    orgName: userConfig.orgName,
    projectName: userConfig.projectName,
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

  let apps = []
  try {
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
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/common-deps',
            to: 'common-deps/'
          }
        ]
      })
    ].filter(Boolean)
  }

  return config
}


export const getDeps = ({ factory }: IConfigOption) => {
  return {
    '@types/systemjs': '^6.1.0'
  }
}
