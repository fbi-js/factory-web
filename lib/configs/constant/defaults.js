"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDev = exports.WEBPACK_DEV_SERVER_CONFIG = exports.WEBPACK_BUILD_STATS = exports.WEBPACK_DEV_STATS = exports.HOST = exports.PORT = void 0;
const paths_1 = require("./paths");
// http server config
exports.PORT = 9000;
exports.HOST = '0.0.0.0';
exports.WEBPACK_DEV_STATS = {
    all: false,
    colors: true,
    errors: true
};
exports.WEBPACK_BUILD_STATS = Object.assign(Object.assign({}, exports.WEBPACK_DEV_STATS), { timings: true, errors: true, assetsSort: '!size', assets: true, excludeAssets: [/\.*\.map/] });
// webpack-dev-server config
exports.WEBPACK_DEV_SERVER_CONFIG = {
    historyApiFallback: true,
    compress: true,
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
    static: [paths_1.paths.public],
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
