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
    const userConfig = require(path_1.join(paths_1.paths.cwd, 'micro-app'));
    const { mode, port, startEntry, title, cosEnv } = options;
    const isDev = mode === 'development';
    const opts = {
        orgName: userConfig.orgName,
        projectName: userConfig.projectName,
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
    // const HtmlWebpackPlugin = require('html-webpack-plugin')
    // const StandaloneSingleSpaPlugin = require('standalone-single-spa-webpack-plugin')
    let apps = [];
    try {
        apps = userConfig.apps;
    }
    catch (_a) { }
    const config = {
        entry: path_1.join(paths_1.paths.src, 'index.ts'),
        output: {
            filename: isDev
                ? `${opts.orgName}-${opts.projectName}.js?v=[hash]`
                : `${opts.orgName}-${opts.projectName}.[hash].js`,
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
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'src/common-deps',
                        to: 'common-deps/'
                    }
                ]
            })
            // isDev &&
            //   new StandaloneSingleSpaPlugin({
            //     appOrParcelName: `@${opts.orgName}/${opts.projectName}`,
            //     disabled: !webpackConfigEnv.standalone,
            //     HtmlWebpackPlugin,
            //     ...opts.standaloneOptions
            //   })
        ].filter(Boolean)
    };
    return config;
};
exports.getConfig = getConfig;
exports.deps = {
    // 'standalone-single-spa-webpack-plugin': '^1.1.0',
    '@types/systemjs': '^6.1.0'
};
