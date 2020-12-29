import { join } from 'path'
import Factory from '..'
import TemplateReact from './react'

export default class TemplateMicroReact extends TemplateReact {
  id = 'micro-react'
  path = join(__dirname, '../../templates/react')
  description = 'template for Micro-fontends react application'
  templates = []
  features = [{ name: 'typescript', value: true }]

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
