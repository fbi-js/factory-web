import { Configuration } from 'webpack'
import { webpackMerge, defaultOptions } from '@fbi-js/webpack-config-base'
import {
  resolveWebpackData,
  getUserConfig,
  getTemplateWebpackConfig
} from './webpack'

export const resolveWebpackConfig = async (
  type: string,
  data: Record<string, any>
): Promise<Configuration> => {
  // get base webpack config
  const webpackData = resolveWebpackData(data)
  const typeConfig = getTemplateWebpackConfig(type, webpackData)
  // get user webpack config
  const userConfig = getUserConfig()
  // userConfig = resolveUserConfig(userConfig, typeConfig)

  // merge config
  return webpackMerge.mergeWithRules(defaultOptions.mergeRules)(
    typeConfig,
    userConfig
  )
}
