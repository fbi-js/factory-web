import { join } from 'path'
import { Factory } from 'fbi'
import CommandBuild from './commands/build'
import CommandServe from './commands/serve'
import TemplateVue from './templates/vue'
import TemplateReact from './templates/react'

export default class FactoryWeb extends Factory {
  id = 'factory-web'
  description = 'factorty for web factory development'
  commands = [new CommandBuild(this), new CommandServe(this)]
  templates = [new TemplateVue(this),new TemplateReact(this)]

  execOpts: any = {
    cwd: process.cwd(),
    localDir: join(__dirname, '../'),
    preferLocal: true
  }
}
