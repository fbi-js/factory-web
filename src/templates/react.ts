import { join } from 'path'
import Factory from '..'
import BaseClass from './base'
export default class TemplateReact extends BaseClass {
  id = 'react'
  path = join(__dirname, '../../templates/react')
  description = 'basic template for React.js application'
  templates = []
  features = [{ name: 'typescript', value: true }]
  rule: any = {
    glob: '**/*',
    ignores: [] // examples: 'src/test/test.ts', 'src/test/test.*', 'src/test*'
  }

  constructor(public factory: Factory) {
    super(factory)
  }

  protected async gathering(flags: Record<string, any>) {
    await super.gathering(flags)
    this.rule.ignores = ['src/test*']
  }

  protected async writing() {
    await super.writing()
  }
}
