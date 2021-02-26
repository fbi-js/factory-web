import { Factory } from 'fbi';
import CommandBuild from './commands/build';
import CommandServe from './commands/serve';
import CommandLint from './commands/lint';
import CommandFormat from './commands/format';
import TemplateBase from './templates/base';
import TemplateVue from './templates/vue';
import TemplateReact from './templates/react';
export default class FactoryWeb extends Factory {
    id: any;
    description: string;
    commands: (CommandServe | CommandLint | CommandFormat | CommandBuild)[];
    templates: any;
    execOpts: any;
}
export { CommandBuild, CommandServe, TemplateBase, TemplateVue, TemplateReact };
