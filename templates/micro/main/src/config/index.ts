import dev from './dev.config'
import prod from './prod.config'

/** 由webpack.DefinePlugin注入 */
declare var COS_ENV

export interface IEnvConfig {}

const baseConfig: IEnvConfig = {}

/** 环境变量key enum值来源npm script参数 */
export enum envKeyEnum {
  development = 'development',
  production = 'production',
}

const envKeyFileMap = {
  [envKeyEnum.development]: dev,
  [envKeyEnum.production]: prod,
}

const env = envKeyFileMap[COS_ENV] || {
  env: baseConfig,
}
export default Object.assign({}, baseConfig, env.env) as IEnvConfig
