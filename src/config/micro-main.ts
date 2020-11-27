export const getConfig = (env: string) => {
  const orgName = 'project-name'
  const projectName = 'root-config'
  const singleSpaDefaults = require('webpack-config-single-spa-ts')

  const config = singleSpaDefaults({
    orgName,
    projectName
  })

  return config
}

export const deps = {
  'webpack-config-single-spa-ts': '^1.17.4 ',
  'ts-config-single-spa': '^1.9.0'
}
