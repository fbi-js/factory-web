import Factory from '..'
import { Command, utils } from 'fbi'

const { isValidObject } = utils

export default class CommandInstall extends Command {
  id = 'install'
  alias = 'i'
  description = 'install deps'
  args = ''
  flags = []

  constructor(public factory: Factory) {
    super()
  }

  public async run(flags: any, unknown: any) {
    const template = this.context.get('config.factory.template')
    const { deps } = require(`../config/${template}`)
    const depsArr = Object.entries(deps).map(([name, version]) => `${name}@${version}`)

    if (isValidObject(deps)) {
      const pm = this.context.get('config').packageManager

      let cmds = [pm, 'install', '--no-save']

      // pnpm: Headless installation requires a pnpm-lock.yaml file
      cmds.push(pm === 'npm' ? '--no-package-lock' : pm === 'yarn' ? '--no-lockfile' : '')

      cmds = cmds.concat(depsArr)

      console.log(cmds)

      await this.exec(cmds[0], cmds.slice(1).filter(Boolean), {
        stdout: 'inherit',
        cwd: process.cwd()
      })
    }
  }
}
