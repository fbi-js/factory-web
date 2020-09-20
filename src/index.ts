import { join } from 'path'
import { Factory } from 'fbi'
import CommandBuild from './commands/build'
import CommandServe from './commands/serve'
import TemplateReact from './templates/react'
import TemplateMicro from './templates/micro'

export default class FactoryWeb extends Factory {
  id = 'factory-web'
  description = 'factory for web factory development'
  commands = [new CommandBuild(this), new CommandServe(this)]
  templates = [new TemplateMicro(this), new TemplateReact(this)]

  execOpts: any = {
    cwd: process.cwd(),
    localDir: join(__dirname, '../'),
    preferLocal: true
  }
}
