import type { Configuration } from 'webpack'

import { join } from 'path'
import common from './common'
import { merge } from 'webpack-merge'
import { paths } from './helpers/paths'

export const resolveWebpackConfig = async (
  type: string,
  data: Record<string, any>
): Promise<Configuration> => {
  const definePluginData = {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.MICRO_MODE': JSON.stringify(process.env.MICRO_MODE)
  }
  const envData = {
    ...data,
    definePluginData
  }

  const commonConfigs = common(envData)

  let typeConfigs = {}
  try {
    const { getConfig } = require(`./${type}`)
    typeConfigs = getConfig(envData)
  } catch {}

  const baseConfig = merge(commonConfigs, typeConfigs)

  // user config
  let userConfig = {}
  const userConfigPath = join(process.cwd(), 'webpack.config')
  try {
    const tmp = require(userConfigPath)
    const tmpConfig = tmp.default || tmp
    userConfig =
      typeof tmpConfig === 'function'
        ? tmpConfig({
            config: baseConfig,
            paths
          })
        : tmpConfig
  } catch {}

  return merge(baseConfig, userConfig)
}
