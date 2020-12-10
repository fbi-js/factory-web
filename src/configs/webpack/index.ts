import { TemplateTypes } from '../../types'
import type { Configuration } from 'webpack'
import { join } from 'path'
import { paths, factoryConfigs } from '../constant/paths'

export * from './base'

/**
 * get template webpack config
 * @param type template file name, can be get "micro-main" | "micro-react" | "micro-vue" | "react" | "vue"
 * @param data
 */
export const getTemplateWebpackConfig = (type: TemplateTypes, data: Record<string, any>) => {
  let typeWebpackConfig = {}
  try {
    const { getConfig } = require(`./${type}`)
    typeWebpackConfig = getConfig(data)
  } catch {}
  return typeWebpackConfig
}

/**
 * get user webpack config data, config file is 'webpack.config.js' in project root directory
 */
export const getUserConfig = () => {
  let userConfig = {}
  const userConfigPath = join(process.cwd(), factoryConfigs.webpackFileName)
  try {
    const exportConfig = require(userConfigPath)
    userConfig = exportConfig.default || exportConfig
  } catch {}
  return userConfig
}

/**
 * support custom base webpack config when user webpack config is a function
 * @param userConfig user webpack config
 * @param baseConfig base webpack config
 */
export const resolveUserConfig = (userConfig: Configuration | any, baseConfig: Configuration) => {
  const isResolver = userConfig && userConfig === 'function'
  return isResolver ? userConfig({
    config: baseConfig,
    paths
  }) : userConfig
}

/**
 * add global variable by use process.env.xxx
 * @param data
 */
export const getDefinePluginData = (data: Record<string, any>) => {
  const definePluginData = {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.MICRO_MODE': JSON.stringify(process.env.MICRO_MODE)
  }
  return {
    ...data,
    definePluginData
  }
}
