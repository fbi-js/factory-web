import type { Configuration } from 'webpack'

import { join } from 'path'
import common from './common'
import { merge } from 'webpack-merge'

export const resolveWebpackConfig = async (
  type: string,
  data: Record<string, any>
): Promise<Configuration> => {
  const commonConfigs = common(data)

  let typeConfigs = {}
  try {
    const { getConfig } = require(`./${type}`)
    typeConfigs = getConfig(data)
  } catch {}

  // user config
  let userConfig = {}
  const userConfigPath = join(process.cwd(), 'webpack.config')
  try {
    const tmp = require(userConfigPath)
    userConfig = tmp.default || tmp || {}
  } catch {}

  return merge(commonConfigs, typeConfigs, userConfig)
}
