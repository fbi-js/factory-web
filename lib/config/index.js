"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveWebpackConfig = void 0;
const path_1 = require("path");
const common_1 = __importDefault(require("./common"));
const webpack_merge_1 = require("webpack-merge");
const resolveWebpackConfig = async (type, data) => {
    const commonConfigs = common_1.default(data);
    const { getConfig } = require(`./${type}`);
    const typeConfigs = getConfig({
        title: data.title,
        port: data.port,
        mode: data.mode,
        startEntry: data.startEntry,
        cosEnv: data.cosEnv
    });
    // user config
    let userConfig = {};
    const userConfigPath = path_1.join(process.cwd(), 'webpack.config');
    try {
        const tmp = require(userConfigPath);
        userConfig = tmp.default || tmp || {};
    }
    catch (_a) { }
    return webpack_merge_1.merge(commonConfigs, typeConfigs, userConfig);
};
exports.resolveWebpackConfig = resolveWebpackConfig;
