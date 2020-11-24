"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deps = exports.getConfig = void 0;
const stylelint_webpack_plugin_1 = __importDefault(require("stylelint-webpack-plugin"));
const eslint_webpack_plugin_1 = __importDefault(require("eslint-webpack-plugin"));
exports.getConfig = (env) => {
    const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
    const config = {
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    exclude: /node_modules/,
                    loader: 'vue-loader',
                    options: {
                        shadowMode: true
                    }
                }
            ]
        },
        plugins: [
            new eslint_webpack_plugin_1.default({
                extensions: ['js', 'vue'],
                files: 'src'
            }),
            new stylelint_webpack_plugin_1.default({
                files: 'src/**/*.{css,scss,vue}'
            }),
            new VueLoaderPlugin()
        ]
    };
    return config;
};
exports.deps = {
    'vue-loader': '^15.9.5'
};
