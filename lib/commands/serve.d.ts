import Factory from '..';
import { Command } from 'fbi';
export default class CommandServe extends Command {
    factory: Factory;
    id: string;
    alias: string;
    description: string;
    args: string;
    flags: (string | number)[][];
    constructor(factory: Factory);
    private injectHotReload;
    run(flags: any, unknown: any): Promise<unknown>;
}
