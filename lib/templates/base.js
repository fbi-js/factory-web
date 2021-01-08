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
const { formatName, isValidObject } = fbi_1.utils;
const { version } = require('../../package.json');
class TemplateWebBase extends fbi_1.Template {
    constructor(factory) {
        super(factory);
        this.factory = factory;
        this.id = 'web-base';
        this.renderer = ejs.render;
        this.features = [];
        this.copyFileTypes = 'jpg,png,gif,svg,mp4,mp3,webm,ogg,wav,flac,aac';
        this.copyFiles = ['.gitignore', '.editorconfig', '.prettierignore', 'public/*', '.vscode/*'];
        this.renderFileTypes = 'js,jsx,ts,tsx,css,scss,sass,less,md,vue';
        this.renderFiles = ['package.json', 'webpack.config.js', 'README.md'];
    }
    gathering(_flags) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const defaultName = (_b = (_a = this.data.project) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'project-demo';
            const isMicro = this.id.startsWith('micro-');
            this.data.factoryVersion = version;
            this.data.project = yield this.prompt([
                ...(isMicro
                    ? [
                        {
                            type: 'input',
                            name: 'orgName',
                            message: 'Organization name',
                            initial() {
                                return '';
                            },
                            validate(value) {
                                const name = formatName(value);
                                return (name && true) || 'please input a valid organization name';
                            }
                        }
                    ]
                    : []),
                {
                    type: 'input',
                    name: 'name',
                    message: 'Project name',
                    initial() {
                        return defaultName;
                    },
                    validate(value) {
                        const name = formatName(value);
                        return (name && true) || 'please input a valid project name';
                    }
                },
                {
                    type: 'input',
                    name: 'description',
                    message: 'Project description',
                    initial({ state }) {
                        return `${state.answers.name} description`;
                    }
                },
                ...(this.features.length > 0
                    ? [
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
                    ]
                    : [])
            ]);
        });
    }
    getCopyFiles() {
        var _a, _b;
        const isTs = (_b = (_a = this.data.project) === null || _a === void 0 ? void 0 : _a.features) === null || _b === void 0 ? void 0 : _b.typescript;
        const srcFolder = `src${isTs ? '-ts' : ''}`;
        return [
            ...this.copyFiles,
            isTs ? 'tsconfig.json' : '',
            {
                from: `${srcFolder}/**/*.{${this.copyFileTypes}}`,
                to: 'src'
            }
        ].filter(Boolean);
    }
    getRenderFiles() {
        var _a, _b;
        const isMicro = this.id.startsWith('micro-');
        const isTs = (_b = (_a = this.data.project) === null || _a === void 0 ? void 0 : _a.features) === null || _b === void 0 ? void 0 : _b.typescript;
        const srcFolder = `src${isTs ? '-ts' : ''}`;
        return [
            ...this.renderFiles,
            isMicro ? 'micro.config.js' : '',
            {
                from: `${srcFolder}/**/*.{${this.renderFileTypes}}`,
                to: 'src'
            }
        ].filter(Boolean);
    }
    writing() {
        return __awaiter(this, void 0, void 0, function* () {
            const debug = !!this.context.get('debug');
            this.files = {
                copy: this.getCopyFiles(),
                render: this.getRenderFiles(),
                renderOptions: {
                    async: true,
                    debug,
                    compileDebug: debug
                }
            };
        });
    }
    installing(flags) {
        return __awaiter(this, void 0, void 0, function* () {
            const { project } = this.data;
            this.spinner.succeed(`Created project ${this.style.cyan.bold(project.name)}`);
            const { dependencies, devDependencies } = require(path_1.join(this.targetDir, 'package.json'));
            if (isValidObject(dependencies) || isValidObject(devDependencies)) {
                const installSpinner = this.createSpinner('Installing dependencies...').start();
                try {
                    yield this.installDeps(this.targetDir, flags.packageManager, false);
                    installSpinner.succeed('Installed dependencies');
                }
                catch (err) {
                    installSpinner.fail('Failed to install dependencies. You can install them manually.');
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
Next steps:`);
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
