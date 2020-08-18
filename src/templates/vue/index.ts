import { join } from 'path'
import { Template } from 'fbi'
import * as ejs from 'ejs'
import Factory from '../..'
import { formatName, isValidObject } from 'fbi/lib/utils'

export default class TemplateGraphql extends Template {
  id = 'vue'
  description = 'vue template for web template'
  path = 'templates/react'
  renderer = ejs.render

  constructor(public factory: Factory) {
    super()
  }

  protected async gathering() {
    const factory = this.context.get('config.factory')
    console.log(this.store.get(factory.id))
    this.features = factory?.features || {}
    this.data.project = {}

    let folder = 'react'
    if (this.features.react || (await this.fs.pathExists(join(this.targetDir, folder)))) {
      const ret: Record<string, any> = await this.prompt([
        {
          type: 'input',
          name: 'folder',
          message: 'Already have react in the project, please input another name for react folder:',
          validate: async (value: any, state: any) => {
            const name = formatName(value) as string
            if (await this.fs.pathExists(join(this.targetDir, name))) {
              return state.styles.danger(`path "${name}" already exist`)
            }
            return (name && true) || state.styles.danger('please input a valid folder name')
          }
        }
      ] as any)

      folder = ret.folder
    }

    this.data.project.folder = folder

    this.spinner = this.createSpinner(`Creating reactw web...`).start(
      `Creating ${this.style.bold.green('react web')} via ${this.id} from ${factory.template}...`
    )
  }

  protected async writing() {
    this.targetDir = process.cwd()
    const { project } = this.data
    this.files = {
      render: [
        {
          from: 'react/**/*',
          to: project.folder
        }
      ],
      renderOptions: {
        async: true
      }
    }
  }

  protected async installing(flags: Record<string, any>) {
    const { project } = this.data
    this.spinner.succeed(`Created react in folder ${this.style.cyan.bold(project.folder)}`)

    const installSpinner = this.createSpinner(`Installing dependencies...`).start()
    try {
      const packageManager = flags.packageManager || this.context.get('config').packageManager
      const cmds = packageManager === 'yarn' ? packageManager : `${packageManager} install`
      this.debug(`\nrunning \`${cmds}\` in ${this.targetDir}`)
      await this.exec.command(cmds, {
        cwd: this.targetDir
      })
      installSpinner.succeed(`Installed dependencies`)
    } catch (err) {
      installSpinner.fail('Failed to install dependencies. You can install them manually.')
      this.error(err)
    }
  }

  protected async ending() {
    const { project } = this.data
    const projectName = this.style.cyan.bold(project.folder)
    if (this.errors) {
      this.spinner.fail(`Failed to created react in folder ${projectName}.`)
      this.error(this.errors)
    }

    console.log(`
Next steps:`)

    console.log(`  modify "./prisma/schema.prisma" and "./prisma/seed.ts"`)
    console.log(`  ${this.style.bold('$')} ${this.style.cyan('fbi d -u')}`)
    console.log(`  ${this.style.bold('$')} ${this.style.cyan('fbi g')}`)
    console.log(`  ${this.style.bold('$')} ${this.style.cyan('fbi s')}`)

    console.log(`
  $ ${this.style.cyan('fbi list')} ${this.style.dim('show available commands and sub templates')}`)

    // TODO: update paroject config's features
  }
}
