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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const base_1 = __importDefault(require("./base"));
class TemplateReact extends base_1.default {
    constructor(factory) {
        super(factory);
        this.factory = factory;
        this.id = 'react';
        this.path = path_1.join(__dirname, '../../templates/react');
        this.description = 'template for React.js application';
        this.templates = [];
        this.features = [
            { name: 'typescript', value: true },
            { name: 'admin', hint: 'antd, axios, basic components(layout, menu, breadcrumb, topbar)' }
        ];
    }
    gathering(flags) {
        const _super = Object.create(null, {
            gathering: { get: () => super.gathering }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.gathering.call(this, flags);
            const { factory, project } = this.data;
            this.spinner = this.createSpinner('Creating project...').start(`Creating ${this.style.bold.green(project.name)} via ${factory.id} from ${factory.template}...`);
        });
    }
    writing() {
        const _super = Object.create(null, {
            writing: { get: () => super.writing }
        });
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.writing.call(this);
            const isMicro = this.id.startsWith('micro-');
            const isTs = (_b = (_a = this.data.project) === null || _a === void 0 ? void 0 : _a.features) === null || _b === void 0 ? void 0 : _b.typescript;
            const isReact = this.id === 'react' || this.id === 'micro-react';
            const isReactAdmin = isReact && ((_d = (_c = this.data.project) === null || _c === void 0 ? void 0 : _c.features) === null || _d === void 0 ? void 0 : _d.admin);
            const defaultFromToFileMap = {
                from: `src${isTs ? '-ts' : ''}/**/*.{js,jsx,css,scss,sass,less,md,vue}`,
                to: 'src'
            };
            let fromToFileMaps = [defaultFromToFileMap];
            const prefix = `src${isTs ? '-ts' : ''}`;
            if (isReact) {
                const genTsOrJsFromStr = (isTs, folderName) => {
                    return `${prefix}/${folderName}/index.${isTs ? 'ts' : 'js'}`;
                };
                const folders = ['apis', 'components', 'helpers', 'pages', 'routes', 'typings'];
                const genReadmeFromStr = (folderName) => {
                    return `${prefix}/${folderName}/README.md`;
                };
                const tsOrJsfileMaps = folders.map(folder => {
                    return {
                        from: genTsOrJsFromStr(isTs, folder),
                        to: 'src'
                    };
                });
                const readmeFileMaps = folders.map(folder => {
                    return {
                        from: genReadmeFromStr(folder),
                        to: 'src'
                    };
                });
                fromToFileMaps = [
                    ...readmeFileMaps,
                    ...tsOrJsfileMaps,
                    {
                        from: `${prefix}/assets/*`,
                        to: 'src'
                    },
                    {
                        from: `${prefix}/configs/*`,
                        to: 'src'
                    },
                    {
                        from: `${prefix}/app.css`,
                        to: 'src'
                    },
                    {
                        from: `${prefix}/App.${isTs ? 'tsx' : 'js'}`,
                        to: 'src'
                    },
                    {
                        from: `${prefix}/index.css`,
                        to: 'src'
                    },
                    {
                        from: `${prefix}/bootstrap.${isTs ? 'tsx' : 'js'}`,
                        to: 'src'
                    },
                    {
                        from: `${prefix}/main.${isTs ? 'ts' : 'js'}`,
                        to: 'src'
                    },
                    isTs && {
                        from: `${prefix}/shims-react.d.ts`,
                        to: 'src'
                    }
                ];
            }
            if (isReactAdmin && !isMicro) {
                fromToFileMaps = [
                    {
                        from: `${prefix}/**/*.{ts,tsx,js,jsx,md,scss,less,svg,css}`,
                        to: 'src'
                    }
                ];
            }
            this.files.render = [
                'package.json',
                'webpack.config.js',
                'README.md',
                isMicro ? 'micro.config.js' : '',
                ...fromToFileMaps
            ].filter(Boolean);
        });
    }
}
exports.default = TemplateReact;
