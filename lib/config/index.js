"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __importDefault(require("./common"));
const webpack_merge_1 = require("webpack-merge");
const fbi_1 = require("fbi");
const path_1 = require("path");
const { fs } = fbi_1.utils;
exports.default = async (type, data) => {
    const commonConfigs = common_1.default(data);
    const { getConfig } = require(`./${type}`);
    const typeConfigs = getConfig({
        title: data.title,
        port: data.port,
        mode: data.mode,
        startEntry: data.startEntry,
        cosEnv: data.cosEnv
    });
    // user config
    let userConfig = {};
    const userConfigPath = path_1.join(process.cwd(), 'webpack.config');
    if (await fs.pathExists(userConfigPath)) {
        try {
            const tmp = require(userConfigPath);
            userConfig = tmp.default || tmp || {};
        }
        catch (_a) { }
    }
    return webpack_merge_1.merge(commonConfigs, typeConfigs, userConfig);
};
