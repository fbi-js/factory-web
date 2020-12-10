import type { Configuration } from 'webpack'

import { join } from 'path'
import { paths } from '../config/constant/paths'

export const getConfig = (data: Record<string, any>) => {
  const prijectInfo = require(join(paths.cwd, 'package.json'))
  const appNameArr: string[] = prijectInfo.name.split('/')
  const orgName = appNameArr.length > 1 ? appNameArr[0].replace('@', '') : ''
  const projectName = appNameArr.length > 1 ? appNameArr[1] : appNameArr[0]

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
    externals: ['single-spa']
  }

  return config
}
