import dev from './dev.config'
import prod from './prod.config'

export interface IEnvConfig {}

const baseConfig: IEnvConfig = {}

const envConfig = process.env.NODE_ENV === 'development' ? dev : prod

export default Object.assign({}, baseConfig, envConfig) as IEnvConfig
