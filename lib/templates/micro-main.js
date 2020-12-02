"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("./base"));
class TemplateMicroMain extends base_1.default {
    constructor(factory) {
        super(factory);
        this.factory = factory;
        this.id = 'micro-main';
        this.path = 'templates/micro-main';
        this.description = 'template for Micro-fontends base application';
        this.templates = [];
    }
    async gathering(flags) {
        await super.gathering(flags);
        this.data.project = Object.assign(Object.assign({}, this.data.project), { features: { typescript: true } });
        const { factory, project } = this.data;
        this.spinner = this.createSpinner(`Creating project...`).start(`Creating ${this.style.bold.green(project.name)} via ${factory.id} from ${factory.template}...`);
    }
    async writing() {
        var _a;
        await super.writing();
        this.files.copy = (_a = this.files.copy) === null || _a === void 0 ? void 0 : _a.concat([
            'public/*',
            'src/*',
            'tsconfig.json',
            'apps.config.json'
        ]);
    }
}
exports.default = TemplateMicroMain;
