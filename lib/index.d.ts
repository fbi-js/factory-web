import { Factory } from 'fbi';
import CommandBuild from './commands/build';
import CommandServe from './commands/serve';
import TemplateBase from './templates/base';
import TemplateVue from './templates/vue';
import TemplateReact from './templates/react';
import TemplateMicroMain from './templates/micro-main';
import TemplateMicroVue from './templates/micro-vue';
import TemplateMicroReact from './templates/micro-react';
import TemplateMiniProgram from './templates/mini-program';
export default class FactoryWeb extends Factory {
    id: any;
    description: string;
    commands: (CommandBuild | CommandServe)[];
    templates: (TemplateVue | TemplateReact | TemplateMicroMain | TemplateMicroReact | TemplateMiniProgram)[];
    execOpts: any;
}
export { CommandBuild, CommandServe, TemplateBase, TemplateVue, TemplateReact, TemplateMicroMain, TemplateMicroVue, TemplateMicroReact };
