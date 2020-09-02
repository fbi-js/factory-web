import { join } from 'path'
import { Factory } from 'fbi'
import CommandBuild from './commands/build'
import CommandServe from './commands/serve'
import TemplateVue from './templates/vue'
import TemplateReact from './templates/react'
import TemplateVue3 from './templates/vue3'

export default class FactoryWeb extends Factory {
  id = 'factory-web'
  description = 'factory for web factory development'
  commands = [new CommandBuild(this), new CommandServe(this)]
  templates = [new TemplateVue(this), new TemplateReact(this), new TemplateVue3(this)]

  execOpts: any = {
    cwd: process.cwd(),
    localDir: join(__dirname, '../'),
    preferLocal: true
  }
}
