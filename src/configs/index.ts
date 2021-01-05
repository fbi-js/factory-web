import { Configuration } from 'webpack'
import { merge } from '@fbi-js/webpack-config-base'

import { TemplateTypes } from '../types'
import {
  resolveWebpackData,
  getUserConfig,
  resolveUserConfig,
  getTemplateWebpackConfig
} from './webpack'

export const resolveWebpackConfig = async (
  type: TemplateTypes,
  data: Record<string, any>
): Promise<Configuration> => {
  // get base webpack config
  const webpackData = resolveWebpackData(data)
  const typeConfig = getTemplateWebpackConfig(type, webpackData)
  // get user webpack config
  let userConfig = getUserConfig()
  userConfig = resolveUserConfig(userConfig, typeConfig)

  // merge config
  return merge(typeConfig, userConfig)
}
