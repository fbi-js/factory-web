import { Command } from 'fbi';
import { IFactoryConfig } from '../types';
import Factory from '..';
export default class CommandLint extends Command {
    factory: Factory;
    id: string;
    alias: string;
    description: string;
    args: string;
    flags: never[];
    constructor(factory: Factory);
    run(flags: any, unknown: any): Promise<void>;
    protected lintWithEslint(config: IFactoryConfig): import("execa").ExecaChildProcess<string>;
    protected getFileExts(factory: IFactoryConfig): string[];
    protected catchFatalErrors(err: any): any;
}
