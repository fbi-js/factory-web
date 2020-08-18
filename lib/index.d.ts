import { Factory } from 'fbi';
import CommandBuild from './commands/build';
import CommandServe from './commands/serve';
import TemplateFactory from './templates/factory';
export default class FactoryWeb extends Factory {
    id: string;
    description: string;
    commands: (CommandBuild | CommandServe)[];
    templates: TemplateFactory[];
    execOpts: any;
}
