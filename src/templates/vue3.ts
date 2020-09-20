import { join } from 'path'
import { Template } from 'fbi'
import * as ejs from 'ejs'
import Factory from '..'
import { isValidObject } from 'fbi/lib/utils'
import { VUE3_TEMPLATE_ID } from '../const'

export default class TemplateVue3 extends Template {
  id = VUE3_TEMPLATE_ID
  description = 'template for factory-web'
  path = 'templates/vue3'
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
      `Creating ${this.style.bold.green(project.name)} via ${this.id} from ${factory.template}...`
    )
  }

  protected async writing() {
    this.files = {
      copy: [
        '.eslintignore',
        '.eslintrc.js',
        '.gitignore',
        '.prettierrc.js',
        'README.md',
        'index.html',
        'src/assets/*',
        'src/assets/**/*',
        'tsconfig.json',
        'vite.config.ts',
        'public/*'
      ],
      render: ['package.json', '.fbi.config.js', 'README.md', 'src/**/*/!(*.png|*.jpg)', 'src/*'],
      renderOptions: {
        async: true
      }
    }
    // }
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

    console.log(`
Next steps:
  $ ${this.style.cyan('cd ' + project.name)}
  `)
    console.log(`
  $ ${this.style.cyan('fbi s')} ${this.style.dim('launch the serve')}`)

    console.log(`
  $ ${this.style.cyan('fbi b')} ${this.style.dim('build project')}`)

    console.log(`
  $ ${this.style.cyan('fbi list')} ${this.style.dim('show available commands and sub templates')}`)
  }
}
