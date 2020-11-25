import { Factory } from 'fbi';
import CommandBuild from './commands/build';
import CommandServe from './commands/serve';
import CommandInstall from './commands/install';
import TemplateVue from './templates/vue';
import TemplateReact from './templates/react';
import TemplateMicroMain from './templates/micro-main';
export default class FactoryWeb extends Factory {
    id: string;
    description: string;
    commands: (CommandServe | CommandInstall | CommandBuild)[];
    templates: (TemplateMicroMain | TemplateVue | TemplateReact)[];
    execOpts: any;
}
