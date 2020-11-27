/* eslint-disable no-restricted-properties */
import { registerApplication, start } from 'single-spa'
import { renderBeforeHooks } from './init'
import { appendScriptAndRender } from './queryEnteryFile'
import { fullScreenLoadingHandle } from './loading'

function importAllDeps() {
  return Promise.all([System.import('single-spa')])
}

function registerApp(appName: string, activeWhen: any) {
  registerApplication({
    name: appName,
    /* eslint-disable no-restricted-properties */
    app: () => System.import(appName),
    activeWhen,
  })
}

function startApps() {
  registerApp('@project-name/app-react', ['/'])
  start({
    urlRerouteOnly: true,
  })
}

export function run() {
  fullScreenLoadingHandle()
  /**
   * 执行钩子函数
   */
  Promise.all([renderBeforeHooks(), importAllDeps()]).finally(() => {
    appendScriptAndRender().then(() => {
      startApps()
    })
  })
}
