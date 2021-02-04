import { join } from 'path'
import Factory from '..'
import BaseClass from './base'

export default class TemplateReact extends BaseClass {
  id = 'react'
  path = join(__dirname, '../../templates/react')
  description = 'template for React.js application'
  templates = []
  features = [
    { name: 'typescript', value: true },
    {
      name: 'admin',
      value: true,
      hint: 'antd, axios, basic components(layout, menu, breadcrumb, topbar)'
    }
  ]

  constructor(public factory: Factory) {
    super(factory)
  }

  protected async gathering(flags: Record<string, any>) {
    await super.gathering(flags)
    // const { factory, project } = this.data
    // this.spinner = this.createSpinner('Creating project...').start(
    //   `Creating ${this.style.bold.green(project.name)} via ${factory.id} from ${
    //     factory.template
    //   }...`
    // )
  }

  protected async writing() {
    await super.writing()
  }
}
