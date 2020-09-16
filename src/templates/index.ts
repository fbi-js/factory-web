import { Template, utils } from 'fbi'
import * as ejs from 'ejs'
import Factory from '..'
import { formatName, capitalizeEveryWord } from 'fbi/lib/utils'
import SubTemplateVue from './vue'
import SubTemplateVue3 from './vue3'
import SubTemplateReact from './react'
import {
  REACT_GRAPHQL_FEATURE_ID,
  REACT_OPENAPI_FEATURE_ID,
  REACT_STR,
  REACT_TEMPLATE_ID,
  VUE2_TEMPLATE_ID,
  VUE3_TEMPLATE_ID,
  VUE_STR
} from '../const'

export default class TemplateWeb extends Template {
  id = 'web'
  description = 'template for factory-web'
  path = 'templates/index'
  renderer = ejs.render
  templates = [
    new SubTemplateVue(this.factory),
    new SubTemplateVue3(this.factory),
    new SubTemplateReact(this.factory)
  ]

  public projectInfo: Record<string | number, any> = {}

  constructor(public factory: Factory) {
    super()
  }

  protected async gathering(flags: Record<string, any>) {
    const defaultName = (this.data.project && this.data.project.name) || 'project-demo'
    const nameAndDescriptionConfig = [
      {
        type: 'input',
        name: 'name',
        message: 'Input the project name',
        initial({ enquirer }: any) {
          return defaultName
        },
        validate(value: any) {
          const name = formatName(value)
          return (name && true) || 'please input a valid project name'
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Input project description',
        initial({ state }: any) {
          return `${state.answers.name} description`
        }
      }
    ]
    this.projectInfo = await this.prompt([
      {
        type: 'select',
        name: 'language',
        message: `Which language do you want to use?`,
        hint: '(Use <arrow> to select, <return> to submit)',
        choices: [
          { name: VUE_STR, value: true },
          { name: REACT_STR, value: true }
        ]
      } as any,
      {
        type: 'select',
        name: 'templateId',
        message: `Which version of vue do you want to choice?`,
        hint: '(Use <arrow> to select, <return> to submit)',
        skip(state: any) {
          const { answers } = this.state
          return answers.language === REACT_STR
        },
        choices: [
          { name: VUE2_TEMPLATE_ID, value: true },
          { name: VUE3_TEMPLATE_ID, value: true }
        ]
      } as any,
      {
        type: 'select',
        name: 'features',
        message: `Which feature of react do you want to choice?`,
        hint: '(Use <arrow> to select, <return> to submit)',
        skip(): boolean {
          const { answers } = this.state
          return answers.language === VUE_STR
        },
        choices: [
          { name: REACT_GRAPHQL_FEATURE_ID, value: true },
          { name: REACT_OPENAPI_FEATURE_ID, value: true }
        ],
        result(name) {
          return {
            templateFeature: name
          }
        }
      },
      ...nameAndDescriptionConfig
    ])
    this.projectInfo.nameCapitalized = capitalizeEveryWord(this.projectInfo.name)
    if (this.projectInfo.language === REACT_STR) {
      this.projectInfo = {
        ...this.projectInfo,
        templateId: REACT_TEMPLATE_ID
      }
    }
    try {
      this.configStore.set('projectInfo', this.projectInfo)
    } catch {
      // 若写入项目信息数据失败，终止后续流程
      return
    }
    const temps = utils.flatten(this.factory.templates.map((f: any) => f.templates))
    const templateId = this.projectInfo.templateId
    const selectedTemplate = temps.find((it: any) => it.id === templateId)
    if (selectedTemplate) {
      // set init data
      // TODO: factoryInfo的version有问题
      const factoryInfo = this.store.get(selectedTemplate.factory.id)
      const info: Record<string, any> = await selectedTemplate.run(
        {
          factory: {
            id: factoryInfo.id,
            path: factoryInfo.version?.latest?.dir || factoryInfo.path,
            version: factoryInfo.version?.latest?.short,
            template: selectedTemplate.id
          }
        },
        flags
      )
      if (!info) {
        return
      }

      // 清除暂存的项目数据
      this.configStore.del('projectInfo')
      // update store
      this.debug(`Save info into project store`)
      if (info.path) {
        this.projectStore.merge(info.path, {
          name: info.name,
          path: info.path,
          factory: factoryInfo.id,
          version: factoryInfo.version?.latest?.short,
          template: selectedTemplate.templateId,
          features: info.features,
          createdAt: Date.now()
        })
      }
    }
  }
}
