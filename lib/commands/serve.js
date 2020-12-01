"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fbi_1 = require("fbi");
const webpack_1 = __importDefault(require("webpack"));
const config_1 = __importDefault(require("../config"));
const webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
const defaults_1 = require("../config/defaults");
const path_1 = __importDefault(require("path"));
class CommandServe extends fbi_1.Command {
    constructor(factory) {
        super();
        this.factory = factory;
        this.id = 'serve';
        this.alias = 's';
        this.description = 'start development server';
        this.args = '';
        this.flags = [
            ['-m, --mode <mode>', 'specify env mode(development|production|testing)', 'development'],
            ['-e, --env <env>', 'customer env mode(development|production)', 'development'],
            ['-p, --port <port>', 'webapck dev-serve port', defaults_1.PORT],
            ['-entry, --entry <entry>', 'entry type(self|app-entry)', 'self']
        ];
    }
    async run(flags, unknown) {
        var _a;
        process.env.NODE_ENV = (_a = flags.mode) !== null && _a !== void 0 ? _a : 'development';
        this.debug(`Factory: (${this.factory.id})`, 'from command', `"${this.id}"`, 'flags:', flags, 'unknown:', unknown);
        const template = this.context.get('config.factory.template');
        this.logStart(`Starting development server:`);
        try {
            const config = await config_1.default(template, {
                port: flags.port,
                mode: flags.mode,
                startEntry: flags.entry,
                cosEnv: flags.env
            });
            const compiler = webpack_1.default(config);
            const server = new webpack_dev_server_1.default(compiler, {
                contentBase: path_1.default.join(process.cwd(), 'dist'),
                writeToDisk: true,
                historyApiFallback: true,
                compress: true,
                noInfo: true,
                open: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Methods': '*'
                },
                disableHostCheck: true
            });
            server.listen(flags.port, 'localhost', (err) => {
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
