"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveWebpackData = exports.resolveUserConfig = exports.getUserConfig = exports.getTemplateWebpackConfig = void 0;
const path_1 = require("path");
const paths_1 = require("../constant/paths");
/**
 * get template webpack config
 * @param type template file name, can be get "micro-main" | "micro-react" | "micro-vue" | "react" | "vue"
 * @param data
 */
const getTemplateWebpackConfig = (type, data) => {
    const { getConfig } = require(`./${type}`);
    return getConfig(data);
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
// TODO: remove `paths`
const resolveUserConfig = (userConfig, baseConfig) => {
    return typeof userConfig === 'function'
        ? userConfig({
            config: baseConfig,
            paths: paths_1.paths
        })
        : userConfig;
};
exports.resolveUserConfig = resolveUserConfig;
/**
 * add global variable by use process.env.xxx
 * @param data
 */
const resolveWebpackData = (data) => {
    var _a, _b;
    const definePluginData = {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.MICRO_MODE': JSON.stringify(process.env.MICRO_MODE)
    };
    let pkg = {};
    try {
        pkg = require(path_1.join(process.cwd(), 'package.json'));
    }
    catch (_c) { }
    return Object.assign(Object.assign({}, data), { isTs: (_b = (_a = data.factory) === null || _a === void 0 ? void 0 : _a.features) === null || _b === void 0 ? void 0 : _b.typescript, pkg,
        definePluginData });
};
exports.resolveWebpackData = resolveWebpackData;
