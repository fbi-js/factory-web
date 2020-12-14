"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefinePluginData = exports.resolveUserConfig = exports.getUserConfig = exports.getTemplateWebpackConfig = void 0;
const path_1 = require("path");
const paths_1 = require("../constant/paths");
__exportStar(require("./base"), exports);
/**
 * get template webpack config
 * @param type template file name, can be get "micro-main" | "micro-react" | "micro-vue" | "react" | "vue"
 * @param data
 */
const getTemplateWebpackConfig = (type, data) => {
    let typeWebpackConfig = {};
    try {
        const { getConfig } = require(`./${type}`);
        typeWebpackConfig = getConfig(data);
    }
    catch (_a) { }
    return typeWebpackConfig;
};
exports.getTemplateWebpackConfig = getTemplateWebpackConfig;
/**
 * get user webpack config data, config file is 'webpack.config.js' in project root directory
 */
const getUserConfig = () => {
    let userConfig = {};
    const userConfigPath = path_1.join(process.cwd(), paths_1.factoryConfigs.webpackFileName);
    try {
        const exportConfig = require(userConfigPath);
        userConfig = exportConfig.default || exportConfig;
    }
    catch (_a) { }
    return userConfig;
};
exports.getUserConfig = getUserConfig;
/**
 * support custom base webpack config when user webpack config is a function
 * @param userConfig user webpack config
 * @param baseConfig base webpack config
 */
const resolveUserConfig = (userConfig, baseConfig) => {
    return typeof userConfig === 'function' ? userConfig({
        config: baseConfig,
        paths: paths_1.paths
    }) : userConfig;
};
exports.resolveUserConfig = resolveUserConfig;
/**
 * add global variable by use process.env.xxx
 * @param data
 */
const getDefinePluginData = (data) => {
    const definePluginData = {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.MICRO_MODE': JSON.stringify(process.env.MICRO_MODE)
    };
    return Object.assign(Object.assign({}, data), { definePluginData });
};
exports.getDefinePluginData = getDefinePluginData;
