"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fbi_1 = require("fbi");
const webpack_1 = __importDefault(require("webpack"));
const webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
const defaults_1 = require("../configs/constant/defaults");
const configs_1 = require("../configs");
const assert_1 = require("../helpers/assert");
const portfinder_1 = __importDefault(require("portfinder"));
class CommandServe extends fbi_1.Command {
    constructor(factory) {
        super();
        this.factory = factory;
        this.id = 'serve';
        this.alias = 's';
        this.description = 'launch the development server';
        this.args = '';
        this.flags = [
            [
                '-m, --mode <mode>',
                'specify env mode(development|production|testing)',
                'development'
            ],
            ['-p, --port <port>', 'webapck dev-serve port', process.env.PORT || defaults_1.PORT],
            ['--micro-mode <mode>', '""|fuse', '']
        ];
    }
    run(flags, unknown) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            process.env.NODE_ENV = (_a = flags.mode) !== null && _a !== void 0 ? _a : 'development';
            process.env.MICRO_MODE = (_b = flags.microMode) !== null && _b !== void 0 ? _b : '';
            this.debug(`Factory: (${this.factory.id})`, 'from command', `"${this.id}"`, 'flags:', flags, 'unknown:', unknown);
            const factory = this.context.get('config.factory');
            const paths = this.context.get('config.paths');
            this.logStart('Starting development server...');
            try {
                assert_1.assertFactoryTemplate(factory);
                const config = yield configs_1.resolveWebpackConfig(factory.template, Object.assign(Object.assign({}, flags), { factory,
                    paths }));
                const compiler = webpack_1.default(config);
                const host = ((_c = config.devServer) === null || _c === void 0 ? void 0 : _c.host) || defaults_1.HOST;
                const port = yield portfinder_1.default.getPortPromise({
                    port: (flags === null || flags === void 0 ? void 0 : flags.port) || ((_d = config.devServer) === null || _d === void 0 ? void 0 : _d.port)
                });
                const server = new webpack_dev_server_1.default(compiler, Object.assign(Object.assign({}, config.devServer), { host,
                    port }));
                return new Promise((resolve, reject) => {
                    const localUrl = `http://${host}:${port}`;
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
        });
    }
}
exports.default = CommandServe;
