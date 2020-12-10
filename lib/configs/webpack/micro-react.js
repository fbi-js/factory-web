"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const webpack_merge_1 = require("webpack-merge");
const plugins_1 = require("../plugins");
const react_1 = require("./react");
const getConfig = (options) => {
    const baseConfig = react_1.getConfig(options);
    return webpack_merge_1.merge(baseConfig, {
        output: {
            libraryTarget: 'umd'
        },
        plugins: [
            new plugins_1.AssetJsonPlugin({
                onlyEntryFile: true,
                input: 'micro.config.js',
                output: 'micro.config.json'
            })
        ]
    });
};
exports.getConfig = getConfig;
