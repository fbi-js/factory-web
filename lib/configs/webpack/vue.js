"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const webpack_config_vue_1 = __importDefault(require("@fbi-js/webpack-config-vue"));
const getConfig = (options) => {
    return webpack_config_vue_1.default({
        options
    });
};
exports.getConfig = getConfig;
