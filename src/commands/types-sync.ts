import { Command } from 'fbi'
import Factory from '..'
import fetch from 'node-fetch'
export default class CommandTypesSync extends Command {
  id = 'ts-sync'
  alias = 'tss'
  description =
    'sync typing files from webpack5 module-faderation remotes modules'

  args = ''
  flags = []

  constructor(public factory: Factory) {
    super()
  }

  public async run(flags: any, unknown: any) {
    this.debug(
      `Factory: (${this.factory.id})`,
      'from command',
      `"${this.id}"`,
      'flags:',
      flags,
      'unknown:',
      unknown
    )

    this.logStart('Sync typings...')

    try {
      await this.sync()
    } catch (err) {
      this.error('Failed to Sync typings')
      this.error(err).exit()
    }
  }

  protected sync() {
    const fs = require('fs-extra')
    const path = require('path')
    const appDirectory = fs.realpathSync(process.cwd())
    const resolveApp = (relativePath: string) =>
      path.resolve(appDirectory, relativePath)
    const { remotesConfigArr } = require(resolveApp('federation.config'))

    async function fetchText(remoteUrl: string) {
      const text = await (await fetch(remoteUrl)).text()
      return text
    }
    remotesConfigArr.forEach(
      async (item: {
        remoteTypesPath: string
        remoteUrl: string
        remoteModuleName: string
        aliasModuleName: string
      }) => {
        const folderPath = `src/${item.remoteTypesPath}`
        const savePath = `${folderPath}/${item.remoteModuleName}.d.ts`
        const resolveSavePath = resolveApp(path.join(savePath))
        console.log(resolveSavePath)
        if (!fs.existsSync(resolveSavePath)) {
          fs.mkdirSync(resolveApp(folderPath))
          fs.createFileSync(resolveSavePath)
        }
        const text = await fetchText(
          `${item.remoteUrl}${item.remoteTypesPath}/${item.remoteModuleName}.d.ts`
        )
        const reg = new RegExp(`${item.remoteModuleName}/`, 'g')
        const replacedText = text.replace(reg, `${item.aliasModuleName}/`)
        fs.writeFileSync(resolveSavePath, replacedText)
        console.log('\x1b[36m%s\x1b[0m', '==== Success! ====')
      }
    )
  }
}
