const remotesConfigArr = [
  {
    aliasModuleName: 'appReact',
    remoteModuleName: 'appReact',
    remoteUrl: 'http://localhost:9091',
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
  name: 'layout',
  exposes: {
    './Layout': './src/App',
    './Header': './src/components/header/index',
  },
  remotes,
}

const typingsConfigs = {
  typingsOutputDir: 'federation-typings',
}

module.exports = { federationConfigs, remotesConfigArr, typingsConfigs }
