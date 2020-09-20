"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = require("path");
const fbi_1 = require("fbi");
const ejs = tslib_1.__importStar(require("ejs"));
const utils_1 = require("fbi/lib/utils");
const const_1 = require("../const");
class TemplateUmiQiankun extends fbi_1.Template {
    constructor(factory) {
        super();
        this.factory = factory;
        this.id = const_1.UMI_QIANKUN_TEMPLATE_ID;
        this.description = 'template for umi-qiankun';
        this.path = 'templates/umi-qiankun';
        this.renderer = ejs.render;
        this.templates = [];
    }
    async gathering() {
        // 获取暂存的项目参数
        this.data.project = this.configStore.get('projectInfo');
        const { factory, project } = this.data;
        this.spinner = this.createSpinner(`Creating project...`).start(`Creating ${this.style.bold.green(project.name)} via ${this.id} from ${factory.template}...`);
    }
    async writing() {
        // console.log(this.data)
        const { main, sub } = this.data.project.features;
        const mainFiles = main ? ['config/*', 'src/models/*', 'access.ts'] : [];
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
                '.prettierignore',
                '.prettierrc.js',
                'codegen.yml',
                'graphql.schema.json',
                'package-lock.json',
                'yarn.lock',
                'tsconfig.json',
                ...mainFiles,
                ...subFiles
            ],
            render: ['.fbi.config.js', 'package.json', 'src/app.tsx', '.umirc.ts', 'README.md', '.env'],
            renderOptions: {
                async: true
            }
        };
        // }
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
                await this.exec('git', ['init'], {
                    cwd: this.targetDir
                });
                await this.exec(cmds[0], cmds.slice(1), {
                    cwd: this.targetDir
                });
                await this.exec(cmds[0], cmds.slice(1), {
                    cwd: this.targetDir
                });
                installSpinner.succeed(`Installed dependencies`);
                const commintSpinner = this.createSpinner(`Git commit...`).start();
                try {
                    await this.exec('git', ['add', '.'], {
                        cwd: this.targetDir
                    });
                    await this.exec('git', ['commit', '-m', 'init'], {
                        cwd: this.targetDir
                    });
                    commintSpinner.succeed();
                }
                catch (err) {
                    commintSpinner.fail('Failed to git commit. You can check them, and then commit them manually.');
                }
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
