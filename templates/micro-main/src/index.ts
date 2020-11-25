import config, { envKeyEnum, IEnvConfig } from './config'

import { run } from './entry'

run()

export * from './tools'
export { config, envKeyEnum, IEnvConfig }
