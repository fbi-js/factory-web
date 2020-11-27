import type { Configuration } from 'webpack'

import common from './common'
import { merge } from 'webpack-merge'

export default (type: string, data: Record<string, any>): Configuration => {
  const commonConfigs = common(data)
  const { getConfig } = require(`./${type}`)
  const typeConfigs = getConfig(data.env || 'development')

  return merge(commonConfigs, typeConfigs)
}
