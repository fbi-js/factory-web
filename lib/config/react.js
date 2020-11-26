"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deps = exports.getConfig = void 0;
const stylelint_webpack_plugin_1 = __importDefault(require("stylelint-webpack-plugin"));
const eslint_webpack_plugin_1 = __importDefault(require("eslint-webpack-plugin"));
const getConfig = (env) => {
    const config = {
        plugins: [
            new eslint_webpack_plugin_1.default({
                extensions: ['js', 'jsx'],
                files: 'src'
            }),
            new stylelint_webpack_plugin_1.default({
                files: 'src/**/*.{css,scss,jsx}'
            }),
        ],
        resolve: {
            extensions: ['*', '.js', '.jsx'],
        },
    };
    return config;
};
exports.getConfig = getConfig;
exports.deps = {
    '@babel/preset-react': '^7.12.7',
    '@babel/plugin-proposal-class-properties': '^7.12.1',
    "react-hot-loader": "^4.13.0",
};
