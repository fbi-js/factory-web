const remotesConfigArr = [
  {
    aliasModuleName: 'mainApp',
    remoteModuleName: 'layout',
    remoteUrl: 'http://localhost:9090',
    remoteFile: '/remoteEntry.js',
    remoteTypesPath: `/federation-typings`,
  },
]

const remotes = remotesConfigArr.reduce((pre, current) => {
  let map = {}
  map[
    current.aliasModuleName
  ] = `${current.remoteModuleName}@${current.remoteUrl}${current.remoteFile}`
  return {
    ...pre,
    ...map,
  }
}, {})

const federationConfigs = {
  name: 'appReact',
  exposes: {
    './Entry': './src/Entry',
  },
  remotes,
}

const typingsConfigs = {
  typingsOutputDir: 'federation-typings',
}

module.exports = { federationConfigs, remotesConfigArr, typingsConfigs }
