import Factory from '..'
import BaseClass from './base'

export default class TemplateReact extends BaseClass {
  id = 'react'
  path = 'templates/react'
  description = 'template for React.js application'
  templates = []

  constructor(public factory: Factory) {
    super(factory)
  }

  protected async gathering(flags: Record<string, any>) {
    await super.gathering(flags)

    const extraData = await this.prompt([
      {
        type: 'MultiSelect',
        name: 'features',
        message: `Choose features for your project:`,
        hint: '(Use <space> to select, <return> to submit)',
        choices: [{ name: 'typescript', value: true }],
        result(names: string[]) {
          return this.map(names)
        }
      }
    ] as any)

    this.data.project = {
      ...this.data.project,
      ...extraData
    }

    const { factory, project } = this.data
    this.spinner = this.createSpinner(`Creating project...`).start(
      `Creating ${this.style.bold.green(project.name)} via ${factory.id} from ${
        factory.template
      }...`
    )
  }

  protected async writing() {
    const isTs = this.data.project?.features?.typescript
    await super.writing()

    this.files.copy = (this.files.copy || []).concat(
      [
        'public/*',
        isTs ? 'tsconfig.json' : '',
        {
          from: isTs ? 'src-ts/*' : 'src/*',
          to: `src`
        }
      ].filter(Boolean)
    )
    this.files.render = (this.files.render || []).concat({
      from: isTs ? 'src-ts/main.ts' : 'src/main.js',
      to: `src/main.${isTs ? 'ts' : 'js'}`
    })
  }
}
