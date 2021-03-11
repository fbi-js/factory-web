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
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fbi_1 = require("fbi");
const glob = require("tiny-glob");
const { isValidObject } = fbi_1.utils;
const { version } = require('../../package.json');
class TemplateWebBase extends fbi_1.Template {
    constructor(factory) {
        super(factory);
        this.factory = factory;
        this.id = 'web-base';
        this.features = [];
        this.path = '';
        this.rule = {
            glob: '**/*',
            ignores: [] // examples: 'src/test/test.ts', 'src/test/test.*', 'src/test*'
        };
        this.prompts = [];
    }
    /**
     * get template prompt options
     */
    getPromptOptions() {
        const { name } = this.data.project;
        const defaultPrompts = [
            {
                type: 'input',
                name: 'description',
                message: 'Project description',
                initial({ state }) {
                    return `${name} description`;
                }
            },
            {
                type: 'MultiSelect',
                name: 'features',
                message: 'Choose features for your project:',
                hint: '(Use <space> to select, <return> to submit)',
                choices: this.features,
                result(names) {
                    return this.map(names);
                }
            }
        ];
        return [...defaultPrompts, ...this.prompts];
    }
    gathering(_flags) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = this.data.project;
            const defaultProject = {
                name: name,
                description: `${name} description`,
                features: '[]'
            };
            const project = yield this.prompt(this.getPromptOptions());
            this.data.factoryVersion = version;
            this.data.factoryId = name;
            this.data.project = Object.assign(Object.assign({}, defaultProject), project);
        });
    }
    writing() {
        return __awaiter(this, void 0, void 0, function* () {
            const { project } = this.data;
            console.log('\n');
            const writingSpinner = this.createSpinner(this.style.green(`start create project: ${project.name}\n`)).start();
            // 获取指定template path下的文件列表
            const files = yield glob(`${this.path}/**/*`, {
                cwd: process.cwd(),
                dot: true,
                absolute: true
            });
            // 创建项目
            yield this.writingFiles(files);
            writingSpinner.succeed(this.style.green(`create project ${project.name} success!\n\n`));
        });
    }
    installing(flags) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dependencies, devDependencies } = require(path_1.join(this.targetDir, 'package.json'));
            if (isValidObject(dependencies) || isValidObject(devDependencies)) {
                const env = this.context.get('env');
                const config = this.context.get('config');
                const packageManager = env.hasYarn ? 'yarn' : config.packageManager;
                // if use yarn install, not need spinner
                const installSpinner = this.createSpinner(`${packageManager} install`).start();
                try {
                    yield this.installDeps(this.targetDir, packageManager, false);
                    installSpinner.succeed('install dependencies success!\n');
                }
                catch (err) {
                    installSpinner.fail('install dependencies fail!\n');
                    this.error(err);
                }
            }
        });
    }
    ending() {
        return __awaiter(this, void 0, void 0, function* () {
            const { project } = this.data;
            const projectName = this.style.cyan.bold(project.name);
            if (this.errors) {
                this.spinner.fail(`Failed to created project ${projectName}.`);
                this.error(this.errors);
            }
            console.log(`
next steps:`);
            if (this.data.subDirectory) {
                console.log(`
  $ ${this.style.cyan('cd ' + project.name)}`);
            }
            console.log(`
  $ ${this.style.cyan('npm run dev')} ${this.style.dim('launch the development server')}`);
            console.log(`
  $ ${this.style.cyan('npm run build')} ${this.style.dim('build project')}
  `);
        });
    }
}
exports.default = TemplateWebBase;
