"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandTypesSync = exports.CommandTypesCreate = exports.TemplateMicroReact = exports.TemplateMicroVue = exports.TemplateMicroMain = exports.TemplateReact = exports.TemplateVue = exports.TemplateBase = exports.CommandServe = exports.CommandBuild = void 0;
const path_1 = require("path");
const fbi_1 = require("fbi");
const build_1 = __importDefault(require("./commands/build"));
exports.CommandBuild = build_1.default;
const serve_1 = __importDefault(require("./commands/serve"));
exports.CommandServe = serve_1.default;
const types_create_1 = __importDefault(require("./commands/types-create"));
exports.CommandTypesCreate = types_create_1.default;
const types_sync_1 = __importDefault(require("./commands/types-sync"));
exports.CommandTypesSync = types_sync_1.default;
const base_1 = __importDefault(require("./templates/base"));
exports.TemplateBase = base_1.default;
const vue_1 = __importDefault(require("./templates/vue"));
exports.TemplateVue = vue_1.default;
const react_1 = __importDefault(require("./templates/react"));
exports.TemplateReact = react_1.default;
const micro_main_1 = __importDefault(require("./templates/micro-main"));
exports.TemplateMicroMain = micro_main_1.default;
const micro_vue_1 = __importDefault(require("./templates/micro-vue"));
exports.TemplateMicroVue = micro_vue_1.default;
const micro_react_1 = __importDefault(require("./templates/micro-react"));
exports.TemplateMicroReact = micro_react_1.default;
const mini_program_1 = __importDefault(require("./templates/mini-program"));
class FactoryWeb extends fbi_1.Factory {
    constructor() {
        super(...arguments);
        this.id = require('../package.json').name;
        this.description = 'factory for web application development';
        this.commands = [
            new build_1.default(this),
            new serve_1.default(this),
            new types_create_1.default(this),
            new types_sync_1.default(this)
        ];
        this.templates = [
            new vue_1.default(this),
            new react_1.default(this),
            new micro_main_1.default(this),
            new micro_vue_1.default(this),
            new micro_react_1.default(this),
            new mini_program_1.default(this)
        ];
        this.execOpts = {
            cwd: process.cwd(),
            localDir: path_1.join(__dirname, '../'),
            preferLocal: true
        };
    }
}
exports.default = FactoryWeb;
