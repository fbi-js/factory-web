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
Object.defineProperty(exports, "__esModule", { value: true });
const fbi_1 = require("fbi");
class CommandFormat extends fbi_1.Command {
    constructor(factory) {
        super();
        this.factory = factory;
        this.id = 'format';
        this.alias = 'f';
        this.description = 'format code with prettier and eslint --fix';
        this.args = '';
        this.flags = [];
    }
    run(flags, unknown) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            process.env.NODE_ENV = (_a = flags.mode) !== null && _a !== void 0 ? _a : 'production';
            process.env.MICRO_MODE = (_b = flags.microMode) !== null && _b !== void 0 ? _b : '';
            this.debug(`Factory: (${this.factory.id})`, 'from command', `"${this.id}"`, 'flags:', flags, 'unknown:', unknown);
            this.logStart('Formatting code...');
            const factory = this.context.get('config.factory');
            try {
                yield this.formatWithPrettier(factory);
                yield this.formatWithEslint(factory);
            }
            catch (err) {
                const msg = this.catchFatalErrors(err);
                if (msg) {
                    this.error(msg).exit();
                }
            }
        });
    }
    formatWithPrettier(factory) {
        const exts = this.getFileExts(factory);
        return this.exec.command(`npx prettier --write "src/**/*.{${exts.join(',')}}"`, {
            stdio: 'inherit',
            shell: true
        });
    }
    formatWithEslint(config) {
        const exts = this.getFileExts(config);
        return this.exec.command(`npx eslint --ext ${exts.join(',')} src --fix`, {
            stdio: 'inherit'
        });
    }
    getFileExts(factory) {
        var _a;
        return ['js', 'jsx']
            .concat(((_a = factory.features) === null || _a === void 0 ? void 0 : _a.typescript) ? ['ts,tsx'] : [])
            .concat(factory.template === 'vue' ? ['vue'] : []);
    }
    catchFatalErrors(err) {
        // https://prettier.io/docs/en/cli.html#exit-codes
        // https://eslint.org/docs/user-guide/migrating-to-5.0.0#fatal-errors-now-result-in-an-exit-code-of-2
        if ((err === null || err === void 0 ? void 0 : err.exitCode) === 2) {
            return err.message;
        }
        return '';
    }
}
exports.default = CommandFormat;
