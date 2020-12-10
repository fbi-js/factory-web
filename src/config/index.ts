import type { Configuration } from 'webpack'
import { TemplateTypes } from '../types'
import {
  getDefinePluginData,
  getUserConfig,
  resolveUserConfig,
  getTemplateWebpackConfig,
  getWebpackBaseConfig
} from '../template-webpack'
import { merge } from 'webpack-merge'

export const resolveWebpackConfig = async (
  type: TemplateTypes,
  data: Record<string, any>
): Promise<Configuration> => {
  // console.log('resolveWebpackConfig', data)
  // get base webpack config
  const definePluginData = getDefinePluginData(data)
  const webpackBaseConfig = getWebpackBaseConfig(definePluginData)
  const typeConfig = getTemplateWebpackConfig(type, webpackBaseConfig)
  const baseConfig = merge(webpackBaseConfig, typeConfig)

  // get user webpack config
  let userConfig = getUserConfig()
  userConfig = resolveUserConfig(userConfig, baseConfig)

  // merge config
  return merge(baseConfig, userConfig)
}
