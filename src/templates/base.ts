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

  /**
   * from -> /factory-web/templates/${template}/src-ts/routes/index.ts.ejs
   * to -> ${this.targetDir}/src-ts/routes/index.ts
   * @param srcPath file entry path
   */
  private getOutputPath(srcPath: string) {
    const { template } = this.data.factory
    const formatPath = srcPath
      .replace(/(.*)(templates)(.*)/, '$3')
      .replace(`/${template}`, '')
      .replace(/(.*)(.ejs)$/, '$1')
    const outputPath = `${this.targetDir}${formatPath}`
    return outputPath
  }

  /**
   * copy or render file from srcPath to outputPath, .ejs file will be render by ejs
   * @param srcPath file entry path
   * @param outputPath file output path
   */
  private async writeFile(srcPath: string, outputPath: string) {
    const isEjsFile = /(.*)(.ejs)$/.test(srcPath)
    if (!isEjsFile) {
      this.fs.copy(srcPath, outputPath, {})
    } else {
      const content = await this.fs.readFile(srcPath, 'utf8')
      const rendered = await this.renderer(
        content.trim() + '\n',
        {
          ...this.data
        },
        {
          async: true
        }
      )
      await this.fs.outputFile(outputPath, rendered, {})
    }

    console.log(this.style.grey(`创建文件: ${outputPath}`))
    this.debug('writing file', {
      srcPath,
      outputPath
    })
  }

  /**
   *
   * @param files 文件列表
   */
  private async writingFiles(files: string[]) {
    for (const srcPath of files) {
      const isExist = await this.fs.pathExists(srcPath)
      const outputPath = this.getOutputPath(srcPath)
      const stats = await this.fs.stat(srcPath)
      if (isExist) {
        if (stats.isFile()) {
          try {
            this.writeFile(srcPath, outputPath)
          } catch (error) {
            this.debug('创建文件异常', {
              srcPath,
              outputPath,
              error
            })
          }
        } else {
          await this.fs.ensureDir(outputPath)
        }
      }
    }
  }

  protected async writing() {
    // const debug = !!this.context.get('debug')
    const { factory, project } = this.data
    const { path, template } = factory
    const templatePath = join(path, 'templates', template)

    console.log('\n')
    const writingSpinner = this.createSpinner(
      this.style.green(`开始创建项目: ${project.name}\n`)
    ).start()
    // 获取文件列表
    const files = await glob(`${templatePath}/**/*`, {
      cwd: process.cwd()
    })

    // 创建项目
    await this.writingFiles(files)

    // ejs render是异步渲染，无截止回调，暂时延迟300ms表示创建成功
    await new Promise((resolve) => {
      setTimeout(() => {
        writingSpinner.succeed(
          this.style.green(`创建项目 ${project.name} 成功\n\n`)
        )
        resolve('')
      }, 300)
    })
  }

  protected async installing(flags: Record<string, any>) {
    const { dependencies, devDependencies } = require(join(
      this.targetDir,
      'package.json'
    ))
    if (isValidObject(dependencies) || isValidObject(devDependencies)) {
      const installSpinner = this.createSpinner('安装依赖中...').start()
      try {
        await this.installDeps(this.targetDir, flags.packageManager, false)
        installSpinner.succeed('安装依赖成功！\n')
      } catch (err) {
        installSpinner.fail('\n安装依赖失败！')
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
后续使用步骤:`)

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
