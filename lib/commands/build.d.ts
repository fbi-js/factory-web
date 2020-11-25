/// <reference types="webpack-dev-server" />
import type { Configuration } from 'webpack';
import Factory from '..';
import { Command } from 'fbi';
export default class CommandBuild extends Command {
    factory: Factory;
    id: string;
    alias: string;
    description: string;
    args: string;
    flags: (string | boolean)[][];
    constructor(factory: Factory);
    run(flags: any, unknown: any): Promise<void>;
    protected build(config: Configuration): Promise<unknown>;
}
