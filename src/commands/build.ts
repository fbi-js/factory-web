import { join } from 'path'
import { Command, utils } from 'fbi'
import Factory from '..'
import { REACT_TEMPLATE_ID, MICRO_TEMPLATE_ID } from '../const'
const runReactBuildScript = require('./react/scripts/build.js')

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

    const _cwd = process.cwd()
    const distDirName = 'dist'
    const distDir = join(_cwd, distDirName)
    // const srcDir = join(_cwd, tsconifg.compilerOptions.rootDir||'src')

    this.logStart(`Start building:`)
    this.logItem(`remove '${distDirName}'...`)
    await this.fs.remove(distDir)

    const execOpts: any = {
      ...this.factory.execOpts,
      stdio: flags.debug ? 'inherit' : 'pipe',
      env: {
        BUILD_ENV: flags.mode ?? 'development'
      }
    }
    const templateId = this.context.get('config.factory.template')
    try {
      const buildSpinner = this.createSpinner(`building...`).start()
      if (templateId === REACT_TEMPLATE_ID) {
        await runReactBuildScript()
      } else if (templateId === MICRO_TEMPLATE_ID) {
        await this.exec.command('umi build', execOpts)
        buildSpinner.succeed()
      }
    } catch (err) {
      this.error('Failed to build project')
      this.error(err).exit()
    }
  }
}
