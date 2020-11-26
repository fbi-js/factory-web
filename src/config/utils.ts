function getAppConfig(path:any) {
  let appConfig:any = {}
  try {
    appConfig = require(path)
    // eslint-disable-next-line no-empty
  } catch {}
  const base = appConfig.base || ''
  const otherApps = appConfig.apps || []
  const selfApp = appConfig.selfApp || {}
  return {
    base,
    otherApps,
    selfApp,
  }
}

module.exports = {
  getAppConfig,
}
