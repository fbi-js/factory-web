import { join } from 'path'
import Factory from '..'
import BaseClass from './base'

export default class TemplateReact extends BaseClass {
  id = 'react-basic'
  path = join(__dirname, '../../templates/react-basic')
  description = 'template for React.js application'
  templates = []
  features = [{ name: 'typescript', value: true }]

  constructor(public factory: Factory) {
    super(factory)
  }

  protected async gathering(flags: Record<string, any>) {
    await super.gathering(flags)
  }

  protected async writing() {
    await super.writing()
  }
}
