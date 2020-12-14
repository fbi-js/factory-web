"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveWebpackConfig = void 0;
const webpack_1 = require("./webpack");
const webpack_merge_1 = require("webpack-merge");
const resolveWebpackConfig = async (type, data) => {
    // get base webpack config
    const webpackData = webpack_1.resolveWebpackData(data);
    const webpackBaseConfig = webpack_1.getWebpackBaseConfig(webpackData);
    const typeConfig = webpack_1.getTemplateWebpackConfig(type, webpackData);
    const baseConfig = webpack_merge_1.merge(webpackBaseConfig, typeConfig);
    // get user webpack config
    let userConfig = webpack_1.getUserConfig();
    userConfig = webpack_1.resolveUserConfig(userConfig, baseConfig);
    // merge config
    return webpack_merge_1.merge(baseConfig, userConfig);
};
exports.resolveWebpackConfig = resolveWebpackConfig;
