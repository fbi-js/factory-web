"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const stylelint_webpack_plugin_1 = __importDefault(require("stylelint-webpack-plugin"));
const eslint_webpack_plugin_1 = __importDefault(require("eslint-webpack-plugin"));
const getConfig = (data) => {
    const config = {
        plugins: [
            new eslint_webpack_plugin_1.default({
                extensions: ['js', 'ts', 'jsx', 'tsx'],
                files: 'src'
            }),
            new stylelint_webpack_plugin_1.default({
                files: 'src/**/*.{css,scss,jsx}'
            })
        ]
    };
    return config;
};
exports.getConfig = getConfig;
