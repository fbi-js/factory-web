"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fbi_1 = require("fbi");
const webpack_1 = __importDefault(require("webpack"));
const config_1 = __importDefault(require("../config"));
const webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
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
        const template = this.context.get('config.factory.template');
        this.logStart(`Starting development server:`);
        try {
            const config = config_1.default(template, {
                env: process.env.NODE_ENV
            });
            const compiler = webpack_1.default(config);
            const server = new webpack_dev_server_1.default(compiler, {
                historyApiFallback: true,
                compress: true,
                noInfo: true,
                open: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Methods': '*',
                },
                disableHostCheck: true
            });
            server.listen(9003, 'localhost', (err) => {
                if (err) {
                    throw err;
                }
            });
        }
        catch (err) {
            this.error('Failed to start development server');
            this.error(err).exit();
        }
    }
}
exports.default = CommandServe;
