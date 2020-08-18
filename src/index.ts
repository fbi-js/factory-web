import { Factory, Template } from 'fbi'
// import CommandBuild from './commands/build'
// import CommandWatch from './commands/watch'
import TemplateFactory from './templates/factory'

export default class FactoryFactory extends Factory {
  id = 'factory-web'
  description = 'factorty for fbi web development'
  // commands = [new CommandBuild(this), new CommandWatch(this)]
  templates: Template[] = [new TemplateFactory(this)]

  factoryMethod1() {
    this.log(`Factory: (${this.id})`, 'from factoryMethod1')
  }
}
