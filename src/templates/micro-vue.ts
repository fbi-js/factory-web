import Factory from '..'
import TemplateVue from './vue'

export default class TemplateMicroVue extends TemplateVue {
  id = 'micro-vue'
  path = 'templates/vue'
  description = 'template for Micro-fontends vue application'
  templates = []

  constructor(public factory: Factory) {
    super(factory)
  }

  protected async gathering(flags: Record<string, any>) {
    await super.gathering(flags)

    this.data.project = {
      ...this.data.project,
      isMicro: true
    }
  }

  protected async writing() {
    await super.writing()

    this.files.copy = (this.files.copy || []).concat('micro-app.json')
  }
}
