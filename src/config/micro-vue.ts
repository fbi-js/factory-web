import { merge } from 'webpack-merge'
import { IConfigOption } from '../types'
import { deps as baseDeps, getConfig as getBaseConfig } from './vue'

export const getConfig = (options: IConfigOption) => {
  const baseConfig = getBaseConfig(options)

  return merge(baseConfig, {
    output: {
      libraryTarget: 'umd'
    }
  })
}

export const deps = {
  ...baseDeps
}
