"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fbi_1 = require("fbi");
const webpack_1 = __importDefault(require("webpack"));
const config_1 = __importDefault(require("../config"));
class CommandBuild extends fbi_1.Command {
    constructor(factory) {
        super();
        this.factory = factory;
        this.id = 'build';
        this.alias = 'b';
        this.description = 'command build description';
        this.args = '';
        this.flags = [
            ['-m, --mode <mode>', 'specify env mode(development|production|testing)', 'production'],
            ['-d, --dev-dependencies', 'with devDependencies', false]
        ];
    }
    async run(flags, unknown) {
    console.log(this.context.get('env'))

        var _a;
        process.env.NODE_ENV = (_a = flags.mode) !== null && _a !== void 0 ? _a : 'production';
        this.debug(`Factory: (${this.factory.id})`, 'from command', `"${this.id}"`, 'flags:', flags, 'unknown:', unknown);
        this.logStart(`Start building:`);
        const template = this.context.get('config.factory.template');
        const config = config_1.default(template, {
            env: process.env.NODE_ENV
        });
        try {
            await this.build(config);
        }
        catch (err) {
            this.error('Failed to build project');
            // this.error(err).exit()
            console.log(err);
            this.exit();
        }
    }
    build(config) {
        const compiler = webpack_1.default(config);
        return new Promise((resolve, reject) => {
            compiler.run((err, stats) => {
                if (err) {
                    console.log('---');
                    console.error(err.stack || err);
                    if (err.details) {
                        console.error(err.details);
                    }
                    reject();
                }
                console.log(stats === null || stats === void 0 ? void 0 : stats.toString({
                    chunks: false,
                    colors: true // Shows colors in the console
                }));
                // const info = stats?.toJson()
                // if (stats?.hasErrors()) {
                //   console.error(info.errors)
                //   reject()
                // }
                // if (stats?.hasWarnings()) {
                //   console.warn(info.warnings)
                // }
                resolve();
            });
        });
    }
}
exports.default = CommandBuild;
