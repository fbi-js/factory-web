"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const vue_1 = __importDefault(require("./vue"));
class TemplateMicroVue extends vue_1.default {
    constructor(factory) {
        super(factory);
        this.factory = factory;
        this.id = 'micro-vue';
        this.path = path_1.join(__dirname, '../../templates/vue');
        this.description = 'template for Micro-fontends vue application';
        this.templates = [];
    }
    async gathering(flags) {
        await super.gathering(flags);
        this.data.project = Object.assign(Object.assign({}, this.data.project), { isMicro: true });
    }
}
exports.default = TemplateMicroVue;
