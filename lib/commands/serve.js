"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { join } from 'path'
const fbi_1 = require("fbi");
// import * as dotenv from 'dotenv'
class CommandServe extends fbi_1.Command {
    constructor(factory) {
        super();
        this.factory = factory;
        this.id = 'serve';
        this.alias = 's';
        this.description = 'start development server';
        this.args = '';
        this.flags = [['-m, --mode <mode>', 'specify env mode(development|production|testing)', 'development']];
    }
    async run(flags, unknown) {
        var _a;
        process.env.NODE_ENV = (_a = flags.mode) !== null && _a !== void 0 ? _a : 'development';
        this.debug(`Factory: (${this.factory.id})`, 'from command', `"${this.id}"`, 'flags:', flags, 'unknown:', unknown);
        this.logStart(`Starting development server:`);
        const execOpts = {
            ...this.factory.execOpts,
            stdio: 'inherit'
        };
        try {
            this.clear();
            await this.exec.command(`npm run serve`, execOpts);
        }
        catch (err) {
            this.error('Failed to starting server');
            this.error(err).exit();
        }
    }
}
exports.default = CommandServe;
