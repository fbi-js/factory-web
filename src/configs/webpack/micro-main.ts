import { join } from 'path'
import { merge } from '@fbi-js/webpack-config-base'
import config from '@fbi-js/webpack-config-base'

export const getConfig = (options: Record<string, any>) => {
  const pkg = require(join(process.cwd(), 'package.json'))
  const fullName = pkg?.name?.replace('@', '') ?? ''
  const nameArr: string[] = fullName.split('/')
  if (nameArr.length < 2) {
    throw Error(`package name should follow '@orgName/projectName' format`)
  }
  const orgName = nameArr[0]
  const projectName = nameArr[1]

  return merge(
    config({
      options
    }),
    {
      output: {
        libraryTarget: 'system',
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
  )
}
