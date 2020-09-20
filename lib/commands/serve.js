"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fbi_1 = require("fbi");
const const_1 = require("../const");
const runReactStartScript = require('./react/scripts/start.js');
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
        const start = Date.now();
        this.debug(`Factory: (${this.factory.id})`, 'from command', `"${this.id}"`, 'flags:', flags, 'unknown:', unknown);
        this.logStart(`Starting development server:`);
        const execOpts = {
            ...this.factory.execOpts,
            stdio: 'inherit'
        };
        const templateId = this.context.get('config.factory.template');
        try {
            if (templateId === const_1.REACT_TEMPLATE_ID) {
                await runReactStartScript();
            }
            else if (templateId === const_1.MICRO_TEMPLATE_ID) {
                await this.exec.command('umi dev', execOpts);
            }
        }
        catch (err) {
            this.error('Failed to build project');
            this.error(err).exit();
        }
    }
}
exports.default = CommandServe;
