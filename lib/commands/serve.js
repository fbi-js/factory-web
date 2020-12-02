"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fbi_1 = require("fbi");
const webpack_1 = __importDefault(require("webpack"));
const config_1 = __importDefault(require("../config"));
const webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
const utils_1 = require("../config/helpers/utils");
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
    injectHotReload(config, networkUrl) {
        const { entry } = config;
        const rootPath = path_1.default.resolve(__dirname, '../../node_modules/');
        const sockPath = `${rootPath}/webpack-dev-server/client/index.js?${networkUrl}&sockPath=/sockjs-node`;
        const hotPath = `${rootPath}/webpack/hot/dev-server.js`;
        const devClients = [sockPath, hotPath];
        if (typeof entry === 'object' && !Array.isArray(entry)) {
            Object.keys(entry).forEach((key) => {
                entry[key] = devClients.concat(entry[key]);
            });
        }
        else if (typeof entry === 'function') {
            config.entry = entry(devClients);
        }
        else {
            config.entry = devClients.concat(entry);
        }
    }
    async run(flags, unknown) {
        var _a;
        process.env.NODE_ENV = (_a = flags.mode) !== null && _a !== void 0 ? _a : 'development';
        this.debug(`Factory: (${this.factory.id})`, 'from command', `"${this.id}"`, 'flags:', flags, 'unknown:', unknown);
        const factory = this.context.get('config.factory');
        const isProduction = process.env.NODE_ENV === 'production';
        const localUrl = `http://localhost:${flags.port}`;
        const networkUrl = `http://${utils_1.getIpAddress()}:${flags.port}`;
        this.logStart(`Starting development server:`);
        try {
            const config = await config_1.default(factory.template, {
                port: flags.port,
                mode: flags.mode,
                startEntry: flags.entry,
                cosEnv: flags.env,
                factory
            });
            // inject dev & hot-reload middleware entries
            if (!isProduction) {
                this.injectHotReload(config, networkUrl);
            }
            const compiler = webpack_1.default(config);
            // TODO: merge user config
            const server = new webpack_dev_server_1.default(compiler, Object.assign({}, defaults_1.WEBPACK_DEV_CONFIG));
            return new Promise((resolve, reject) => {
                compiler.hooks.done.tap('fbi-serve-compiler', async (stats) => {
                    if (stats.hasErrors()) {
                        console.log(stats.toString());
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
