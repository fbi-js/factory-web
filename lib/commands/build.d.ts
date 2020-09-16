import { Command } from 'fbi';
import Factory from '..';
export default class CommandBuild extends Command {
    factory: Factory;
    id: string;
    alias: string;
    description: string;
    args: string;
    flags: {};
    constructor(factory: Factory);
    run(flags: any, unknown: any): any;
}
