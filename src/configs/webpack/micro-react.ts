import config from '@fbi-js/webpack-config-react'
import { AssetJsonPlugin } from '../plugins'

export const getConfig = (options: Record<string, any>) => {
  return config({
    options,
    webpackConfig: {
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
    }
  })
}
