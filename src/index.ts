import { join } from 'path'
import { Factory } from 'fbi'
import CommandBuild from './commands/build'
import CommandServe from './commands/serve'
import TemplateFactory from './templates/factory'

export default class FactoryWeb extends Factory {
  id = 'factory-web'
  description = 'factorty for web factory development'
  commands = [new CommandBuild(this), new CommandServe(this)]
  templates = [new TemplateFactory(this)]

  execOpts: any = {
    cwd: process.cwd(),
    localDir: join(__dirname, '../'),
    preferLocal: true
  }
}
