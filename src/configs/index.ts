import type { Configuration } from 'webpack'
import { TemplateTypes } from '../types'
import {
  resolveWebpackData,
  getUserConfig,
  resolveUserConfig,
  getTemplateWebpackConfig,
  getWebpackBaseConfig
} from './webpack'
import { merge } from 'webpack-merge'

export const resolveWebpackConfig = async (
  type: TemplateTypes,
  data: Record<string, any>
): Promise<Configuration> => {
  // get base webpack config
  const webpackData = resolveWebpackData(data)
  const webpackBaseConfig = getWebpackBaseConfig(webpackData)
  const typeConfig = getTemplateWebpackConfig(type, webpackData)
  const baseConfig = merge(webpackBaseConfig, typeConfig)

  // get user webpack config
  let userConfig = getUserConfig()
  userConfig = resolveUserConfig(userConfig, baseConfig)

  // merge config
  return merge(baseConfig, userConfig)
}
