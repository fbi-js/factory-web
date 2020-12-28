"use strict";
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
            { name: 'admin', value: true }
        ];
    }
    async gathering(flags) {
        await super.gathering(flags);
        const { factory, project } = this.data;
        this.spinner = this.createSpinner(`Creating project...`).start(`Creating ${this.style.bold.green(project.name)} via ${factory.id} from ${factory.template}...`);
    }
    // rewrite render files
    async writing() {
        var _a, _b, _c, _d;
        await super.writing();
        this.data.project = Object.assign(Object.assign({}, this.data.project), { features: Object.assign({}, this.data.project.features) });
        const isMicro = this.id.startsWith('micro-');
        let isTs = (_b = (_a = this.data.project) === null || _a === void 0 ? void 0 : _a.features) === null || _b === void 0 ? void 0 : _b.typescript;
        const isReact = this.id === 'react';
        const isReactAdmin = isReact && ((_d = (_c = this.data.project) === null || _c === void 0 ? void 0 : _c.features) === null || _d === void 0 ? void 0 : _d.admin);
        const defaultFromToFileMap = {
            from: `src${isTs ? '-ts' : ''}/**/*.{js,jsx,css,scss,sass,less,md,vue}`,
            to: 'src'
        };
        let fromToFileMaps = [defaultFromToFileMap];
        console.log(isReact, isTs, isReactAdmin, '=-=');
        // react template files
        if (isReact && isTs) {
            const prefix = `src${isTs ? '-ts' : ''}`;
            const genTsOrJsFromStr = (isTs, folderName) => {
                return `${prefix}/${folderName}/index.${isTs ? 'ts' : 'js'}`;
            };
            const folders = ['apis', 'components', 'helpers', 'pages', 'routes', 'typings'];
            const genReadmeFromStr = (folderName) => {
                return `${prefix}/${folderName}/README.md`;
            };
            const tsOrJsfileMaps = folders.map((folder) => {
                return {
                    from: genTsOrJsFromStr(isTs, folder),
                    to: 'src'
                };
            });
            const readmeFileMaps = folders.map((folder) => {
                return {
                    from: genReadmeFromStr(folder),
                    to: 'src'
                };
            });
            console.log(tsOrJsfileMaps, readmeFileMaps, '-----');
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
                    from: `${prefix}/main.${isTs ? 'tsx' : 'js'}`,
                    to: 'src'
                },
                isTs && {
                    from: `${prefix}/shims-react.d.ts`,
                    to: 'src'
                }
            ];
            // react-admin template files
        }
        if (isReactAdmin) {
            isTs = true;
            fromToFileMaps = [
                {
                    from: `src-ts/**/*.{ts,tsx,md,scss,svg,css}`,
                    to: 'src'
                }
            ];
        }
        console.log(fromToFileMaps, '-----dddd');
        this.files.render = [
            'package.json',
            'webpack.config.js',
            'README.md',
            isMicro ? 'micro.config.js' : '',
            ...fromToFileMaps
        ].filter(Boolean);
    }
}
exports.default = TemplateReact;
