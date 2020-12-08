"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const path_1 = require("path");
const paths_1 = require("./helpers/paths");
const stylelint_webpack_plugin_1 = __importDefault(require("stylelint-webpack-plugin"));
const eslint_webpack_plugin_1 = __importDefault(require("eslint-webpack-plugin"));
const getConfig = (data) => {
    var _a, _b;
    const isTs = (_b = (_a = data.factory) === null || _a === void 0 ? void 0 : _a.features) === null || _b === void 0 ? void 0 : _b.typescript;
    const config = {
        entry: {
            main: path_1.join(paths_1.paths.src, `main.${isTs ? 'tsx' : 'js'}`)
        },
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
