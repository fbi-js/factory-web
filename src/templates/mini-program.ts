import { join } from 'path'
import Factory from '..'
import BaseClass from './base'

export default class TemplateMiniProgram extends BaseClass {
  id = 'mini-program'
  path = join(__dirname, '../../templates/mini-program')
  description = 'template for mini-program application by use taro'
  templates = []
  features = []

  constructor(public factory: Factory) {
    super(factory)
  }

  protected async gathering(flags: Record<string, any>) {
    await super.gathering(flags)

    const { factory, project } = this.data
    this.spinner = this.createSpinner('Creating project...').start(
      `Creating ${this.style.bold.green(project.name)} via ${factory.id} from ${
        factory.template
      }...`
    )
  }

  protected async writing() {
    await super.writing()
  }
}
