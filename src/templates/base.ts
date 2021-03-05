import Factory from '..'
import { join } from 'path'
import { Template, utils } from 'fbi'
import glob = require('tiny-glob')

const { isValidObject } = utils
const { version } = require('../../package.json')
export default class TemplateWebBase extends Template {
  id = 'web-base'
  features: any[] = []
  path = ''
  rule: any = {
    glob: '**/*',
    ignores: [] // examples: 'src/test/test.ts', 'src/test/test.*', 'src/test*'
  }

  prompts: any[] = []

  constructor(public factory: Factory) {
    super(factory)
  }

  /**
   * get template prompt options
   */
  protected getPromptOptions() {
    const { name } = this.data.project
    const defaultPrompts = [
      {
        type: 'input',
        name: 'description',
        message: 'Project description',
        initial({ state }: any) {
          return `${name} description`
        }
      },
      {
        type: 'MultiSelect',
        name: 'features',
        message: 'Choose features for your project:',
        hint: '(Use <space> to select, <return> to submit)',
        choices: this.features,
        result(names: string[]): any {
          return (this as any).map(names)
        }
      }
    ]
    return [...defaultPrompts, ...this.prompts]
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
