"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fbi_1 = require("fbi");
const webpack_1 = __importDefault(require("webpack"));
const webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
const defaults_1 = require("../config/defaults");
const config_1 = require("../config");
const utils_1 = require("../config/helpers/utils");
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
        var _a, _b, _c;
        process.env.NODE_ENV = (_a = flags.mode) !== null && _a !== void 0 ? _a : 'development';
        this.debug(`Factory: (${this.factory.id})`, 'from command', `"${this.id}"`, 'flags:', flags, 'unknown:', unknown);
        const factory = this.context.get('config.factory');
        const isProduction = process.env.NODE_ENV === 'production';
        this.logStart(`Starting development server...`);
        try {
            const config = await config_1.resolveWebpackConfig(factory === null || factory === void 0 ? void 0 : factory.template, {
                port: flags.port,
                mode: flags.mode,
                startEntry: flags.entry,
                cosEnv: flags.env,
                factory
            });
            const compiler = webpack_1.default(config);
            const host = ((_b = config.devServer) === null || _b === void 0 ? void 0 : _b.host) || defaults_1.HOST;
            const port = (flags === null || flags === void 0 ? void 0 : flags.port) || ((_c = config.devServer) === null || _c === void 0 ? void 0 : _c.port);
            const server = new webpack_dev_server_1.default(compiler, Object.assign(Object.assign({}, config.devServer), { host,
                port }));
            return new Promise((resolve, reject) => {
                const localUrl = `http://${host}:${port}`;
                const networkUrl = `http://${utils_1.getIpAddress()}:${port}`;
                compiler.hooks.done.tap('fbi-serve-compiler', async (stats) => {
                    if (stats.hasErrors()) {
                        return;
                    }
                    console.log();
                    console.log(`  App running at:`);
                    console.log(`  - Local:   ${this.style.cyan(localUrl)}`);
                    console.log(`  - Network: ${this.style.cyan(networkUrl)}`);
                    console.log();
                    if (!isProduction) {
                        const buildCommand = `npm run build`;
                        console.log(`  Note that the development build is not optimized.`);
                        console.log(`  To create a production build, run ${this.style.cyan(buildCommand)}.`);
                    }
                });
                resolve({
                    server,
                    url: localUrl
                });
                server.listen(port, host, (err) => {
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
