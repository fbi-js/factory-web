import { Command } from 'fbi'
import { IFactoryConfig } from '../types'
import Factory from '..'

export default class CommandFormat extends Command {
  id = 'format'
  alias = 'f'
  description = 'format code with prettier and eslint --fix'
  args = ''
  flags = []

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

    this.logStart('Formatting code...')

    const factory: IFactoryConfig = this.context.get('config.factory')

    try {
      await this.formatWithPrettier()
      await this.formatWithEslint(factory)
      this.logEnd('Formatted successfully')
    } catch (err) {
      const msg = this.catchFatalErrors(err)
      if (msg) {
        this.error(msg).exit()
      }
    }
  }

  protected formatWithPrettier() {
    const cmd = 'npx prettier "src" --write --ignore-unknown --loglevel warn'
    this.logItem(cmd)
    return this.exec.command(cmd, {
      stdio: 'inherit',
      shell: true
    })
  }

  protected formatWithEslint(config: IFactoryConfig) {
    const exts = this.getFileExts(config)
    const cmd = `npx eslint --ext ${exts.join(',')} src --fix`
    this.logItem(cmd)
    return this.exec.command(cmd, {
      stdio: 'inherit'
    })
  }

  protected getFileExts(factory: IFactoryConfig) {
    return ['js', 'jsx']
      .concat(factory.features?.typescript ? ['ts', 'tsx'] : [])
      .concat(factory.template === 'vue' ? ['vue'] : [])
  }

  protected catchFatalErrors(err: any) {
    // https://prettier.io/docs/en/cli.html#exit-codes
    // https://eslint.org/docs/user-guide/migrating-to-5.0.0#fatal-errors-now-result-in-an-exit-code-of-2
    if (err?.exitCode === 2) {
      return err.message
    }

    return ''
  }
}
