import { join } from 'path'
import Factory from '..'
import BaseClass from './base'

export default class TemplateReact extends BaseClass {
  id = 'react'
  path = join(__dirname, '../../templates/react')
  description = 'template for React.js application'
  templates = []
  features = [
    { name: 'typescript', value: true },
    { name: 'admin', hint: 'antd, axios, basic components(layout, menu, breadcrumb, topbar)' }
  ]

  constructor(public factory: Factory) {
    super(factory)
  }

  protected async gathering(flags: Record<string, any>) {
    await super.gathering(flags)

    const { factory, project } = this.data
    this.spinner = this.createSpinner(`Creating project...`).start(
      `Creating ${this.style.bold.green(project.name)} via ${factory.id} from ${
        factory.template
      }...`
    )
  }

  protected async writing() {
    await super.writing()
    const isMicro = this.id.startsWith('micro-')
    let isTs = this.data.project?.features?.typescript

    const isReact = this.id === 'react' || this.id === 'micro-react'
    const isReactAdmin = isReact && this.data.project?.features?.admin
    const defaultFromToFileMap = {
      from: `src${isTs ? '-ts' : ''}/**/*.{js,jsx,css,scss,sass,less,md,vue}`,
      to: 'src'
    }
    let fromToFileMaps: any[] = [defaultFromToFileMap]

    const prefix = `src${isTs ? '-ts' : ''}`
    if (isReact) {
      const genTsOrJsFromStr = (isTs: boolean, folderName: string) => {
        return `${prefix}/${folderName}/index.${isTs ? 'ts' : 'js'}`
      }
      const folders = ['apis', 'components', 'helpers', 'pages', 'routes', 'typings']
      const genReadmeFromStr = (folderName: string) => {
        return `${prefix}/${folderName}/README.md`
      }
      const tsOrJsfileMaps = folders.map((folder) => {
        return {
          from: genTsOrJsFromStr(isTs, folder),
          to: 'src'
        }
      })
      const readmeFileMaps = folders.map((folder) => {
        return {
          from: genReadmeFromStr(folder),
          to: 'src'
        }
      })
      fromToFileMaps = [
        ...readmeFileMaps,
        ...tsOrJsfileMaps,
        {
          from: `${prefix}/assets/*`,
          to: 'src'
        },
        {
          from: `${prefix}/configs/*`,
          to: 'src'
        },
        {
          from: `${prefix}/app.css`,
          to: 'src'
        },
        {
          from: `${prefix}/App.${isTs ? 'tsx' : 'js'}`,
          to: 'src'
        },
        {
          from: `${prefix}/index.css`,
          to: 'src'
        },
        {
          from: `${prefix}/main.${isTs ? 'tsx' : 'js'}`,
          to: 'src'
        },
        isTs && {
          from: `${prefix}/shims-react.d.ts`,
          to: 'src'
        }
      ]
    }
    if (isReactAdmin && !isMicro) {
      fromToFileMaps = [
        {
          from: `${prefix}/**/*.{ts,tsx,js,jsx,md,scss,svg,css}`,
          to: 'src'
        }
      ]
    }
    this.files.render = [
      'package.json',
      'webpack.config.js',
      'README.md',
      isMicro ? 'micro.config.js' : '',
      ...fromToFileMaps
    ].filter(Boolean)
  }
}
