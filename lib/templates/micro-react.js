"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("./react"));
const fbi_1 = require("fbi");
const { formatName } = fbi_1.utils;
class TemplateMicroVue extends react_1.default {
    constructor(factory) {
        super(factory);
        this.factory = factory;
        this.id = 'micro-react';
        this.path = 'templates/react';
        this.description = 'template for Micro-fontends react application';
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
        this.data.project = Object.assign(Object.assign(Object.assign({}, this.data.project), extraData), { isMicro: true });
    }
    async writing() {
        var _a;
        await super.writing();
        this.files.render = (_a = this.files.render) === null || _a === void 0 ? void 0 : _a.concat(['micro.config.js']);
    }
}
exports.default = TemplateMicroVue;
