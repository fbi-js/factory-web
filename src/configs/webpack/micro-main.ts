import type { Configuration } from 'webpack'

import { join } from 'path'
import { paths } from '../constant/paths'

export const getConfig = (data: Record<string, any>) => {
  const pkgName = require(join(paths.cwd, 'package.json'))
  const fullName = pkgName.replace('@', '')
  const nameArr: string[] = fullName.split('/')
  if (nameArr.length < 2) {
    throw Error(`package name should follow '@orgName/projectName' format`)
  }
  const orgName = nameArr[0]
  const projectName = nameArr[1]

  const config: Configuration = {
    output: {
      libraryTarget: 'system',
      path: paths.dist,
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
    externals: ['single-spa', new RegExp(`^@${orgName}/`)]
  }

  return config
}
