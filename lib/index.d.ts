import { Factory } from 'fbi';
import CommandBuild from './commands/build';
import CommandServe from './commands/serve';
import TemplateReact from './templates/react';
import TemplateMicro from './templates/micro';
export default class FactoryWeb extends Factory {
    id: string;
    description: string;
    commands: (CommandServe | CommandBuild)[];
    templates: (TemplateReact | TemplateMicro)[];
    execOpts: any;
}
