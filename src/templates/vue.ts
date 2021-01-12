import { join } from 'path'
import Factory from '..'
import BaseClass from './base'

export default class TemplateVue extends BaseClass {
  id = 'vue'
  path = join(__dirname, '../../templates/vue')
  description = 'template for Vue.js application'
  templates = []
  features = [{ name: 'typescript', value: true }]

  constructor (public factory: Factory) {
    super(factory)
  }

  protected async gathering (flags: Record<string, any>) {
    await super.gathering(flags)

    const { factory, project } = this.data
    this.spinner = this.createSpinner('Creating project...').start(
      `Creating ${this.style.bold.green(project.name)} via ${factory.id} from ${
        factory.template
      }...`
    )
  }
}
