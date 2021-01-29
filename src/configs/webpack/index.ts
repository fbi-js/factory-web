import { join } from 'path'
import { Configuration } from 'webpack'
import { paths, factoryConfigs } from '../constant/paths'

/**
 * get template webpack config
 * @param type template file name, can be get "micro-main" | "micro-react" | "micro-vue" | "react" | "vue"
 * @param data
 */
export const getTemplateWebpackConfig = (
  type: string,
  data: Record<string, any>
) => {
  const { getConfig } = require(`./${type}`)
  return getConfig(data)
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
// TODO: remove `paths`
export const resolveUserConfig = (
  userConfig: Configuration | Function,
  baseConfig: Configuration
) => {
  return typeof userConfig === 'function'
    ? userConfig({
        config: baseConfig,
        paths
      })
    : userConfig
}

/**
 * add global variable by use process.env.xxx
 * @param data
 */
export const resolveWebpackData = (data: Record<string, any>) => {
  const definePluginData = {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.MICRO_MODE': JSON.stringify(process.env.MICRO_MODE)
  }
  let pkg = {}
  try {
    pkg = require(join(process.cwd(), 'package.json'))
  } catch {}

  return {
    ...data,
    isTs: data.factory?.features?.typescript,
    pkg,
    definePluginData
  }
}
