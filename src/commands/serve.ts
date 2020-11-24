import Factory from '..'
import { Command } from 'fbi'

import DevServer from 'webpack-dev-server'
import webpack from 'webpack'
import webpackConfig from '../config'

export default class CommandServe extends Command {
  id = 'serve'
  alias = 's'
  description = 'start development server'
  args = ''
  flags = [['-m, --mode <mode>', 'specify env mode(development|production|testing)', 'development']]

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
        env: process.env.NODE_ENV
      })
      console.log(config?.module?.rules)
      console.log(config?.plugins)
      const compiler = webpack(config)
      const server = new DevServer(compiler, {})

      server.listen(8080, 'localhost', (err) => {
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
