import { join } from 'path'
import { Factory } from 'fbi'

import CommandBuild from './commands/build'
import CommandServe from './commands/serve'
import CommandLint from './commands/lint'
import CommandFormat from './commands/format'

import TemplateBase from './templates/base'
import TemplateVue from './templates/vue'
import TemplateReact from './templates/react'

export default class FactoryWeb extends Factory {
  id = require('../package.json').name
  description = 'factory for web application development'
  commands = [
    new CommandBuild(this),
    new CommandServe(this),
    new CommandLint(this),
    new CommandFormat(this)
  ]

  templates = [new TemplateVue(this), new TemplateReact(this)] as any

  execOpts: any = {
    cwd: process.cwd(),
    localDir: join(__dirname, '../'),
    preferLocal: true
  }
}

export { CommandBuild, CommandServe, TemplateBase, TemplateVue, TemplateReact }
