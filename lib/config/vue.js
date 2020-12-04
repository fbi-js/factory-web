"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeps = exports.getConfig = void 0;
const path_1 = require("path");
const eslint_webpack_plugin_1 = __importDefault(require("eslint-webpack-plugin"));
const stylelint_webpack_plugin_1 = __importDefault(require("stylelint-webpack-plugin"));
const getConfig = (data) => {
    const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
    const config = {
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    exclude: path_1.resolve('node_modules'),
                    loader: 'vue-loader',
                    options: {
                        shadowMode: true
                    }
                }
            ]
        },
        plugins: [
            // TODO: 从fbi-lint剥离eslint依赖
            new eslint_webpack_plugin_1.default({
                extensions: ['js', 'ts', 'jsx', 'tsx', 'vue'],
                files: 'src',
                fix: true
            }),
            new stylelint_webpack_plugin_1.default({
                files: 'src/**/*.{css,scss,vue}'
            }),
            new VueLoaderPlugin()
        ],
        resolve: {
            extensions: ['.vue'],
            alias: {
                vue: 'vue/dist/vue.esm.js'
            }
        }
    };
    return config;
};
exports.getConfig = getConfig;
const getDeps = ({ factory }) => {
    var _a;
    const isTs = (_a = factory === null || factory === void 0 ? void 0 : factory.features) === null || _a === void 0 ? void 0 : _a.typescript;
    return Object.assign({ 'vue-loader': '^15.9.5', 'vue-template-compiler': '^2.6.12', '@babel/plugin-proposal-class-properties': '^7.12.1', 'eslint-plugin-vue': '^7.2.0' }, (isTs
        ? {
            'vue-eslint-parser': '^7.2.0',
            '@typescript-eslint/parser': '^4.9.0'
        }
        : {}));
};
exports.getDeps = getDeps;
