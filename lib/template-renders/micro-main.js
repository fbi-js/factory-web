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
        this.data.project = Object.assign(Object.assign({}, this.data.project), { isMicro: true, features: Object.assign(Object.assign({}, this.data.project.features), { typescript: true }) });
        const { factory, project } = this.data;
        this.spinner = this.createSpinner(`Creating project...`).start(`Creating ${this.style.bold.green(project.name)} via ${factory.id} from ${factory.template}...`);
    }
}
exports.default = TemplateMicroMain;
