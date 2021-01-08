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
const node_fetch_1 = __importDefault(require("node-fetch"));
class CommandTypesSync extends fbi_1.Command {
    constructor(factory) {
        super();
        this.factory = factory;
        this.id = 'ts-sync';
        this.alias = 'tss';
        this.description = 'sync typing files from webpack5 module-faderation remotes modules';
        this.args = '';
        this.flags = [];
    }
    run(flags, unknown) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug(`Factory: (${this.factory.id})`, 'from command', `"${this.id}"`, 'flags:', flags, 'unknown:', unknown);
            this.logStart('Sync typings...');
            try {
                yield this.sync();
            }
            catch (err) {
                this.error('Failed to Sync typings');
                this.error(err).exit();
            }
        });
    }
    sync() {
        const fs = require('fs-extra');
        const path = require('path');
        const appDirectory = fs.realpathSync(process.cwd());
        const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
        const { remotesConfigArr } = require(resolveApp('federation.config'));
        function fetchText(remoteUrl) {
            return __awaiter(this, void 0, void 0, function* () {
                const text = yield (yield node_fetch_1.default(remoteUrl)).text();
                return text;
            });
        }
        remotesConfigArr.forEach((item) => __awaiter(this, void 0, void 0, function* () {
            const folderPath = `src/${item.remoteTypesPath}`;
            const savePath = `${folderPath}/${item.remoteModuleName}.d.ts`;
            const resolveSavePath = resolveApp(path.join(savePath));
            console.log(resolveSavePath);
            if (!fs.existsSync(resolveSavePath)) {
                fs.mkdirSync(resolveApp(folderPath));
                fs.createFileSync(resolveSavePath);
            }
            const text = yield fetchText(`${item.remoteUrl}${item.remoteTypesPath}/${item.remoteModuleName}.d.ts`);
            const reg = new RegExp(`${item.remoteModuleName}/`, 'g');
            const replacedText = text.replace(reg, `${item.aliasModuleName}/`);
            fs.writeFileSync(resolveSavePath, replacedText);
            console.log('\x1b[36m%s\x1b[0m', '==== Success! ====');
        }));
    }
}
exports.default = CommandTypesSync;
