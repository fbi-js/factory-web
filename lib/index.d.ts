import { Factory } from 'fbi';
import CommandBuild from './commands/build';
import CommandServe from './commands/serve';
import CommandMakeTypes from './commands/types-create';
import CommandSyncTypes from './commands/types-sync';
import TemplateBase from './templates/base';
import TemplateVue from './templates/vue';
import TemplateReact from './templates/react';
import TemplateMicroMain from './templates/micro-main';
import TemplateMicroVue from './templates/micro-vue';
import TemplateMicroReact from './templates/micro-react';
export default class FactoryWeb extends Factory {
    id: any;
    description: string;
    commands: (CommandMakeTypes | CommandServe | CommandSyncTypes | CommandBuild)[];
    templates: (TemplateVue | TemplateReact | TemplateMicroMain | TemplateMicroReact)[];
    execOpts: any;
}
export { CommandBuild, CommandServe, TemplateBase, TemplateVue, TemplateReact, TemplateMicroMain, TemplateMicroVue, TemplateMicroReact };
