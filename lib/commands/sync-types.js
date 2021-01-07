"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fbi_1 = require("fbi");
class CommandSyncTypes extends fbi_1.Command {
    constructor(factory) {
        super();
        this.factory = factory;
        this.id = 'ts-sync';
        this.alias = 'tss';
        this.description = 'sync typing files from webpack5 module-faderatin remotes modules';
        this.args = '';
        this.flags = [];
    }
    async run(flags, unknown) {
        var _a, _b;
        process.env.NODE_ENV = (_a = flags.mode) !== null && _a !== void 0 ? _a : 'production';
        process.env.MICRO_MODE = (_b = flags.microMode) !== null && _b !== void 0 ? _b : '';
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
        const axios = require('axios');
        const https = require('https');
        const fs = require('fs-extra');
        const path = require('path');
        const appDirectory = fs.realpathSync(process.cwd());
        const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
        const { remotesConfigArr } = require(resolveApp('federation.config'));
        async function fetchText(remoteUrl) {
            const response = await axios({
                url: remoteUrl,
                method: 'GET'
            });
            return response.data;
        }
        try {
            remotesConfigArr.forEach(async (item) => {
                const savePath = `src/${item.remoteTypesPath}/${item.remoteModuleName}.d.ts`;
                const resolveSavePath = resolveApp(path.join(savePath));
                console.log(resolveSavePath);
                if (!fs.existsSync(resolveSavePath)) {
                    fs.mkdirSync(resolveApp(`src/${item.remoteTypesPath}`));
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
