"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fbi_1 = require("fbi");
const { isValidObject } = fbi_1.utils;
class CommandInstall extends fbi_1.Command {
    constructor(factory) {
        super();
        this.factory = factory;
        this.id = 'install';
        this.alias = 'i';
        this.description = 'install deps';
        this.args = '';
        this.flags = [];
    }
    async run(flags, unknown) {
        const template = this.context.get('config.factory.template');
        const { deps } = require(`../config/${template}`);
        const depsArr = Object.entries(deps).map(([name, version]) => `${name}@${version}`);
        if (isValidObject(deps)) {
            const pm = this.context.get('config').packageManager;
            let cmds = [pm, 'install', '--no-save'];
            // pnpm: Headless installation requires a pnpm-lock.yaml file
            cmds.push(pm === 'npm' ? '--no-package-lock' : pm === 'yarn' ? '--no-lockfile' : '');
            cmds = cmds.concat(depsArr);
            console.log(cmds);
            await this.exec(cmds[0], cmds.slice(1).filter(Boolean), {
                stdout: 'inherit',
                cwd: process.cwd()
            });
        }
    }
}
exports.default = CommandInstall;
