"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fbi_1 = require("fbi");
const ejs = require("ejs");
const utils_1 = require("fbi/lib/utils");
class TemplateFactory extends fbi_1.Template {
    constructor(factory) {
        super();
        this.factory = factory;
        this.id = 'react';
        this.description = 'template for factory-web';
        this.path = 'templates/react';
        this.renderer = ejs.render;
        this.templates = [];
    }
    async gathering() {
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
            }
            // {
            //   type: 'Select',
            //   name: 'subtemplate',
            //   message: `Pick subtemplate for your project:`,
            //   hint: '(Use <arrow> to select, <return> to submit)',
            //   choices: [
            //     { name: 'vue', value: true },
            //     { name: 'react', value: true }
            //   ],
            //   result(names: string[]) {
            //     return this.map(names)
            //   }
            // }
        ]);
        this.data.project.nameCapitalized = utils_1.capitalizeEveryWord(this.data.project.name);
        const { factory, project } = this.data;
        this.spinner = this.createSpinner(`Creating project...`).start(`Creating ${this.style.bold.green(project.name)} via ${factory.id} from ${factory.template}...`);
    }
    async writing() {
        // const { project } = this.data
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
        console.log(`  ${this.style.bold('$')} ${this.style.cyan('fbi s')}`);
        console.log(`  ${this.style.bold('$')} ${this.style.cyan('fbi b')}`);
        console.log(`
  $ ${this.style.cyan('fbi list')} ${this.style.dim('show available commands and sub templates')}`);
    }
}
exports.default = TemplateFactory;
