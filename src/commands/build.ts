import type { Configuration } from 'webpack'

import Factory from '..'
import { Command } from 'fbi'
import webpack from 'webpack'
import webpackConfig from '../config'

export default class CommandBuild extends Command {
  id = 'build'
  alias = 'b'
  description = 'command build description'
  args = ''
  flags = [
    ['-m, --mode <mode>', 'specify env mode(development|production|testing)', 'production'],
    ['-d, --dev-dependencies', 'with devDependencies', false]
  ]

  constructor(public factory: Factory) {
    super()
  }

  public async run(flags: any, unknown: any) {
    process.env.NODE_ENV = flags.mode ?? 'production'

    this.debug(
      `Factory: (${this.factory.id})`,
      'from command',
      `"${this.id}"`,
      'flags:',
      flags,
      'unknown:',
      unknown
    )

    this.logStart(`Start building:`)
    const template = this.context.get('config.factory.template')
    const config = await webpackConfig(template, {
      env: process.env.NODE_ENV
    })
    try {
      await this.build(config)
    } catch (err) {
      this.error('Failed to build project')
      // this.error(err).exit()
      console.log(err)
      this.exit()
    }
  }

  protected build(config: Configuration) {
    const compiler = webpack(config)

    return new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) {
          console.error(err.stack || err)
          if ((err as any).details) {
            console.error((err as any).details)
          }
          reject()
        }

        const formatStats = stats?.toString({
          chunks: false, // Makes the build much quieter
          colors: true // Shows colors in the console
        })

        console.log(formatStats)

        resolve(formatStats)
      })
    })
  }
}
