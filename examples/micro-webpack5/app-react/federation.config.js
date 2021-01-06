const remotesConfigArr = [
  {
    aliasModuleName: 'mainApp',
    remoteModuleName: 'layout',
    remoteUrl: 'http://localhost:9090',
    remoteFile: '/remoteEntry.js',
    remoteTypesPath: `/federation-typings/layout.d.ts`,
  },
]

const remotes = remotesConfigArr.reduce((pre, current) => {
  let map = {}
  // {
  //   mainApp: 'layout@http://localhost:9090/remoteEntry.js',
  // }
  map[
    current.aliasModuleName
  ] = `${current.remoteModuleName}@${current.remoteUrl}${current.remoteFile}`
  return {
    ...pre,
    ...map,
  }
}, {})

module.exports = {
  remotes,
  remotesConfigArr,
}
