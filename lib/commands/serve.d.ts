import { Command } from 'fbi';
import Factory from '..';
export default class CommandServe extends Command {
    factory: Factory;
    id: string;
    alias: string;
    description: string;
    args: string;
    flags: (string | number)[][];
    constructor(factory: Factory);
    run(flags: any, unknown: any): Promise<unknown>;
}
