import devConfig from './config.dev'
import prodConfig from './config.prod'

interface IConfig {
  authKey: string
  baseUrl: string
}

const config: IConfig = {
  baseUrl: '/api',
  authKey: 'Authorization'
}
const env = process.env.REACT_APP_CONFIG_ENV || 'prod'
const envConfig = env === 'prod' ? prodConfig : devConfig
export default Object.assign({}, config, envConfig) as IConfig
