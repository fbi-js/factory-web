"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const path_1 = require("path");
const paths_1 = require("./helpers/paths");
const getConfig = (options) => {
    const prijectInfo = require(path_1.join(paths_1.paths.cwd, 'package.json'));
    const appNameArr = prijectInfo.name.split('/');
    const orgName = appNameArr.length > 1 ? appNameArr[0].replace('@', '') : '';
    const projectName = appNameArr.length > 1 ? appNameArr[1] : appNameArr[0];
    const CopyWebpackPlugin = require('copy-webpack-plugin');
    const config = {
        output: {
            libraryTarget: 'system',
            path: paths_1.paths.dist,
            jsonpFunction: `webpackJsonp_${orgName}_${projectName}`,
            devtoolNamespace: `${orgName}_${projectName}`
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
        externals: ['single-spa'],
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'src/common-deps',
                        to: 'common-deps/'
                    }
                ]
            })
        ].filter(Boolean)
    };
    return config;
};
exports.getConfig = getConfig;
