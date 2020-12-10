"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveWebpackConfig = void 0;
const webpack_1 = require("./webpack");
const webpack_merge_1 = require("webpack-merge");
const resolveWebpackConfig = async (type, data) => {
    // console.log('resolveWebpackConfig', data)
    // get base webpack config
    const definePluginData = webpack_1.getDefinePluginData(data);
    const webpackBaseConfig = webpack_1.getWebpackBaseConfig(definePluginData);
    const typeConfig = webpack_1.getTemplateWebpackConfig(type, webpackBaseConfig);
    const baseConfig = webpack_merge_1.merge(webpackBaseConfig, typeConfig);
    // get user webpack config
    let userConfig = webpack_1.getUserConfig();
    userConfig = webpack_1.resolveUserConfig(userConfig, baseConfig);
    // merge config
    return webpack_merge_1.merge(baseConfig, userConfig);
};
exports.resolveWebpackConfig = resolveWebpackConfig;
