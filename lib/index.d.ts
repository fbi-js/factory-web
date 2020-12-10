import { Factory } from 'fbi';
import CommandBuild from './commands/build';
import CommandServe from './commands/serve';
import TemplateVue from './template-renders/vue';
import TemplateReact from './template-renders/react';
import TemplateMicroMain from './template-renders/micro-main';
export default class FactoryWeb extends Factory {
    id: any;
    description: string;
    commands: (CommandServe | CommandBuild)[];
    templates: (TemplateVue | TemplateReact | TemplateMicroMain)[];
    execOpts: any;
}
