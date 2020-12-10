import type { Configuration } from 'webpack'

import webpack from 'webpack'
import { Command } from 'fbi'
import { IFactoryConfig, IFactoryPaths } from '../types'
import Factory from '..'
import { resolveWebpackConfig } from '../config'

export default class CommandBuild extends Command {
  id = 'build'
  alias = 'b'
  description = 'command build description'
  args = ''
  flags = [
    ['-m, --mode <mode>', 'specify env mode(development|production|testing)', 'production'],
    ['--micro-mode <mode>', '""|fuse', '']
  ]

  constructor(public factory: Factory) {
    super()
  }

  public async run(flags: any, unknown: any) {
    process.env.NODE_ENV = flags.mode ?? 'production'
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

    this.logStart(`Building for production...`)

    const factory: IFactoryConfig = this.context.get('config.factory')
    const paths: IFactoryPaths = this.context.get('config.paths')

    const config = await resolveWebpackConfig(factory.template, {
      ...flags,
      factory,
      paths
    })

    try {
      await this.build(config)
    } catch (err) {
      this.error('Failed to build project')
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

        console.log(stats?.toString(config.stats))

        resolve('')
      })
    })
  }
}
