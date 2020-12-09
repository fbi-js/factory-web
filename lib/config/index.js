"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveWebpackConfig = void 0;
const path_1 = require("path");
const common_1 = __importDefault(require("./common"));
const webpack_merge_1 = require("webpack-merge");
const paths_1 = require("./helpers/paths");
const resolveWebpackConfig = async (type, data) => {
    const definePluginData = {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.MICRO_MODE': JSON.stringify(process.env.MICRO_MODE)
    };
    const envData = Object.assign(Object.assign({}, data), { definePluginData });
    const commonConfigs = common_1.default(envData);
    let typeConfigs = {};
    try {
        const { getConfig } = require(`./${type}`);
        typeConfigs = getConfig(envData);
    }
    catch (_a) { }
    const baseConfig = webpack_merge_1.merge(commonConfigs, typeConfigs);
    // user config
    let userConfig = {};
    const userConfigPath = path_1.join(process.cwd(), 'webpack.config');
    try {
        const tmp = require(userConfigPath);
        const tmpConfig = tmp.default || tmp;
        userConfig =
            typeof tmpConfig === 'function'
                ? tmpConfig({
                    config: baseConfig,
                    paths: paths_1.paths
                })
                : tmpConfig;
    }
    catch (_b) { }
    return webpack_merge_1.merge(baseConfig, userConfig);
};
exports.resolveWebpackConfig = resolveWebpackConfig;
