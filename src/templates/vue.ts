import Factory from '..'
import BaseClass from './base'
import { Template, utils } from 'fbi'

export default class TemplateVue extends BaseClass {
  id = 'vue'
  path = 'templates/vue'

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
    await super.writing()

    this.files.copy = this.files.copy?.concat(['public/*', 'src/*'])
  }
}
