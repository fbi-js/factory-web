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
    { name: 'admin', value: true }
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

  // rewrite render files
  protected async writing() {
    await super.writing()
    this.data.project = {
      ...this.data.project,
      features: {
        ...this.data.project.features
      }
    }
    const isMicro = this.id.startsWith('micro-')
    let isTs = this.data.project?.features?.typescript

    const isReact = this.id === 'react'
    const isReactAdmin = isReact && this.data.project?.features?.admin
    const defaultFromToFileMap = {
      from: `src${isTs ? '-ts' : ''}/**/*.{js,jsx,css,scss,sass,less,md,vue}`,
      to: 'src'
    }
    let fromToFileMaps: any[] = [defaultFromToFileMap]
    console.log(isReact, isTs, isReactAdmin, '=-=')
    // react template files
    if (isReact && isTs) {
      const prefix = `src${isTs ? '-ts' : ''}`
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
      console.log(tsOrJsfileMaps, readmeFileMaps, '-----')

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
      // react-admin template files
    }
    if (isReactAdmin) {
      isTs = true
      fromToFileMaps = [
        {
          from: `src-ts/**/*.{ts,tsx,md,scss,svg,css}`,
          to: 'src'
        }
      ]
    }
    console.log(fromToFileMaps, '-----dddd')
    this.files.render = [
      'package.json',
      'webpack.config.js',
      'README.md',
      isMicro ? 'micro.config.js' : '',
      ...fromToFileMaps
    ].filter(Boolean)
  }
}
