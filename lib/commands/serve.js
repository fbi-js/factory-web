"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fbi_1 = require("fbi");
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
        this.clear();
        await runReactStartScript();
        // const templateInfo = this.context.get('config.factory.template')
        // console.log(this.factory.commands)
        // if (templateInfo.id !== REACT_GRAPHQL_TEMPLATE_ID) {
        //   await run()
        // } else {
        //   await this.exec.command('vite', execOpts)
        // }
    }
}
exports.default = CommandServe;
