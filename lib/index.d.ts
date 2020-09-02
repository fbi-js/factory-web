import { Factory } from 'fbi';
import CommandBuild from './commands/build';
import CommandServe from './commands/serve';
import TemplateVue from './templates/vue';
import TemplateReact from './templates/react';
import TemplateVue3 from './templates/vue3';
export default class FactoryWeb extends Factory {
    id: string;
    description: string;
    commands: (CommandBuild | CommandServe)[];
    templates: (TemplateVue | TemplateReact | TemplateVue3)[];
    execOpts: any;
}
