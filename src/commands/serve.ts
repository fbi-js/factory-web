import type { Stats } from 'webpack'

import Factory from '..'
import { Command } from 'fbi'

import webpack from 'webpack'
import webpackConfig from '../config'
import WebpackDevServer from 'webpack-dev-server'
import { getIpAddress } from '../config/helpers/utils'
import { WEBPACK_DEV_CONFIG, HOST, PORT } from '../config/defaults'

export default class CommandServe extends Command {
  id = 'serve'
  alias = 's'
  description = 'start development server'
  args = ''
  flags = [
    ['-m, --mode <mode>', 'specify env mode(development|production|testing)', 'development'],
    ['-e, --env <env>', 'customer env mode(development|production)', 'development'],
    ['-p, --port <port>', 'webapck dev-serve port', PORT],
    ['-entry, --entry <entry>', 'entry type(self|app-entry)', 'self']
  ]

  constructor(public factory: Factory) {
    super()
  }

  public async run(flags: any, unknown: any) {
    process.env.NODE_ENV = flags.mode ?? 'development'

    this.debug(
      `Factory: (${this.factory.id})`,
      'from command',
      `"${this.id}"`,
      'flags:',
      flags,
      'unknown:',
      unknown
    )

    const factory = this.context.get('config.factory')
    const template = this.context.get('config.factory.template')
    const isProduction = process.env.NODE_ENV === 'production'

    this.logStart(`Starting development server:`)
    try {
      const config = await webpackConfig(factory.template, {
        port: flags.port,
        mode: flags.mode,
        startEntry: flags.entry,
        cosEnv: flags.env,
        factory
      })

      const compiler = webpack(config)
      // TODO: merge user config
      const server = new WebpackDevServer(compiler, {
        ...WEBPACK_DEV_CONFIG,
        writeToDisk: template === 'micro-vue'
      })

      return new Promise((resolve, reject) => {
        const localUrl = `http://localhost:${flags.port}`
        const networkUrl = `http://${getIpAddress()}:${flags.port}`

        compiler.hooks.done.tap('fbi-serve-compiler', async (stats: Stats) => {
          console.log(stats?.toString(config.stats))

          if (stats.hasErrors()) {
            return
          }

          console.log()
          console.log(`  App running at:`)
          console.log(`  - Local:   ${this.style.cyan(localUrl)}`)
          console.log(`  - Network: ${this.style.cyan(networkUrl)}`)
          console.log()
          if (!isProduction) {
            const buildCommand = `npm run build`
            console.log(`  Note that the development build is not optimized.`)
            console.log(`  To create a production build, run ${this.style.cyan(buildCommand)}.`)
          }
        })

        resolve({
          server,
          url: localUrl
        })

        server.listen(flags.port, HOST, (err) => {
          if (err) {
            reject(err)
          }
        })
      })
    } catch (err) {
      this.error('Failed to start development server')
      this.error(err).exit()
    }
  }
}
