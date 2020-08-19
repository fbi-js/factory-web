"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fbi_1 = require("fbi");
const ejs = require("ejs");
const utils_1 = require("fbi/lib/utils");
const react_1 = require("./react");
const vue_1 = require("./vue");
class TemplateFactory extends fbi_1.Template {
    constructor(factory) {
        super();
        this.factory = factory;
        this.id = 'react';
        this.description = 'template for factory-web';
        this.path = 'templates/react';
        this.renderer = ejs.render;
        this.templates = [new react_1.default(this.factory), new vue_1.default(this.factory)];
    }
    async gathering() {
        var _a, _b, _c, _d;
        this.data.project = await this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Input the project name',
                initial({ enquirer }) {
                    return 'project-demo';
                },
                validate(value) {
                    const name = utils_1.formatName(value);
                    return (name && true) || 'please input a valid project name';
                }
            },
            {
                type: 'input',
                name: 'description',
                message: 'Input project description',
                initial({ state }) {
                    return `${state.answers.name} description`;
                }
            },
            {
                type: 'Select',
                name: 'subtemplate',
                message: `Pick subtemplate for your project:`,
                hint: '(Use <arrow> to select, <return> to submit)',
                choices: [
                    { name: 'vue', value: true },
                    { name: 'react', value: true }
                ],
                result(names) {
                    return this.map(names);
                }
            }
        ]);
        this.data.project.nameCapitalized = utils_1.capitalizeEveryWord(this.data.project.name);
        const factoryInfo = this.store.get(this.factory.id);
        this.templates[0].run({
            factory: {
                id: factoryInfo.id,
                path: ((_b = (_a = factoryInfo.version) === null || _a === void 0 ? void 0 : _a.latest) === null || _b === void 0 ? void 0 : _b.dir) || factoryInfo.path,
                version: (_d = (_c = factoryInfo.version) === null || _c === void 0 ? void 0 : _c.latest) === null || _d === void 0 ? void 0 : _d.short,
                template: 'react-web'
            }
        }, []);
        const { factory, project } = this.data;
        this.spinner = this.createSpinner(`Creating project...`).start(`Creating ${this.style.bold.green(project.name)} via ${factory.id} from ${factory.template}...`);
    }
    async writing() {
        const { project } = this.data;
        this.files = {
            copy: ['.gitignore', 'vite.config.js', 'index.html', 'src/*', 'tsconfig.json'],
            render: ['package.json', '.fbi.config.js', 'README.md', 'src/*'],
            renderOptions: {
                async: true
            }
        };
    }
    async installing(flags) {
        const { project } = this.data;
        this.spinner.succeed(`Created project ${this.style.cyan.bold(project.name)}`);
        const { dependencies, devDependencies } = require(path_1.join(this.targetDir, 'package.json'));
        if (utils_1.isValidObject(dependencies) || utils_1.isValidObject(devDependencies)) {
            const installSpinner = this.createSpinner(`Installing dependencies...`).start();
            try {
                const packageManager = flags.packageManager || this.context.get('config').packageManager;
                const cmds = packageManager === 'yarn' ? [packageManager] : [packageManager, 'install'];
                this.debug(`\nrunning \`${cmds.join(' ')}\` in ${this.targetDir}`);
                await this.exec(cmds[0], cmds.slice(1), {
                    cwd: this.targetDir
                });
                installSpinner.succeed(`Installed dependencies`);
            }
            catch (err) {
                installSpinner.fail('Failed to install dependencies. You can install them manually.');
                this.error(err);
            }
        }
    }
    async ending() {
        const { project } = this.data;
        const projectName = this.style.cyan.bold(project.name);
        if (this.errors) {
            this.spinner.fail(`Failed to created project ${projectName}.`);
            this.error(this.errors);
        }
        if (this.errors) {
            this.spinner.fail(`Failed to created project ${projectName}.`);
            this.error(this.errors);
        }
        console.log(`
Next steps:
  $ ${this.style.cyan('cd ' + project.name)}
  `);
        if (project.features.prisma) {
            console.log(`  modify "./prisma/schema.prisma" and "./prisma/seed.ts"`);
            console.log(`  ${this.style.bold('$')} ${this.style.cyan('fbi d -u')}`);
            console.log(`  ${this.style.bold('$')} ${this.style.cyan('fbi g')}`);
        }
        console.log(`  ${this.style.bold('$')} ${this.style.cyan('fbi s')}`);
        console.log(`
  $ ${this.style.cyan('fbi list')} ${this.style.dim('show available commands and sub templates')}`);
    }
}
exports.default = TemplateFactory;
