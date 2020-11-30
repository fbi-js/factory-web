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
function getRunPwd(){
  return process.cwd()
}

function guid() {
  return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
module.exports = {
  getAppConfig,
  getRunPwd,
  guid
}

export interface IConfigOption{
  title:string
  port?:number
  mode?:string
  cosEnv:string
  startEntry:string
}
