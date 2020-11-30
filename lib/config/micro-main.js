"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deps = exports.getConfig = void 0;
const path_1 = require("path");
const webpack_1 = __importDefault(require("webpack"));
const paths_1 = require("./helpers/paths");
const getConfig = (options) => {
    const { mode, port, startEntry, title, cosEnv } = options;
    const isDev = mode === 'development';
    const opts = {
        orgName: 'vue-mf',
        projectName: 'root-config',
        orgPackagesAsExternal: true,
        webpackConfigEnv: null,
        standalone: false,
        standaloneOptions: {}
    };
    const webpackConfigEnv = opts.webpackConfigEnv || {
        isLocal: isDev,
        COS_ENV: cosEnv,
        standalone: false
    };
    const CopyWebpackPlugin = require('copy-webpack-plugin');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const StandaloneSingleSpaPlugin = require('standalone-single-spa-webpack-plugin');
    const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
    let apps = [];
    try {
        const userConfig = require(path_1.join(paths_1.paths.cwd, 'apps.config'));
        apps = userConfig.apps;
    }
    catch (_a) { }
    const config = {
        entry: path_1.join(paths_1.paths.src, 'index.ts'),
        output: {
            filename: `main.js`,
            libraryTarget: 'system',
            path: paths_1.paths.dist,
            jsonpFunction: `webpackJsonp_${opts.projectName}`,
            devtoolNamespace: `${opts.projectName}`
        },
        module: {
            rules: [
                {
                    parser: {
                        system: false
                    }
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        externals: opts.orgPackagesAsExternal
            ? ['single-spa', new RegExp(`^@${opts.orgName}/`)]
            : ['single-spa'],
        plugins: [
            new webpack_1.default.DefinePlugin({
                COS_ENV: JSON.stringify(webpackConfigEnv.COS_ENV),
                APPS: JSON.stringify(apps)
            }),
            new ForkTsCheckerWebpackPlugin({ typescript: require.resolve('typescript') }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'src/common-deps',
                        to: 'common-deps/'
                    }
                ]
            }),
            isDev &&
                new StandaloneSingleSpaPlugin(Object.assign({ appOrParcelName: `@${opts.orgName}/${opts.projectName}`, disabled: !webpackConfigEnv.standalone, HtmlWebpackPlugin }, opts.standaloneOptions))
        ].filter(Boolean),
        resolve: {
            extensions: ['.ts', '.js', '.mjs', '.jsx', '.wasm', '.json']
        }
    };
    return config;
};
exports.getConfig = getConfig;
exports.deps = {
    'webpack-config-single-spa-ts': '^1.17.6',
    'ts-config-single-spa': '^1.9.0',
    '@types/systemjs': '^6.1.0',
    'ts-loader': '^8.0.11'
};
