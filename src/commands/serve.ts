import Factory from '..'
import { Command } from 'fbi'

import webpack from 'webpack'
import webpackConfig from '../config'
import DevServer from 'webpack-dev-server'
import { IConfigOption } from '../config/utils'

export default class CommandServe extends Command {
  id = 'serve'
  alias = 's'
  description = 'start development server'
  args = ''
  flags = [['-m, --mode <mode>', 'specify env mode(development|production|testing)', 'development'],
  ['-e, --env <env>', 'customer env mode(development|production)', 'development'],
  ['-p, --port <port>', 'webapck dev-serve port', 8080],
  ['-entry, --entry <entry>', 'entry type(self|app-entry)', 'self']]

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
    const template = this.context.get('config.factory.template')

    this.logStart(`Starting development server:`)
    try {
      const config = webpackConfig(template, {
        port:flags.port,
        mode:flags.mode,
        startEntry:flags.entry,
        cosEnv:flags.env,
      } as IConfigOption)
      const compiler = webpack(config)
      const server = new DevServer(compiler, {
        historyApiFallback: true,
        compress: true,
        noInfo: true,
        open: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': '*',
        },
        disableHostCheck: true
      })
      server.listen(flags.port,'localhost', (err) => {
        if (err) {
          throw err
        }
      })
    } catch (err) {
      this.error('Failed to start development server')
      this.error(err).exit()
    }
  }
}
