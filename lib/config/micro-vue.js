"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deps = exports.getConfig = void 0;
const webpack_merge_1 = require("webpack-merge");
const vue_1 = require("./vue");
const getConfig = (options) => {
    const baseConfig = vue_1.getConfig(options);
    return webpack_merge_1.merge(baseConfig, {
        output: {
            libraryTarget: 'umd'
        }
    });
};
exports.getConfig = getConfig;
exports.deps = Object.assign({}, vue_1.deps);
