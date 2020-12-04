import { join } from 'path'
import { Factory } from 'fbi'

import CommandBuild from './commands/build'
import CommandServe from './commands/serve'

import TemplateVue from './templates/vue'
import TemplateReact from './templates/react'
import TemplateMicroMain from './templates/micro-main'
import TemplateMicroVue from './templates/micro-vue'

export default class FactoryWeb extends Factory {
  id = require('../package.json').name
  description = 'factory for web application development'
  commands = [new CommandBuild(this), new CommandServe(this)]
  templates = [
    new TemplateVue(this),
    new TemplateReact(this),
    new TemplateMicroMain(this),
    new TemplateMicroVue(this)
  ]

  execOpts: any = {
    cwd: process.cwd(),
    localDir: join(__dirname, '../'),
    preferLocal: true
  }
}
