import { timeStamp } from 'console'
import { Command } from 'fbi'
import Factory from '..'
import { REACT_TEMPLATE_ID, MICRO_TEMPLATE_ID } from '../const'
const runReactStartScript = require('./react/scripts/start.js')

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
    const start = Date.now()

    this.debug(
      `Factory: (${this.factory.id})`,
      'from command',
      `"${this.id}"`,
      'flags:',
      flags,
      'unknown:',
      unknown
    )

    this.logStart(`Starting development server:`)
    const execOpts: any = {
      ...this.factory.execOpts,
      stdio: 'inherit',
      env: {
        BUILD_ENV: flags.mode ?? 'development'
      }
    }
    const templateId = this.context.get('config.factory.template')
    try {
      if (templateId === REACT_TEMPLATE_ID) {
        await runReactStartScript()
      } else if (templateId === MICRO_TEMPLATE_ID) {
        await this.exec.command(`umi dev`, execOpts)
      }
    } catch (err) {
      this.error('Failed to build project')
      this.error(err).exit()
    }
  }
}
