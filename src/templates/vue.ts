import { join } from 'path'
import Factory from '..'
import BaseClass from './base'

export default class TemplateVue extends BaseClass {
  id = 'vue'
  path = join(__dirname, '../../templates/vue')
  description = 'basic template for Vue.js application'
  templates = []
  features = [{ name: 'typescript', value: true }]

  constructor(public factory: Factory) {
    super(factory)
  }

  protected async gathering(flags: Record<string, any>) {
    await super.gathering(flags)
  }
}
