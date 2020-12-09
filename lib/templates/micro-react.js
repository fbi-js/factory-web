"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("./react"));
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
        await super.gathering(flags);
        this.data.project = Object.assign(Object.assign({}, this.data.project), { isMicro: true });
    }
}
exports.default = TemplateMicroVue;
