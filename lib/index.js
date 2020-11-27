"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fbi_1 = require("fbi");
const build_1 = __importDefault(require("./commands/build"));
const serve_1 = __importDefault(require("./commands/serve"));
const install_1 = __importDefault(require("./commands/install"));
const vue_1 = __importDefault(require("./templates/vue"));
const react_1 = __importDefault(require("./templates/react"));
const micro_main_1 = __importDefault(require("./templates/micro-main"));
class FactoryWeb extends fbi_1.Factory {
    constructor() {
        super(...arguments);
        this.id = '@fbi-js/factory-web';
        this.description = 'factory for web application development';
        this.commands = [new build_1.default(this), new serve_1.default(this), new install_1.default(this)];
        this.templates = [new vue_1.default(this), new react_1.default(this), new micro_main_1.default(this)];
        this.execOpts = {
            cwd: process.cwd(),
            localDir: path_1.join(__dirname, '../'),
            preferLocal: true
        };
    }
}
exports.default = FactoryWeb;
