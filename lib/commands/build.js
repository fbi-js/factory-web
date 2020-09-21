"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fbi_1 = require("fbi");
const const_1 = require("../const");
const runReactBuildScript = require('./react/scripts/build.js');
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
        var _a, _b;
        process.env.NODE_ENV = (_a = flags.mode) !== null && _a !== void 0 ? _a : 'production';
        this.debug(`Factory: (${this.factory.id})`, 'from command', `"${this.id}"`, 'flags:', flags, 'unknown:', unknown);
        const _cwd = process.cwd();
        const distDirName = 'dist';
        const distDir = path_1.join(_cwd, distDirName);
        // const srcDir = join(_cwd, tsconifg.compilerOptions.rootDir||'src')
        this.logStart(`Start building:`);
        this.logItem(`remove '${distDirName}'...`);
        await this.fs.remove(distDir);
        const execOpts = {
            ...this.factory.execOpts,
            stdio: flags.debug ? 'inherit' : 'pipe',
            env: {
                BUILD_ENV: (_b = flags.mode) !== null && _b !== void 0 ? _b : 'development'
            }
        };
        const templateId = this.context.get('config.factory.template');
        try {
            const buildSpinner = this.createSpinner(`building...`).start();
            if (templateId === const_1.REACT_TEMPLATE_ID) {
                await runReactBuildScript();
            }
            else if (templateId === const_1.MICRO_TEMPLATE_ID) {
                await this.exec.command('umi build', execOpts);
                buildSpinner.succeed();
            }
        }
        catch (err) {
            this.error('Failed to build project');
            this.error(err).exit();
        }
    }
}
exports.default = CommandBuild;
