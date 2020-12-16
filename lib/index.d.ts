import { Factory } from 'fbi';
import CommandBuild from './commands/build';
import CommandServe from './commands/serve';
import TemplateBase from './templates/base';
import TemplateVue from './templates/vue';
import TemplateReact from './templates/react';
import TemplateMicroMain from './templates/micro-main';
import TemplateMicroVue from './templates/micro-vue';
import TemplateMicroReact from './templates/micro-react';
export default class FactoryWeb extends Factory {
    id: any;
    description: string;
    commands: (CommandServe | CommandBuild)[];
    templates: (TemplateVue | TemplateReact | TemplateMicroMain)[];
    execOpts: any;
}
export { CommandBuild, CommandServe, TemplateBase, TemplateVue, TemplateReact, TemplateMicroMain, TemplateMicroVue, TemplateMicroReact };
