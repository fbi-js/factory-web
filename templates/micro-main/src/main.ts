import axios from 'templates/react/src/helpers/node_modules/axios'
import { registerApplication, start } from 'single-spa'
import { fullScreenLoadingHandle } from './loading'

async function loadConfigs(configs) {
  const result: Record<string, any>[] = []
  for (const item of configs) {
    const urlInstance = new URL(item)
    const prefix = `${urlInstance.host}${urlInstance.pathname.slice(
      0,
      urlInstance.pathname.lastIndexOf('/') + 1
    )}`

    try {
      const response = await axios.get(item, {
        headers: { 'Cache-Control': 'no-cache' }
      })
      const data = response?.data
      if (data) {
        result.push({
          ...data,
          url: `//${(prefix + data.entry).replace('//', '/')}`
        })
      }
    } catch (err) {
      continue
    }
  }
  return result
}

function setImportMap(config: any) {
  const configs = Array.isArray(config) ? config : [config]
  const script = document.createElement('script')
  script.type = 'systemjs-importmap'
  const content = `{
    "imports": {
      ${configs
        .map((item: any) => {
          return `"${item.name}": "${item.url}"`
        })
        .join(', ')}
    }
  }`
  script.textContent = content
  const head = document.getElementsByTagName('head').item(0)
  head?.appendChild(script)
}

async function loadApps(apps: any[]) {
  const configs = await loadConfigs(apps)
  if (!configs || configs.length < 1) {
    return
  }
  setImportMap(configs)

  for (const app of configs) {
    registerApplication<{}>({
      name: app.name,
      app: () => System.import(app.name),
      activeWhen: app.activeWhen
    })
  }
}

function run(configs: any) {
  fullScreenLoadingHandle()

  const baseConfigs = configs.base
  const appsConfigs = configs.apps

  if (baseConfigs && baseConfigs.length > 0) {
    window.addEventListener('single-spa:first-mount', () => {
      loadApps(appsConfigs)
    })

    return loadApps(baseConfigs).finally(() => {
      start({
        urlRerouteOnly: true
      })
    })
  } else {
    return loadApps(appsConfigs).finally(() => {
      start({
        urlRerouteOnly: true
      })
    })
  }
}

if (!process.env.MICRO_MODE || process.env.MICRO_MODE === '') {
  run(require('./configs').default)
}

export { run }

export * from './helpers'
