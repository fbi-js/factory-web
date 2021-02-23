"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const ejs = __importStar(require("ejs"));
const path_1 = require("path");
const fbi_1 = require("fbi");
const glob = require("tiny-glob");
const { formatName, isValidObject } = fbi_1.utils;
const { name, version } = require('../../package.json');
class TemplateWebBase extends fbi_1.Template {
    constructor(factory) {
        super(factory);
        this.factory = factory;
        this.id = 'web-base';
        this.renderer = ejs.render;
        this.features = [];
        this.whiteList = [];
        this.blackList = [];
    }
    get enterOrgName() {
        const validateMsg = 'please input a valid organization name';
        const isMicro = this.id.startsWith('micro-');
        const orgName = {
            type: 'input',
            name: 'orgName',
            message: 'Organization name',
            initial() {
                return '';
            },
            validate(value) {
                const name = formatName(value);
                return (name && true) || validateMsg;
            }
        };
        return isMicro ? [orgName] : [];
    }
    get enterProjectName() {
        var _a, _b;
        const validateMsg = 'please input a valid project name';
        const defaultName = (_b = (_a = this.data.project) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'project-demo';
        return {
            type: 'input',
            name: 'name',
            message: 'Project name',
            initial() {
                return defaultName;
            },
            validate(value) {
                const name = formatName(value);
                return (name && true) || validateMsg;
            }
        };
    }
    get enterProjectDescription() {
        return {
            type: 'input',
            name: 'description',
            message: 'Project description',
            initial({ state }) {
                return `${state.answers.name} description`;
            }
        };
    }
    get selectFeatures() {
        const hasFeatures = this.features.length > 0;
        const selectFeatures = {
            type: 'MultiSelect',
            name: 'features',
            message: 'Choose features for your project:',
            hint: '(Use <space> to select, <return> to submit)',
            choices: this.features,
            result(names) {
                return this.map(names);
            }
        };
        return hasFeatures ? [selectFeatures] : [];
    }
    getPromptOptions() {
        return [
            ...this.enterOrgName,
            this.enterProjectName,
            this.enterProjectDescription,
            ...this.selectFeatures
        ];
    }
    gathering(_flags) {
        return __awaiter(this, void 0, void 0, function* () {
            this.data.factoryVersion = version;
            this.data.factoryId = name;
            this.data.project = yield this.prompt(this.getPromptOptions());
        });
    }
    /**
     * from -> /factory-web/templates/${template}/src-ts/routes/index.ts.ejs
     * to -> ${this.targetDir}/src-ts/routes/index.ts
     * @param srcPath file entry path
     */
    getOutputPath(srcPath) {
        const { template } = this.data.factory;
        const formatPath = srcPath
            .replace(/(.*)(templates)(.*)/, '$3')
            .replace(`/${template}`, '')
            .replace(/(.*)(.ejs)$/, '$1');
        const outputPath = `${this.targetDir}${formatPath}`;
        return outputPath;
    }
    /**
     * copy or render file from srcPath to outputPath, .ejs file will be render by ejs
     * @param srcPath file entry path
     * @param outputPath file output path
     */
    writeFile(srcPath, outputPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const isEjsFile = /(.*)(.ejs)$/.test(srcPath);
            if (!isEjsFile) {
                this.fs.copy(srcPath, outputPath, {});
            }
            else {
                const content = yield this.fs.readFile(srcPath, 'utf8');
                const rendered = yield this.renderer(content.trim() + '\n', Object.assign({}, this.data), {
                    async: true
                });
                yield this.fs.outputFile(outputPath, rendered, {});
            }
            console.log(this.style.grey(`创建文件: ${outputPath}`));
            this.debug('writing file', {
                srcPath,
                outputPath
            });
        });
    }
    /**
     *
     * @param files 文件列表
     */
    writingFiles(files) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const srcPath of files) {
                const isExist = yield this.fs.pathExists(srcPath);
                const outputPath = this.getOutputPath(srcPath);
                const stats = yield this.fs.stat(srcPath);
                if (isExist) {
                    if (stats.isFile()) {
                        try {
                            this.writeFile(srcPath, outputPath);
                        }
                        catch (error) {
                            this.debug('创建文件异常', {
                                srcPath,
                                outputPath,
                                error
                            });
                        }
                    }
                    else {
                        yield this.fs.ensureDir(outputPath);
                    }
                }
            }
        });
    }
    writing() {
        return __awaiter(this, void 0, void 0, function* () {
            // const debug = !!this.context.get('debug')
            const { factory, project } = this.data;
            const { path, template } = factory;
            let templatePath;
            const isWiiFe = template && template.indexOf('wii') > -1;
            if (isWiiFe) {
                templatePath = path_1.resolve(__dirname, `../../templates/${template}`);
            }
            else {
                templatePath = path_1.join(path, 'templates', template);
            }
            console.log('\n');
            const writingSpinner = this.createSpinner(this.style.green(`开始创建项目: ${project.name}\n`)).start();
            // 获取指定template path下的文件列表
            const files = yield glob(`${templatePath}/**/*`, {
                cwd: process.cwd(),
                dot: true
            });
            // 创建项目
            yield this.writingFiles(files);
            // ejs render是异步渲染，无截止回调，暂时延迟300ms表示创建成功
            yield new Promise((resolve) => {
                setTimeout(() => {
                    writingSpinner.succeed(this.style.green(`创建项目 ${project.name} 成功\n\n`));
                    resolve('');
                }, 300);
            });
        });
    }
    installing(flags) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dependencies, devDependencies } = require(path_1.join(this.targetDir, 'package.json'));
            if (isValidObject(dependencies) || isValidObject(devDependencies)) {
                const installSpinner = this.createSpinner('安装依赖中...').start();
                try {
                    yield this.installDeps(this.targetDir, flags.packageManager, false);
                    installSpinner.succeed('安装依赖成功！\n');
                }
                catch (err) {
                    installSpinner.fail('\n安装依赖失败！');
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
后续使用步骤:`);
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
