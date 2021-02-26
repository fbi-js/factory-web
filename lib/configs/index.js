"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveWebpackConfig = void 0;
const webpack_config_base_1 = require("@fbi-js/webpack-config-base");
const webpack_1 = require("./webpack");
const resolveWebpackConfig = (type, data) => __awaiter(void 0, void 0, void 0, function* () {
    // get base webpack config
    const webpackData = webpack_1.resolveWebpackData(data);
    const typeConfig = webpack_1.getTemplateWebpackConfig(type, webpackData);
    // get user webpack config
    const userConfig = webpack_1.getUserConfig();
    // userConfig = resolveUserConfig(userConfig, typeConfig)
    // merge config
    return webpack_config_base_1.webpackMerge.mergeWithRules(webpack_config_base_1.defaultOptions.mergeRules)(typeConfig, userConfig);
});
exports.resolveWebpackConfig = resolveWebpackConfig;
