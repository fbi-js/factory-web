import { join } from 'path'
import Factory from '..'
import BaseClass from './base'

export default class TemplateMiniProgram extends BaseClass {
  id = 'mini-program'
  path = join(__dirname, '../../templates/mini-program')
  description = 'template for mini-program application by use taro'
  templates = []
  features = []
  copyFiles = ['.gitignore', '.editorconfig', '.prettierignore', 'babel.config.js', 'config/*']
  renderFiles = [
    'babel.config.js',
    'global.d.ts',
    'package.json',
    'project.config.json',
    'README.md',
    'tsconfig.json'
  ]
  renderFileTypes = 'js,jsx,ts,tsx,css,scss,sass,less,md,vue,html'

  constructor (public factory: Factory) {
    super(factory)
  }

  protected async gathering (flags: Record<string, any>) {
    await super.gathering(flags)

    const { factory, project } = this.data
    this.spinner = this.createSpinner('Creating project...').start(
      `Creating ${this.style.bold.green(project.name)} via ${factory.id} from ${
        factory.template
      }...`
    )
  }

  protected async writing () {
    await super.writing()
  }
}
