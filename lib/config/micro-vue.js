"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const webpack_merge_1 = require("webpack-merge");
const plugins_1 = require("./plugins");
const vue_1 = require("./vue");
const getConfig = (options) => {
    const baseConfig = vue_1.getConfig(options);
    return webpack_merge_1.merge(baseConfig, {
        output: {
            libraryTarget: 'umd'
        },
        plugins: [
            new plugins_1.AssetJsonPlugin({
                onlyEntryFile: true
            })
        ]
    });
};
exports.getConfig = getConfig;
