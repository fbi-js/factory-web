import Factory from '..'
import * as ejs from 'ejs'
import { join } from 'path'
import { Template, utils } from 'fbi'
import glob = require('tiny-glob')

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

  private get enterOrgName() {
    const validateMsg = 'please input a valid organization name'
    const isMicro = this.id.startsWith('micro-')
    const orgName = {
      type: 'input',
      name: 'orgName',
      message: 'Organization name',
      initial() {
        return ''
      },
      validate(value: any) {
        const name = formatName(value)
        return (name && true) || validateMsg
      }
    }
    return isMicro ? [orgName] : []
  }

  private get enterProjectName() {
    const validateMsg = 'please input a valid project name'
    const defaultName = this.data.project?.name ?? 'project-demo'
    return {
      type: 'input',
      name: 'name',
      message: 'Project name',
      initial() {
        return defaultName
      },
      validate(value: any) {
        const name = formatName(value)
        return (name && true) || validateMsg
      }
    }
  }

  private get enterProjectDescription() {
    return {
      type: 'input',
      name: 'description',
      message: 'Project description',
      initial({ state }: any) {
        return `${state.answers.name} description`
      }
    }
  }

  private get selectFeatures() {
    const hasFeatures = this.features.length > 0
    const selectFeatures = {
      type: 'MultiSelect',
      name: 'features',
      message: 'Choose features for your project:',
      hint: '(Use <space> to select, <return> to submit)',
      choices: this.features,
      result(names: string[]): any {
        return (this as any).map(names)
      }
    }
    return hasFeatures ? [selectFeatures] : []
  }

  private getPromptOptions() {
    return [
      ...this.enterOrgName,
      this.enterProjectName,
      this.enterProjectDescription,
      ...this.selectFeatures
    ]
  }

  protected async gathering(_flags: Record<string, any>) {
    this.data.factoryVersion = version
    this.data.project = await this.prompt(this.getPromptOptions() as any)
  }

  protected getCopyFiles() {
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

  protected getRenderFiles() {
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

  private async copyFile(files: string[]) {
    for (const filePath of files) {
      const isExist = await this.fs.pathExists(filePath)
      const [fileName] = filePath.split('/').slice(-1)
      if (isExist) {
        this.fs.copy(filePath, `${this.targetDir}/${fileName}`, {})
      }
    }
  }

  protected async writing() {
    const { path, template } = this.data.factory
    const templatePath = join(path, 'templates', template)
    const files = await glob(`${templatePath}/*`, {
      cwd: process.cwd()
    })
    this.copyFile(files)
  }

  // protected async afterWriting() {
  //   console.log('afterWriting--------->', this.files)
  //   // if (this.files.copy && isValidArray(this.files.copy)) {
  //   //   this.debug(`${this._debugPrefix} start copy`, this.files.copy)
  //   //   // await this.copy(this.files.copy)
  //   // }

  //   // if (
  //   //   isFunction(this.renderer) &&
  //   //   this.files.render &&
  //   //   isValidArray(this.files.render)
  //   // ) {
  //   //   this.debug(
  //   //     `${this._debugPrefix} start render`,
  //   //     this.files.render,
  //   //     this.files?.renderOptions
  //   //   )
  //   //   // await this.render(this.files.render, this.data, this.files?.renderOptions)
  //   // }
  // }

  protected async installing(flags: Record<string, any>) {
    const { project } = this.data
    this.spinner.succeed(
      `Created project ${this.style.cyan.bold(project.name)}`
    )

    const { dependencies, devDependencies } = require(join(
      this.targetDir,
      'package.json'
    ))
    if (isValidObject(dependencies) || isValidObject(devDependencies)) {
      const installSpinner = this.createSpinner(
        'Installing dependencies...'
      ).start()
      try {
        // await this.installDeps(this.targetDir, flags.packageManager, false)
        installSpinner.succeed('Installed dependencies')
      } catch (err) {
        installSpinner.fail(
          'Failed to install dependencies. You can install them manually.'
        )
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
  $ ${this.style.cyan('npm run dev')} ${this.style.dim(
      'launch the development server'
    )}`)

    console.log(`
  $ ${this.style.cyan('npm run build')} ${this.style.dim('build project')}
  `)
  }
}
