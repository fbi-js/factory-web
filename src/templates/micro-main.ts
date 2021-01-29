import { join } from 'path'
import Factory from '..'
import BaseClass from './base'

export default class TemplateMicroMain extends BaseClass {
  id = 'micro-main'
  path = join(__dirname, '../../templates/micro-main')
  description = 'template for Micro-fontends base application'
  templates = []

  constructor(public factory: Factory) {
    super(factory)
  }

  protected async gathering(flags: Record<string, any>) {
    await super.gathering(flags)

    this.data.project = {
      ...this.data.project,
      isMicro: true,
      features: {
        ...this.data.project.features,
        typescript: true
      }
    }

    const { factory, project } = this.data
    this.spinner = this.createSpinner('Creating project...').start(
      `Creating ${this.style.bold.green(project.name)} via ${factory.id} from ${
        factory.template
      }...`
    )
  }
}
