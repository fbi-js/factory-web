"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveDeps = exports.resolveWebpackConfig = void 0;
const path_1 = require("path");
const common_1 = __importDefault(require("./common"));
const webpack_merge_1 = require("webpack-merge");
const resolveWebpackConfig = async (type, data) => {
    const commonConfigs = common_1.default(data);
    let typeConfigs = {};
    try {
        const { getConfig } = require(`./${type}`);
        typeConfigs = getConfig(data);
    }
    catch (_a) { }
    // user config
    let userConfig = {};
    const userConfigPath = path_1.join(process.cwd(), 'webpack.config');
    try {
        const tmp = require(userConfigPath);
        userConfig = tmp.default || tmp || {};
    }
    catch (_b) { }
    return webpack_merge_1.merge(commonConfigs, typeConfigs, userConfig);
};
exports.resolveWebpackConfig = resolveWebpackConfig;
const resolveDeps = (type, data) => {
    let deps = {};
    try {
        const { getDeps } = require(`./${type}`);
        deps = getDeps(data);
    }
    catch (_a) { }
    return deps;
};
exports.resolveDeps = resolveDeps;
