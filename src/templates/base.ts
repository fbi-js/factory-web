import Factory from '..'
import * as ejs from 'ejs'
import { join } from 'path'
import { Template, utils } from 'fbi'

const { formatName, isValidObject } = utils
const { version } = require('../../package.json')

export default class TemplateWebBase extends Template {
  id = 'web-base'
  renderer = ejs.render
  features: any[] = []
  copyFileTypes = 'jpg,png,gif,svg,mp4,mp3,webm,ogg,wav,flac,aac'
  copyFiles = [
    '.gitignore',
    '.editorconfig',
    '.prettierignore',
    'public/*',
    '.vscode/*'
  ]
  renderFileTypes = 'js,jsx,ts,tsx,css,scss,sass,less,md,vue'
  renderFiles = ['package.json', 'webpack.config.js', 'README.md']

  constructor(public factory: Factory) {
    super(factory)
  }

  protected async gathering(flags: Record<string, any>) {
    const defaultName = this.data.project?.name ?? 'project-demo'
    const isMicro = this.id.startsWith('micro-')

    this.data.factoryVersion = version

    this.data.project = await this.prompt([
      ...(isMicro
        ? [
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
          ]
        : []),
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
      },
      ...(this.features.length > 0
        ? [
            {
              type: 'MultiSelect',
              name: 'features',
              message: `Choose features for your project:`,
              hint: '(Use <space> to select, <return> to submit)',
              choices: this.features,
              result(names: string[]) {
                return this.map(names)
              }
            }
          ]
        : [])
    ] as any)
  }

  private getCopyFiles() {
    const isTs = this.data.project?.features?.typescript
    const srcFolder = `src${isTs ? '-ts' : ''}`
    return [
      ...this.copyFiles,
      isTs ? 'tsconfig.json' : '',
      {
        from: `${srcFolder}/**/*.{${this.copyFileTypes}}`,
        to: 'src'
      }
    ].filter(Boolean)
  }

  private getRenderFiles() {
    const isMicro = this.id.startsWith('micro-')
    const isTs = this.data.project?.features?.typescript
    const srcFolder = `src${isTs ? '-ts' : ''}`
    return [
      ...this.renderFiles,
      isMicro ? 'micro.config.js' : '',
      {
        from: `${srcFolder}/**/*.{${this.renderFileTypes}}`,
        to: 'src'
      }
    ].filter(Boolean)
  }

  protected async writing() {
    const debug = !!this.context.get('debug')
    console.log('===id===', this.id)
    this.files = {
      copy: this.getCopyFiles(),
      render: this.getRenderFiles(),
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
Next steps:`)

    if (this.data.subDirectory) {
      console.log(`
  $ ${this.style.cyan('cd ' + project.name)}`)
    }

    console.log(`
  $ ${this.style.cyan('npm run dev')} ${this.style.dim('launch the development server')}`)

    console.log(`
  $ ${this.style.cyan('npm run build')} ${this.style.dim('build project')}
  `)
  }
}
