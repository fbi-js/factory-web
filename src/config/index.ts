import type { Configuration } from 'webpack'

import common from './common'
import { merge } from 'webpack-merge'
import { IConfigOption } from './utils'

export default (type: string, data: Record<string, any>): Configuration => {
  const commonConfigs = common(data)
  const { getConfig } = require(`./${type}`)
  const typeConfigs = getConfig({
    title: data.title,
    port: data.port,
    mode: data.mode,
    startEntry: data.startEntry,
    cosEnv: data.cosEnv
  } as IConfigOption)

  return merge(commonConfigs, typeConfigs)
}
