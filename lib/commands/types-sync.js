"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fbi_1 = require("fbi");
const node_fetch_1 = __importDefault(require("node-fetch"));
class CommandSyncTypes extends fbi_1.Command {
    constructor(factory) {
        super();
        this.factory = factory;
        this.id = 'ts-sync';
        this.alias = 'tss';
        this.description = 'sync typing files from webpack5 module-faderation remotes modules';
        this.args = '';
        this.flags = [];
    }
    async run(flags, unknown) {
        this.debug(`Factory: (${this.factory.id})`, 'from command', `"${this.id}"`, 'flags:', flags, 'unknown:', unknown);
        this.logStart(`Sync typings...`);
        try {
            await this.generate();
        }
        catch (err) {
            this.error('Failed to build project');
            console.log(err);
            this.exit();
        }
    }
    generate() {
        const https = require('https');
        const fs = require('fs-extra');
        const path = require('path');
        const appDirectory = fs.realpathSync(process.cwd());
        const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
        const { remotesConfigArr } = require(resolveApp('federation.config'));
        async function fetchText(remoteUrl) {
            const text = await (await node_fetch_1.default(remoteUrl)).text();
            return text;
        }
        try {
            remotesConfigArr.forEach(async (item) => {
                const folderPath = `src/${item.remoteTypesPath}`;
                const savePath = `${folderPath}/${item.remoteModuleName}.d.ts`;
                const resolveSavePath = resolveApp(path.join(savePath));
                console.log(resolveSavePath);
                if (!fs.existsSync(resolveSavePath)) {
                    fs.mkdirSync(resolveApp(folderPath));
                    fs.createFileSync(resolveSavePath);
                }
                const text = await fetchText(`${item.remoteUrl}${item.remoteTypesPath}/${item.remoteModuleName}.d.ts`);
                const reg = new RegExp(`${item.remoteModuleName}/`, 'g');
                const replacedText = text.replace(reg, `${item.aliasModuleName}/`);
                fs.writeFileSync(resolveSavePath, replacedText);
                console.log('\x1b[36m%s\x1b[0m', '==== Success! ====');
            });
        }
        catch (e) {
            console.log('Error:', e);
            process.exit(1);
        }
    }
}
exports.default = CommandSyncTypes;
