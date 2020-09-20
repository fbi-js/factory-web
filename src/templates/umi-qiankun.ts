import { join } from 'path'
import { Template } from 'fbi'
import * as ejs from 'ejs'
import Factory from '../index'
import { isValidObject } from 'fbi/lib/utils'
import { REACT_GRAPHQL_FEATURE_ID, REACT_TEMPLATE_ID, UMI_QIANKUN_TEMPLATE_ID } from '../const'
export default class TemplateUmiQiankun extends Template {
  id = UMI_QIANKUN_TEMPLATE_ID
  description = 'template for umi-qiankun'
  path = 'templates/umi-qiankun'
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
    // console.log(this.data)
    const { main, sub } = this.data.project.features
    const mainFiles = main ? ['config/*', 'src/models/*', 'access.ts'] : []
    const subFiles = sub ? [] : []
    this.files = {
      copy: [
        '.vscode/*',
        'mock/*',
        'src/components/*',
        'src/config/*',
        'src/generated/*',
        'src/graphql/*',
        'src/pages/*',
        'src/Apollo.ts',
        '.eslintignore',
        '.eslintrc.js',
        '.gitignore',
        '.prettierignore',
        '.prettierrc.js',
        'codegen.yml',
        'graphql.schema.json',
        'package-lock.json',
        'yarn.lock',
        'tsconfig.json',
        ...mainFiles,
        ...subFiles
      ],
      render: ['.fbi.config.js', 'package.json', 'src/app.tsx', '.umirc.ts', 'README.md', '.env'],
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
        await this.exec('git', ['init'], {
          cwd: this.targetDir
        })
        await this.exec(cmds[0], cmds.slice(1), {
          cwd: this.targetDir
        })
        await this.exec(cmds[0], cmds.slice(1), {
          cwd: this.targetDir
        })
        installSpinner.succeed(`Installed dependencies`)
        const commintSpinner = this.createSpinner(`Git commit...`).start()
        try {
          await this.exec('git', ['add', '.'], {
            cwd: this.targetDir
          })
          await this.exec('git', ['commit', '-m', 'init'], {
            cwd: this.targetDir
          })
          commintSpinner.succeed()
        } catch (err) {
          commintSpinner.fail(
            'Failed to git commit. You can check them, and then commit them manually.'
          )
        }
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
