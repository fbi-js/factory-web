import { IFactoryConfig, IFactoryPaths } from '../types'
import { Command } from 'fbi'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import Factory from '..'
import { HOST, PORT } from '../configs/constant/defaults'
import { resolveWebpackConfig } from '../configs'
import { assertFactoryTemplate } from '../helpers/assert'

export default class CommandServe extends Command {
  id = 'serve'
  alias = 's'
  description = 'launch the development server'
  args = ''
  flags = [
    [
      '-m, --mode <mode>',
      'specify env mode(development|production|testing)',
      'development'
    ],
    ['-p, --port <port>', 'webapck dev-serve port', PORT],
    ['--micro-mode <mode>', '""|fuse', '']
  ]

  constructor(public factory: Factory) {
    super()
  }

  public async run(flags: any, unknown: any) {
    process.env.NODE_ENV = flags.mode ?? 'development'
    process.env.MICRO_MODE = flags.microMode ?? ''

    this.debug(
      `Factory: (${this.factory.id})`,
      'from command',
      `"${this.id}"`,
      'flags:',
      flags,
      'unknown:',
      unknown
    )

    const factory: IFactoryConfig = this.context.get('config.factory')
    const paths: IFactoryPaths = this.context.get('config.paths')

    this.logStart('Starting development server...')
    try {
      assertFactoryTemplate(factory)
      const config = await resolveWebpackConfig(factory.template, {
        ...flags,
        factory,
        paths
      })
      const compiler = webpack(config)
      const host = config.devServer?.host || HOST
      const port = flags?.port || config.devServer?.port
      const server = new WebpackDevServer(compiler, {
        ...config.devServer,
        host,
        port
      })

      return new Promise((resolve, reject) => {
        const localUrl = `http://${host}:${port}`

        resolve({
          server,
          url: localUrl
        })

        server.listen(port, host, (err) => {
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
