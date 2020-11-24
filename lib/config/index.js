"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __importDefault(require("./common"));
const webpack_merge_1 = require("webpack-merge");
exports.default = (type, data) => {
    const commonConfigs = common_1.default(data);
    const { getConfig } = require(`./${type}`);
    const typeConfigs = getConfig(data.env || 'development');
    return webpack_merge_1.merge(commonConfigs, typeConfigs);
};
