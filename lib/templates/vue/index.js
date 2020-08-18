"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fbi_1 = require("fbi");
const ejs = require("ejs");
const utils_1 = require("fbi/lib/utils");
class TemplateGraphql extends fbi_1.Template {
    constructor(factory) {
        super();
        this.factory = factory;
        this.id = 'vue';
        this.description = 'vue template for web template';
        this.path = 'templates/react';
        this.renderer = ejs.render;
    }
    async gathering() {
        const factory = this.context.get('config.factory');
        console.log(this.store.get(factory.id));
        this.features = (factory === null || factory === void 0 ? void 0 : factory.features) || {};
        this.data.project = {};
        let folder = 'react';
        if (this.features.react || (await this.fs.pathExists(path_1.join(this.targetDir, folder)))) {
            const ret = await this.prompt([
                {
                    type: 'input',
                    name: 'folder',
                    message: 'Already have react in the project, please input another name for react folder:',
                    validate: async (value, state) => {
                        const name = utils_1.formatName(value);
                        if (await this.fs.pathExists(path_1.join(this.targetDir, name))) {
                            return state.styles.danger(`path "${name}" already exist`);
                        }
                        return (name && true) || state.styles.danger('please input a valid folder name');
                    }
                }
            ]);
            folder = ret.folder;
        }
        this.data.project.folder = folder;
        this.spinner = this.createSpinner(`Creating reactw web...`).start(`Creating ${this.style.bold.green('react web')} via ${this.id} from ${factory.template}...`);
    }
    async writing() {
        this.targetDir = process.cwd();
        const { project } = this.data;
        this.files = {
            render: [
                {
                    from: 'react/**/*',
                    to: project.folder
                }
            ],
            renderOptions: {
                async: true
            }
        };
    }
    async installing(flags) {
        const { project } = this.data;
        this.spinner.succeed(`Created react in folder ${this.style.cyan.bold(project.folder)}`);
        const installSpinner = this.createSpinner(`Installing dependencies...`).start();
        try {
            const packageManager = flags.packageManager || this.context.get('config').packageManager;
            const cmds = packageManager === 'yarn' ? packageManager : `${packageManager} install`;
            this.debug(`\nrunning \`${cmds}\` in ${this.targetDir}`);
            await this.exec.command(cmds, {
                cwd: this.targetDir
            });
            installSpinner.succeed(`Installed dependencies`);
        }
        catch (err) {
            installSpinner.fail('Failed to install dependencies. You can install them manually.');
            this.error(err);
        }
    }
    async ending() {
        const { project } = this.data;
        const projectName = this.style.cyan.bold(project.folder);
        if (this.errors) {
            this.spinner.fail(`Failed to created react in folder ${projectName}.`);
            this.error(this.errors);
        }
        console.log(`
Next steps:`);
        console.log(`  modify "./prisma/schema.prisma" and "./prisma/seed.ts"`);
        console.log(`  ${this.style.bold('$')} ${this.style.cyan('fbi d -u')}`);
        console.log(`  ${this.style.bold('$')} ${this.style.cyan('fbi g')}`);
        console.log(`  ${this.style.bold('$')} ${this.style.cyan('fbi s')}`);
        console.log(`
  $ ${this.style.cyan('fbi list')} ${this.style.dim('show available commands and sub templates')}`);
        // TODO: update paroject config's features
    }
}
exports.default = TemplateGraphql;
