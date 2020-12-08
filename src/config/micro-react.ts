import { merge } from 'webpack-merge'
import { IConfigOption } from '../types'
import { AssetJsonPlugin } from './plugins'
import { getConfig as getBaseConfig } from './react'

export const getConfig = (options: IConfigOption) => {
  const baseConfig = getBaseConfig(options)

  return merge(baseConfig, {
    output: {
      libraryTarget: 'umd'
    },
    plugins: [
      new AssetJsonPlugin({
        onlyEntryFile: true,
        input: 'micro.config.js',
        output: 'micro.config.json'
      })
    ]
  })
}
