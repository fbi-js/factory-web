const Axios = require('axios')
const fs = require('fs-extra')
const path = require('path')
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)
const { remotesConfigArr } = require('./federation.config')

async function fetchText(remoteUrl) {
  const response = await Axios({
    url: remoteUrl,
    method: 'GET',
  })
  return response.data
}
try {
  remotesConfigArr.forEach(async (item) => {
    const savePath = `src/${item.remoteTypesPath}`
    const resolveSavePath = resolveApp(path.join(savePath))
    if (!fs.existsSync(resolveSavePath)) {
      fs.createFileSync(resolveSavePath)
    }
    const text = await fetchText(
      `${item.remoteUrl}${item.remoteTypesPath}/${item.remoteModuleName}.d.ts`,
    )
    const reg = new RegExp(`${item.remoteModuleName}/`, 'g')
    const replacedText = text.replace(reg, `${item.aliasModuleName}/`)
    fs.writeFileSync(resolveSavePath, replacedText)
    console.log('\x1b[36m%s\x1b[0m', '==== Success! ====')
  })
} catch (e) {
  console.log(('Error:', e))
  process.exit(1)
}
