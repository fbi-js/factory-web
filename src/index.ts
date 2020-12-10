import { join } from 'path'
import { Factory } from 'fbi'

import CommandBuild from './commands/build'
import CommandServe from './commands/serve'

import TemplateVue from './template-renders/vue'
import TemplateReact from './template-renders/react'
import TemplateMicroMain from './template-renders/micro-main'
import TemplateMicroVue from './template-renders/micro-vue'
import TemplateMicroReact from './template-renders/micro-react'

export default class FactoryWeb extends Factory {
  id = require('../package.json').name
  description = 'factory for web application development'
  commands = [new CommandBuild(this), new CommandServe(this)]
  templates = [
    new TemplateVue(this),
    new TemplateReact(this),
    new TemplateMicroMain(this),
    new TemplateMicroVue(this),
    new TemplateMicroReact(this),
  ]

  execOpts: any = {
    cwd: process.cwd(),
    localDir: join(__dirname, '../'),
    preferLocal: true
  }
}
