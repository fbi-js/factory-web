import Factory from '..'
import TemplateReact from './react'

export default class TemplateMicroVue extends TemplateReact {
  id = 'micro-react'
  path = 'templates/react'
  description = 'template for Micro-fontends react application'
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
}
