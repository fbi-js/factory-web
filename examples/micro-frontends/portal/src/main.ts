import axios from 'axios'
import { registerApplication, start } from 'single-spa'

import apps from './configs'
import { fullScreenLoadingHandle } from './loading'

function getConfigs() {
  const requests = apps.map((item) => {
    const urlInstance = new URL(item)
    const prefix = `${urlInstance.host}${urlInstance.pathname.slice(
      0,
      urlInstance.pathname.lastIndexOf('/') + 1,
    )}`

    return new Promise((resolve, reject) => {
      axios
        .get(item, {
          headers: { 'Cache-Control': 'no-cache' },
        })
        .then((r) => {
          const data = r?.data || {}
          resolve({
            ...data,
            url: `//${(prefix + data.entry).replace('//', '/')}`,
          })
        })
        .catch((e) => reject)
    })
  })
  return Promise.all(requests)
}

function setImportMap(configs) {
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
  head.appendChild(script)
}

function registerApps(configs) {
  for (const config of configs) {
    registerApplication({
      name: config.name,
      app: () => System.import(config.name),
      activeWhen: config.activeWhen,
    })
  }
}

fullScreenLoadingHandle()

getConfigs().then((configs) => {
  console.log({ configs })

  setImportMap(configs)

  registerApps(configs)

  start({
    urlRerouteOnly: true,
  })
})

export * from './helpers'
