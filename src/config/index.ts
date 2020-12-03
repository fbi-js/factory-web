import type { Configuration } from 'webpack'

import { join } from 'path'
import common from './common'
import { merge } from 'webpack-merge'

export const resolveWebpackConfig = async (
  type: string,
  data: Record<string, any>
): Promise<Configuration> => {
  const commonConfigs = common(data)
  const { getConfig } = require(`./${type}`)
  const typeConfigs = getConfig({
    title: data.title,
    port: data.port,
    mode: data.mode,
    startEntry: data.startEntry,
    cosEnv: data.cosEnv
  })

  // user config
  let userConfig = {}
  const userConfigPath = join(process.cwd(), 'webpack.config')
  try {
    const tmp = require(userConfigPath)
    userConfig = tmp.default || tmp || {}
  } catch {}

  return merge(commonConfigs, typeConfigs, userConfig)
}
