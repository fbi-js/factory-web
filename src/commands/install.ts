import { Command, utils } from 'fbi'

import Factory from '..'

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
    if (!template) {
      return
    }

    let deps

    try {
      const config = require(`../config/${template}`)
      deps = config.deps
    } catch (err) {}

    if (!deps) {
      return
    }

    const depsArr = Object.entries(deps).map(([name, version]) => `${name}@${version}`)

    if (!isValidObject(deps)) {
      return
    }

    const pm = this.context.get('config').packageManager
    const cmds = [pm, pm === 'yarn' ? 'add' : 'install', '-D', ...depsArr]

    this.logStart(`${cmds.join(' ')}...`)

    try {
      await this.exec(cmds[0], cmds.slice(1).filter(Boolean), {
        stdout: 'inherit',
        cwd: process.cwd()
      })
      this.logEnd(`Installed successfully`)
    } catch (error) {
      this.error(error).exit()
    }
  }
}
