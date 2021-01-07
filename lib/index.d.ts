import { Factory } from 'fbi';
import CommandBuild from './commands/build';
import CommandServe from './commands/serve';
import CommandTypesCreate from './commands/types-create';
import CommandTypesSync from './commands/types-sync';
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
    commands: (CommandServe | CommandTypesCreate | CommandTypesSync | CommandBuild)[];
    templates: (TemplateVue | TemplateReact | TemplateMicroMain | TemplateMicroReact | TemplateMiniProgram)[];
    execOpts: any;
}
export { CommandBuild, CommandServe, CommandTypesCreate, CommandTypesSync, TemplateBase, TemplateVue, TemplateReact, TemplateMicroMain, TemplateMicroVue, TemplateMicroReact };
