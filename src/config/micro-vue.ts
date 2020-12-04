import { merge } from 'webpack-merge'
import { IConfigOption } from '../types'
import { AssetJsonPlugin } from './plugins'
import { getDeps as getBaseDeps, getConfig as getBaseConfig } from './vue'

export const getConfig = (options: IConfigOption) => {
  const baseConfig = getBaseConfig(options)

  return merge(baseConfig, {
    output: {
      libraryTarget: 'umd'
    },
    plugins: [
      new AssetJsonPlugin({
        onlyEntryFile: true
      })
    ]
  })
}

export const getDeps = (data: IConfigOption) => {
  return getBaseDeps(data)
}
