"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const react_1 = __importDefault(require("./react"));
class TemplateMicroReact extends react_1.default {
    constructor(factory) {
        super(factory);
        this.factory = factory;
        this.id = 'micro-react';
        this.path = path_1.join(__dirname, '../../templates/react');
        this.description = 'template for Micro-fontends react application';
        this.templates = [];
        this.features = [{ name: 'typescript', value: true }];
    }
    async gathering(flags) {
        await super.gathering(flags);
        this.data.project = Object.assign(Object.assign({}, this.data.project), { isMicro: true });
    }
}
exports.default = TemplateMicroReact;
