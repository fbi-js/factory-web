import { merge } from '@fbi-js/webpack-config-base'
import config from '@fbi-js/webpack-config-react'
import { AssetJsonPlugin } from '../plugins'

export const getConfig = (options: Record<string, any>) => {
  return merge(
    config({
      options
    }),
    {
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
  )
}
