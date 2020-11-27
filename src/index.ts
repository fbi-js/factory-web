import { join } from 'path'
import { Factory } from 'fbi'

import CommandBuild from './commands/build'
import CommandServe from './commands/serve'
import CommandInstall from './commands/install'

import TemplateVue from './templates/vue'
import TemplateReact from './templates/react'
import TemplateMicroMain from './templates/micro-main'

export default class FactoryWeb extends Factory {
  id = '@fbi-js/factory-web'
  description = 'factory for web application development'
  commands = [new CommandBuild(this), new CommandServe(this), new CommandInstall(this)]
  templates = [new TemplateVue(this), new TemplateReact(this), new TemplateMicroMain(this)]

  execOpts: any = {
    cwd: process.cwd(),
    localDir: join(__dirname, '../'),
    preferLocal: true
  }
}
