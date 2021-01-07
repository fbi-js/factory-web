"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const base_1 = __importDefault(require("./base"));
class TemplateMiniProgram extends base_1.default {
    constructor(factory) {
        super(factory);
        this.factory = factory;
        this.id = 'mini-program';
        this.path = path_1.join(__dirname, '../../templates/mini-program');
        this.description = 'template for mini-program application by use taro';
        this.templates = [];
        this.features = [];
        this.copyFiles = [
            '.gitignore',
            '.editorconfig',
            '.prettierignore',
            'babel.config.js',
            'config/*'
        ];
        this.renderFiles = [
            'babel.config.js',
            'global.d.ts',
            'package.json',
            'project.config.json',
            'README.md',
            'tsconfig.json'
        ];
        this.renderFileTypes = 'js,jsx,ts,tsx,css,scss,sass,less,md,vue,html';
    }
    async gathering(flags) {
        await super.gathering(flags);
        const { factory, project } = this.data;
        this.spinner = this.createSpinner(`Creating project...`).start(`Creating ${this.style.bold.green(project.name)} via ${factory.id} from ${factory.template}...`);
    }
    async writing() {
        await super.writing();
    }
}
exports.default = TemplateMiniProgram;
