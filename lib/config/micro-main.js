"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deps = exports.getConfig = void 0;
const path_1 = __importDefault(require("path"));
const paths_1 = require("./paths");
const getConfig = (options) => {
    const { mode, port, startEntry, title, cosEnv } = options;
    const opts = {
        mode,
        port
    };
    const webpackConfigEnv = {
        isLocal: mode === 'development',
        COS_ENV: cosEnv
    };
    const webpackMerge = require('webpack-merge');
    const singleSpaDefaults = require('webpack-config-single-spa-ts');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const webpack = require('webpack');
    const CopyWebpackPlugin = require('copy-webpack-plugin');
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    const { getAppConfig } = require('./utils');
    const runPwd = process.cwd();
    function baseConfigDefault(op) {
        const { orgName = 'project-name', projectName = 'root-config', opts, webpackConfigEnv, publicPath = '', } = op;
        const excludePath = path_1.default.resolve(runPwd, '../node_modules');
        const apps = getDevAppConfig(opts.mode) || [];
        const defaultConfig = singleSpaDefaults({
            orgName,
            projectName,
            webpackConfigEnv,
        });
        defaultConfig.module.rules[1].exclude = excludePath;
        const defaultPlugin = getPlugins(webpackConfigEnv, orgName, apps, publicPath);
        const config = webpackMerge.merge(defaultConfig, {
            entry: path_1.default.resolve(runPwd, 'src/index.ts'),
            plugins: defaultPlugin,
            resolve: {
                alias: {
                    '@': path_1.default.resolve(runPwd, 'src/'),
                },
            },
            externals: ['axios', 'single-spa']
        });
        return config;
    }
    function getPlugins(webpackConfigEnv = {
        COS_ENV: 'development',
        isLocal: 'true'
    }, orgName = '', apps = [], publicPath) {
        const href = publicPath;
        return [
            new webpack.DefinePlugin({
                COS_ENV: JSON.stringify(webpackConfigEnv.COS_ENV),
                APPS: JSON.stringify(apps),
            }),
            new HtmlWebpackPlugin({
                inject: false,
                template: path_1.default.join(paths_1.paths.public, 'index.html'),
                /** 重写html-plugin配置 */
                // https://github.com/jantimon/html-webpack-plugin/blob/657bc605a5dbdbbdb4f8154bd5360492c5687fc9/examples/template-parameters/webpack.config.js#L20
                templateParameters: (compilation, assets, assetTags, options) => {
                    return {
                        compilation,
                        webpackConfig: compilation.options,
                        htmlWebpackPlugin: {
                            tags: assetTags,
                            files: assets,
                            options
                        },
                        /** 下面为自定义参数 */
                        isLocal: webpackConfigEnv && webpackConfigEnv.isLocal === 'true',
                        orgName,
                        href,
                        title
                    };
                }
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'src/common-deps',
                        to: 'common-deps/',
                    },
                ],
            }),
            new MiniCssExtractPlugin(),
        ];
    }
    function getDevAppConfig(mode) {
        function getPortsByPath(basePath) {
            try {
                const packageJson = require(path_1.default.resolve(`${basePath}/package.json`));
                if (packageJson.scripts.start.includes('--port')) {
                    /**
                     * 获取package.json中的dev端口
                     */
                    return packageJson.scripts.start
                        .match(/--port -?[1-9]\d*/)
                        .pop()
                        .match(/[1-9]\d*/)
                        .pop();
                }
                else {
                    /**
                     * 获取项目根目录中，webpack.config.js中的devServer.port
                     */
                    const webpackFn = require(path_1.default.resolve(`${basePath}/webpack.config.js`));
                    const webpackConfig = webpackFn({}, {});
                    return webpackConfig.devServer.port;
                }
            }
            catch (_a) {
                return 0;
            }
        }
        const apps = [];
        const entryPath = startEntry === 'self' ? runPwd : '../../../';
        const { selfApp, otherApps } = getAppConfig(path_1.default.resolve(entryPath, 'apps.config'));
        if (Object.keys(selfApp).length) {
            apps.push(selfApp);
        }
        if (Object.keys(otherApps).length) {
            apps.push(...otherApps);
        }
        return apps.filter((app) => app.name && app.port);
    }
    const baseConfig = baseConfigDefault({
        orgName: 'project-name',
        projectName: 'root-config',
        opts,
        webpackConfigEnv,
        publicPath: `http://localhost:${opts.port}`,
    });
    return webpackMerge.merge(baseConfig, {
    // modify the webpack config however you'd like to by adding to this object
    });
};
exports.getConfig = getConfig;
exports.deps = {
    'ts-config-single-spa': '^1.9.0',
    'webpack-merge': '^4.2.2',
    "@types/systemjs": "^6.1.0",
    "axios": "*"
};
