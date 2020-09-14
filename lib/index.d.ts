import { Factory } from 'fbi';
import CommandBuild from './commands/build';
import CommandServe from './commands/serve';
import TemplateWeb from './templates';
export default class FactoryWeb extends Factory {
    id: string;
    description: string;
    commands: (CommandBuild | CommandServe)[];
    templates: TemplateWeb[];
    execOpts: any;
}
