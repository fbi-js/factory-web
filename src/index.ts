import { join } from 'path'
import { Factory } from 'fbi'
import CommandBuild from './commands/build'
import CommandServe from './commands/serve'
import TemplateWeb from './templates'

export default class FactoryWeb extends Factory {
  id = 'factory-web'
  description = 'factory for web factory development'
  commands = [new CommandBuild(this), new CommandServe(this)]
  templates = [new TemplateWeb(this)]

  execOpts: any = {
    cwd: process.cwd(),
    localDir: join(__dirname, '../'),
    preferLocal: true
  }
}
