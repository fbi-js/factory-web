import Factory from '..'
import * as ejs from 'ejs'
import { join } from 'path'
import { Template, utils } from 'fbi'

const { formatName, isValidObject } = utils

export default class TemplateWebBase extends Template {
  id = 'web-base'
  renderer = ejs.render

  constructor(public factory: Factory) {
    super()
  }

  protected async gathering(flags: Record<string, any>) {
    const defaultName = (this.data.project && this.data.project.name) || 'project-demo'

    this.data.project = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Project name',
        initial({ enquirer }: any) {
          return defaultName
        },
        validate(value: any) {
          const name = formatName(value)
          return (name && true) || 'please input a valid project name'
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Project description',
        initial({ state }: any) {
          return `${state.answers.name} description`
        }
      }
    ] as any)
  }

  protected async writing() {
    const debug = !!this.context.get('debug')

    this.files = {
      copy: [
        '.gitignore',
        '.editorconfig',
        '.eslintignore',
        '.prettierignore',
        '.prettierrc.js',
        '.stylelintrc.js',
        'postcss.config.js'
      ],
      render: ['package.json', 'webpack.config.js', '.babelrc', '.eslintrc.js', 'README.md'],
      renderOptions: {
        async: true,
        debug,
        compileDebug: debug
      }
    }
  }

  protected async installing(flags: Record<string, any>) {
    const { project } = this.data
    this.spinner.succeed(`Created project ${this.style.cyan.bold(project.name)}`)

    const { dependencies, devDependencies } = require(join(this.targetDir, 'package.json'))
    if (isValidObject(dependencies) || isValidObject(devDependencies)) {
      const installSpinner = this.createSpinner(`Installing dependencies...`).start()
      try {
        await this.installDeps(this.targetDir, flags.packageManager, false)
        installSpinner.succeed(`Installed dependencies`)
      } catch (err) {
        installSpinner.fail('Failed to install dependencies. You can install them manually.')
        this.error(err)
      }
    }
  }

  protected async ending() {
    const { project } = this.data
    const projectName = this.style.cyan.bold(project.name)
    if (this.errors) {
      this.spinner.fail(`Failed to created project ${projectName}.`)
      this.error(this.errors)
    }

    console.log(`
Next steps:
  $ ${this.style.cyan('cd ' + project.name)}`)

    console.log(`
  $ ${this.style.cyan('npm run dev')} ${this.style.dim('launch the serve')}`)

    console.log(`
  $ ${this.style.cyan('npm run build')} ${this.style.dim('build project')}`)
  }
}
