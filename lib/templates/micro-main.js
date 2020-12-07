"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("./base"));
const fbi_1 = require("fbi");
const { formatName } = fbi_1.utils;
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
        const extraData = await this.prompt([
            {
                type: 'input',
                name: 'orgName',
                message: 'Organization name',
                initial({ enquirer }) {
                    return '';
                },
                validate(value) {
                    const name = formatName(value);
                    return (name && true) || 'please input a valid organization name';
                }
            }
        ]);
        await super.gathering(flags);
        this.data.project = Object.assign(Object.assign(Object.assign({}, this.data.project), extraData), { features: { typescript: true } });
        const { factory, project } = this.data;
        this.spinner = this.createSpinner(`Creating project...`).start(`Creating ${this.style.bold.green(project.name)} via ${factory.id} from ${factory.template}...`);
    }
    async writing() {
        var _a, _b;
        await super.writing();
        this.files.copy = (_a = this.files.copy) === null || _a === void 0 ? void 0 : _a.concat(['public/*', 'src/*', 'tsconfig.json']);
        this.files.render = (_b = this.files.render) === null || _b === void 0 ? void 0 : _b.concat(['micro-config.js']);
    }
}
exports.default = TemplateMicroMain;
