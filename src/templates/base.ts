import Factory from '..'
import { join } from 'path'
import { Template, utils } from 'fbi'
import glob = require('tiny-glob')

const { formatName, isValidObject } = utils
const { version } = require('../../package.json')

export default class TemplateWebBase extends Template {
  id = 'web-base'
  features: any[] = []
  path = ''
  ignore = []
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

  // private get enterProjectName() {
  //   const validateMsg = 'please input a valid project name'
  //   const defaultName = this.data.project?.name ?? 'project-demo'
  //   return {
  //     type: 'input',
  //     name: 'name',
  //     message: 'Project name',
  //     initial() {
  //       return defaultName
  //     },
  //     validate(value: any) {
  //       const name = formatName(value)
  //       return (name && true) || validateMsg
  //     }
  //   }
  // }

  private get enterProjectDescription() {
    const defaultProjectName = this.data.project?.name ?? 'my-app'
    return {
      type: 'input',
      name: 'description',
      message: 'Project description',
      initial({ state }: any) {
        return `${defaultProjectName} description`
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
    return hasFeatures ? JSON.stringify([selectFeatures]) : JSON.stringify([])
  }

  /**
   * get template prompt options
   */
  private getPromptOptions() {
    return [
      ...this.enterOrgName,
      this.enterProjectDescription,
      ...this.selectFeatures
    ]
  }

  protected async gathering(_flags: Record<string, any>) {
    const { name } = this.data.project
    const defaultProject = {
      name: name,
      description: `${name} description`,
      features: '[]'
    }
    const project = await this.prompt(this.getPromptOptions() as any)
    this.data.factoryVersion = version
    this.data.factoryId = name
    this.data.project = {
      ...defaultProject,
      ...project
    }
  }

  protected async writing() {
    const { project } = this.data
    console.log('\n')
    const writingSpinner = this.createSpinner(
      this.style.green(`start create project: ${project.name}\n`)
    ).start()

    // 获取指定template path下的文件列表
    const files = await glob(`${this.path}/**/*`, {
      cwd: process.cwd(),
      dot: true,
      absolute: true
    })
    // 创建项目
    await this.writingFiles(files)

    writingSpinner.succeed(
      this.style.green(`create project ${project.name} success!\n\n`)
    )
  }

  protected async installing(flags: Record<string, any>) {
    const { dependencies, devDependencies } = require(join(
      this.targetDir,
      'package.json'
    ))
    if (isValidObject(dependencies) || isValidObject(devDependencies)) {
      const env = this.context.get('env')
      const config = this.context.get('config')
      const packageManager = env.hasYarn ? 'yarn' : config.packageManager

      // if use yarn install, not need spinner
      const installSpinner = this.createSpinner(
        `${packageManager} install`
      ).start()
      try {
        await this.installDeps(this.targetDir, packageManager, false)
        installSpinner.succeed('install dependencies success!\n')
      } catch (err) {
        installSpinner.fail('install dependencies fail!\n')
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
next steps:`)

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
