"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const fbi_1 = require("fbi");
const configs_1 = require("../configs");
class CommandBuild extends fbi_1.Command {
    constructor(factory) {
        super();
        this.factory = factory;
        this.id = 'build';
        this.alias = 'b';
        this.description = 'build project for specified environment (default: production)';
        this.args = '';
        this.flags = [
            ['-m, --mode <mode>', 'specify env mode(development|production|testing)', 'production'],
            ['--micro-mode <mode>', '""|fuse', '']
        ];
    }
    async run(flags, unknown) {
        var _a, _b;
        process.env.NODE_ENV = (_a = flags.mode) !== null && _a !== void 0 ? _a : 'production';
        process.env.MICRO_MODE = (_b = flags.microMode) !== null && _b !== void 0 ? _b : '';
        this.debug(`Factory: (${this.factory.id})`, 'from command', `"${this.id}"`, 'flags:', flags, 'unknown:', unknown);
        this.logStart(`Building for production...`);
        const factory = this.context.get('config.factory');
        const paths = this.context.get('config.paths');
        const config = await configs_1.resolveWebpackConfig(factory.template, Object.assign(Object.assign({}, flags), { factory,
            paths }));
        try {
            await this.build(config);
        }
        catch (err) {
            this.error('Failed to build project');
            console.log(err);
            this.exit();
        }
    }
    build(config) {
        const compiler = webpack_1.default(config);
        return new Promise((resolve, reject) => {
            compiler.run((err, stats) => {
                if (err) {
                    console.error(err.stack || err);
                    if (err.details) {
                        console.error(err.details);
                    }
                    reject();
                }
                console.log(stats === null || stats === void 0 ? void 0 : stats.toString(config.stats));
                resolve('');
            });
        });
    }
}
exports.default = CommandBuild;
