"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fbi_1 = require("fbi");
const webpack_1 = __importDefault(require("webpack"));
const config_1 = __importDefault(require("../config"));
const defaults_1 = require("../config/defaults");
const utils_1 = __importDefault(require("../config/helpers/utils"));
const chalk_1 = __importDefault(require("chalk"));
const webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
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
        const isProduction = process.env.NODE_ENV === 'production';
        this.logStart(`Starting development server:`);
        try {
            const config = await config_1.default(template, {
                port: flags.port,
                mode: flags.mode,
                startEntry: flags.entry,
                cosEnv: flags.env
            });
            const compiler = webpack_1.default(config);
            // TODO: add user custom config
            const server = new webpack_dev_server_1.default(compiler, Object.assign({}, defaults_1.WEBPACK_DEV_CONFIG));
            return new Promise((resolve, reject) => {
                const localUrl = `http://localhost:${flags.port}`;
                const networkUrl = `http://${utils_1.default.getIpAddress()}:${flags.port}`;
                compiler.hooks.done.tap('fbi-serve-compiler', async (stats) => {
                    if (stats.hasErrors()) {
                        return;
                    }
                    console.log();
                    console.log(`  App running at:`);
                    console.log(`  - Local:   ${chalk_1.default.cyan(localUrl)}`);
                    console.log(`  - Network: ${chalk_1.default.cyan(networkUrl)}`);
                    console.log();
                    if (!isProduction) {
                        const buildCommand = `npm run build`;
                        console.log(`  Note that the development build is not optimized.`);
                        console.log(`  To create a production build, run ${chalk_1.default.cyan(buildCommand)}.`);
                    }
                });
                resolve({
                    server,
                    url: localUrl
                });
                server.listen(flags.port, defaults_1.HOST, (err) => {
                    if (err) {
                        reject(err);
                    }
                });
            });
        }
        catch (err) {
            this.error('Failed to start development server');
            this.error(err).exit();
        }
    }
}
exports.default = CommandServe;
