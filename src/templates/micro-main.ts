import Factory from '..'
import BaseClass from './base'
import { utils } from 'fbi'

const { formatName } = utils

export default class TemplateMicroMain extends BaseClass {
  id = 'micro-main'
  path = 'templates/micro-main'
  description = 'template for Micro-fontends base application'
  templates = []

  constructor(public factory: Factory) {
    super(factory)
  }

  protected async gathering(flags: Record<string, any>) {
    const extraData = await this.prompt([
      {
        type: 'input',
        name: 'orgName',
        message: 'Organization name',
        initial({ enquirer }: any) {
          return ''
        },
        validate(value: any) {
          const name = formatName(value)
          return (name && true) || 'please input a valid organization name'
        }
      }
    ] as any)

    await super.gathering(flags)

    this.data.project = {
      ...this.data.project,
      ...extraData,
      features: { typescript: true }
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

    this.files.copy = this.files.copy?.concat(['public/*', 'src/*', 'tsconfig.json'])
    this.files.render = this.files.render?.concat(['micro-config.js'])
  }
}
