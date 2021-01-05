"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveWebpackConfig = void 0;
const webpack_config_base_1 = require("@fbi-js/webpack-config-base");
const webpack_1 = require("./webpack");
const resolveWebpackConfig = async (type, data) => {
    // get base webpack config
    const webpackData = webpack_1.resolveWebpackData(data);
    const typeConfig = webpack_1.getTemplateWebpackConfig(type, webpackData);
    // get user webpack config
    let userConfig = webpack_1.getUserConfig();
    userConfig = webpack_1.resolveUserConfig(userConfig, typeConfig);
    // merge config
    return webpack_config_base_1.merge(typeConfig, userConfig);
};
exports.resolveWebpackConfig = resolveWebpackConfig;
