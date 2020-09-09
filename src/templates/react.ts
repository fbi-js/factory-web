import { join } from 'path'
import { Template } from 'fbi'
import * as ejs from 'ejs'
import Factory from '..'
import { isValidObject } from 'fbi/lib/utils'

export default class TemplateReact extends Template {
  id = 'react'
  description = 'template for factory-web'
  path = 'templates/react'
  renderer = ejs.render
  templates = []

  constructor(public factory: Factory) {
    super()
  }

  protected async gathering() {
   // 获取暂存的项目参数
   this.data.project = this.configStore.get('projectInfo')

    const { factory, project } = this.data
    this.spinner = this.createSpinner(`Creating project...`).start(
      `Creating ${this.style.bold.green(project.name)} via ${this.id} from ${
        factory.template
      }...`
    )
  }

  protected async writing() {
    // const { project } = this.data
    this.files = {
      copy: ['.gitignore', 'index.html', 'src/*', 'tsconfig.json'],
      render: ['package.json', '.fbi.config.js', 'vite.config.ts', 'README.md', 'src/*'],
      renderOptions: {
        async: true
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
        const packageManager = flags.packageManager || this.context.get('config').packageManager
        const cmds = packageManager === 'yarn' ? [packageManager] : [packageManager, 'install']
        this.debug(`\nrunning \`${cmds.join(' ')}\` in ${this.targetDir}`)
        await this.exec(cmds[0], cmds.slice(1), {
          cwd: this.targetDir
        })
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
    if (this.errors) {
      this.spinner.fail(`Failed to created project ${projectName}.`)
      this.error(this.errors)
    }

    console.log(`
Next steps:
  $ ${this.style.cyan('cd ' + project.name)}
  `)
    console.log(`  ${this.style.bold('$')} ${this.style.cyan('fbi-next s')}`)
    console.log(`  ${this.style.bold('$')} ${this.style.cyan('fbi-next b')}`)
    console.log(`
  $ ${this.style.cyan('fbi-next list')} ${this.style.dim(
      'show available commands and sub templates'
    )}`)

    // 清除暂存的项目数据
    // this.configStore.del('projectInfo')
  }
}
