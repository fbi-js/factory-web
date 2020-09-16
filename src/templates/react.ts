import { join } from 'path'
import { Template } from 'fbi'
import * as ejs from 'ejs'
import Factory from '../index'
import { isValidObject } from 'fbi/lib/utils'
import { REACT_GRAPHQL_FEATURE_ID, REACT_TEMPLATE_ID } from '../const'
export default class TemplateReactGraphql extends Template {
  id = REACT_TEMPLATE_ID
  description = 'template for react-graphql'
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
      `Creating ${this.style.bold.green(project.name)} via ${this.id} from ${factory.template}...`
    )
  }

  protected async writing() {
    console.log(this.data, 'data')
    const { graphql, openapi } = this.data.project.features
    const graphqlFiles = graphql
      ? [
          'src/generated/*',
          'src/graphql/*',
          'src/Apollo.ts',
          'src/ExchangeRates.tsx',
          'src/GraphqlDemo.tsx',
          'codegen.yml',
          'graphql.schema.json'
        ]
      : []
    const openapiFiles = openapi
      ? ['src/request/*', 'src/services/*', 'src/OpenapiDemo.tsx', 'src/setupProxy.js']
      : []
    this.files = {
      copy: [
        '.vscode/*',
        'public/*',

        'src/router/*',
        'src/App.css',
        'src/app.module.less',
        'src/index.css',
        'src/index.tsx',
        'src/logo.svg',
        'src/react-app-env.d.ts',
        'src/serviceWorker.ts',
        '.eslintignore',
        '.eslintrc.js',
        '.gitignore',
        '.npmrc',
        '.prettierignore',
        '.prettierrc.js',
        'package-lock.json',
        'yarn.lock',
        'README.md',
        'tsconfig.json',
        ...graphqlFiles,
        ...openapiFiles
      ],
      render: ['.fbi.config.js', 'package.json', 'src/App.tsx', 'src/config/*'],
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
