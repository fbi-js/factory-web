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
        if (!template) {
            return;
        }
        let deps;
        try {
            const config = require(`../config/${template}`);
            deps = config.deps;
        }
        catch (err) { }
        if (!deps) {
            return;
        }
        const depsArr = Object.entries(deps).map(([name, version]) => `${name}@${version}`);
        if (!isValidObject(deps)) {
            return;
        }
        const pm = this.context.get('config').packageManager;
        const cmds = [pm, pm === 'yarn' ? 'add' : 'install', '-D', ...depsArr];
        this.logStart(`${cmds.join(' ')}...`);
        try {
            await this.exec(cmds[0], cmds.slice(1).filter(Boolean), {
                stdout: 'inherit',
                cwd: process.cwd()
            });
            this.logEnd(`Installed successfully`);
        }
        catch (error) {
            this.error(error).exit();
        }
    }
}
exports.default = CommandInstall;
