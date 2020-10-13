"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = require("path");
const ejs = tslib_1.__importStar(require("ejs"));
const fbi_1 = require("fbi");
const common_1 = require("./common");
const const_1 = require("../const");
const { capitalizeEveryWord, isValidObject } = fbi_1.utils;
class TemplateUmiQiankun extends fbi_1.Template {
    constructor(factory) {
        super();
        this.factory = factory;
        this.id = const_1.MICRO_TEMPLATE_ID;
        this.description = 'template for micro front-end application';
        this.path = 'templates/micro';
        this.renderer = ejs.render;
        this.templates = [];
    }
    async gathering(flags) {
        // 获取暂存的项目参数
        const defaultName = (this.data.project && this.data.project.name) || 'project-demo';
        const nameAndDescriptionConfig = common_1.getNameAndDescriptionConfig(defaultName);
        this.data.project = await this.prompt([
            {
                type: 'select',
                name: 'features',
                message: `Which feature of micro do you want to choice?`,
                hint: '(Use <arrow> to select, <return> to submit)',
                choices: [
                    { name: const_1.MICRO_MAIN_FEATURE_ID, value: true },
                    { name: const_1.MICRO_SUB_FEATURE_ID, value: true }
                ],
                result(name) {
                    return {
                        [name]: true
                    };
                }
            },
            ...nameAndDescriptionConfig
        ]);
        let { factory, project } = this.data;
        this.spinner = this.createSpinner(`Creating project...`).start(`Creating ${this.style.bold.green(project.name)} via ${factory.id} from ${factory.template}...`);
        project.nameCapitalized = capitalizeEveryWord(project.name);
        project = {
            ...project,
            templateId: const_1.MICRO_TEMPLATE_ID
        };
    }
    async writing() {
        const { main, sub } = this.data.project.features;
        const mainFiles = main ? ['config/*', 'src/models/*', 'src/access.ts'] : [];
        const subFiles = sub ? [] : [];
        this.files = {
            copy: [
                '.vscode/*',
                'mock/*',
                'src/components/*',
                'src/config/*',
                'src/generated/*',
                'src/graphql/*',
                'src/pages/*',
                'src/Apollo.ts',
                '.eslintignore',
                '.eslintrc.js',
                '.gitignore',
                '.npmrc',
                '.prettierignore',
                '.prettierrc.js',
                '.stylelintrc.js',
                'codegen.yml',
                'graphql.schema.json',
                'package-lock.json',
                'yarn.lock',
                'tsconfig.json',
                '.editorconfig',
                'typings.d.ts',
                ...mainFiles,
                ...subFiles
            ],
            render: ['.fbi.config.js', 'package.json', 'src/app.tsx', '.umirc.ts', 'README.md', '.env'],
            renderOptions: {
                async: true
            }
        };
    }
    async installing(flags) {
        const { project } = this.data;
        this.spinner.succeed(`Created project ${this.style.cyan.bold(project.name)}`);
        const { dependencies, devDependencies } = require(path_1.join(this.targetDir, 'package.json'));
        if (isValidObject(dependencies) || isValidObject(devDependencies)) {
            const installSpinner = this.createSpinner(`Installing dependencies...`).start();
            try {
                await this.installDeps(this.targetDir, flags.packageManager, false);
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
        console.log(`
Next steps:
  $ ${this.style.cyan('cd ' + project.name)}
  `);
        console.log(`
  $ ${this.style.cyan('fbi s')} ${this.style.dim('launch the serve')}`);
        console.log(`
  $ ${this.style.cyan('fbi b')} ${this.style.dim('build project')}`);
        console.log(`
  $ ${this.style.cyan('fbi list')} ${this.style.dim('show available commands and sub templates')}`);
    }
}
exports.default = TemplateUmiQiankun;
