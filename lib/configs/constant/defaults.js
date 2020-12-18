"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDev = exports.WEBPACK_DEV_SERVER_CONFIG = exports.WEBPACK_STATS = exports.HOST = exports.PORT = void 0;
const paths_1 = require("./paths");
// http server config
exports.PORT = 9000;
exports.HOST = '0.0.0.0';
exports.WEBPACK_STATS = {
    assets: true,
    // `webpack --colors` equivalent
    colors: true,
    children: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    // Add errors
    errors: true,
    // Add details to errors (like resolving log)
    errorDetails: true,
    hash: false,
    modules: false,
    timings: true,
    // Add webpack version information
    version: true,
    moduleAssets: false
};
// webpack-dev-server config
exports.WEBPACK_DEV_SERVER_CONFIG = {
    historyApiFallback: true,
    compress: true,
    // hot: true,
    open: false,
    overlay: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*'
    },
    // host: HOST,
    port: exports.PORT,
    // https://github.com/webpack/webpack-dev-server/releases/tag/v4.0.0-beta.0
    static: [paths_1.paths.dist],
    firewall: false,
    client: {
        host: exports.HOST
    }
};
const isDev = () => {
    const buildMode = process.env.NODE_ENV || 'development';
    return buildMode === 'development';
};
exports.isDev = isDev;
