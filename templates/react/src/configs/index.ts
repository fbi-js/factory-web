import test from './test.config'
import development from './dev.config'
import production from './prod.config'

export interface IConfig {
  apiHost?: string
  baseUrl?: string
}

const baseConfig = {
  apiHost: '',
  baseUrl: '/api'
}

const configs = {
  test,
  development,
  production
}

const envConfig = configs[process.env.NODE_ENV] || baseConfig

export default Object.assign({}, baseConfig, envConfig)
