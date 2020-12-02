"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEBPACK_DEV_CONFIG = exports.HOST = exports.PORT = void 0;
const path_1 = __importDefault(require("path"));
// http server config
exports.PORT = 9000;
exports.HOST = '0.0.0.0';
// webpack-dev-server config
exports.WEBPACK_DEV_CONFIG = {
    contentBase: path_1.default.join(process.cwd(), 'dist'),
    logLevel: 'silent',
    injectClient: false,
    writeToDisk: true,
    historyApiFallback: true,
    compress: true,
    // hot: true,
    // noInfo: true,
    open: false,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*'
    },
    disableHostCheck: true
};
