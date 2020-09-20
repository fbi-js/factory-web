import dev from './dev.config'
import prod from './prod.config'
import testBuild from './test-build.config'
const baseConfig = {
  host: ''
<%_ if (project.features.openapi) { _%>
  ,baseUrl: '',
  authKey: 'Authorization'
<%_ } _%>
}
const envKeys = [
  { key: 'development', env: dev },
  { key: 'production', env: prod },
  { key: 'testing', env: testBuild },
]
const env = envKeys.find(it => it.key === process.env.NODE_ENV) || {
  env: baseConfig,
}
export default Object.assign({}, baseConfig, env.env)
