import type { Configuration } from 'webpack'

import { join } from 'path'
import { paths } from './helpers/paths'
import { IConfigOption } from '../types'

export const getConfig = (options: IConfigOption) => {
  const prijectInfo = require(join(paths.cwd, 'package.json'))
  const appNameArr: string[] = prijectInfo.name.split('/')
  const orgName = appNameArr.length > 1 ? appNameArr[0].replace('@', '') : ''
  const projectName = appNameArr.length > 1 ? appNameArr[1] : appNameArr[0]

  const CopyWebpackPlugin = require('copy-webpack-plugin')

  const config: Configuration = {
    output: {
      libraryTarget: 'system',
      path: paths.dist,
      jsonpFunction: `webpackJsonp_${orgName}_${projectName}`,
      devtoolNamespace: `${orgName}_${projectName}`
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
    externals: ['single-spa'],
    plugins: [
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
