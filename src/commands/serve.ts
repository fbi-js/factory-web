import { timeStamp } from 'console'
import { Command } from 'fbi'
import Factory from '..'
import { REACT_GRAPHQL_FEATURE_ID, REACT_STR, REACT_TEMPLATE_ID } from '../const'
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
      stdio: 'inherit'
    }
    this.clear()
    const projectInfo = this.configStore.get('projectInfo')
    if (projectInfo.templateId === REACT_TEMPLATE_ID) {
      await runReactStartScript()
    } else {
    }
    //
    // if (templateInfo.id !== REACT_GRAPHQL_FEATURE_ID) {
    //   // await run()
    // } else {
    //   await this.exec.command('vite', execOpts)
    // }
  }
}
