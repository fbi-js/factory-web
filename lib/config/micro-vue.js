"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deps = exports.getConfig = void 0;
const webpack_merge_1 = require("webpack-merge");
const stylelint_webpack_plugin_1 = __importDefault(require("stylelint-webpack-plugin"));
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const paths_1 = require("./paths");
const getConfig = (options) => {
    const { port } = options;
    const buildMode = process.env.NODE_ENV || 'development';
    const isDev = buildMode === 'development';
    const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
    const config = {
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    exclude: /node_modules/,
                    loader: 'vue-loader',
                    options: {
                        shadowMode: true
                    }
                },
                {
                    test: /\.(css)$/,
                    use: isDev
                        ? [
                            'style-loader',
                            { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
                            { loader: 'postcss-loader', options: { sourceMap: true } }
                        ]
                        : [
                            {
                                loader: mini_css_extract_plugin_1.default.loader,
                                options: {
                                    publicPath: paths_1.paths.css
                                }
                            },
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 2,
                                    sourceMap: false
                                }
                            },
                            'postcss-loader'
                        ]
                }
            ]
        },
        plugins: [
            new stylelint_webpack_plugin_1.default({
                files: 'src/**/*.{css,scss,vue}'
            }),
            new VueLoaderPlugin()
        ],
        resolve: {
            extensions: ['*', '.js', '.vue'],
            alias: {
                vue: 'vue/dist/vue.esm.js'
            }
        }
    };
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const { guid, getRunPwd } = require('./utils');
    function subVue2ConfigDefault({ orgName = 'project-name', projectName = 'app-vue2', opts = {}, publicPath = '/' }) {
        const hashStr = getHash(opts);
        const defaultPlugins = getPlugins({
            opts,
            orgName,
            projectName,
            hashStr,
            publicPath
        });
        return {
            output: {
                filename: `${orgName}-${projectName}${hashStr}.js`,
                libraryTarget: 'umd'
            },
            entry: path.resolve(getRunPwd(), 'src/main.js'),
            plugins: defaultPlugins,
            resolve: {
                alias: {
                    '@': path.resolve(getRunPwd(), 'src/')
                }
            }
        };
    }
    function getMode(opts) {
        return opts.mode || process.env.NODE_ENV;
    }
    function getHash(opts) {
        const hash = guid();
        const isProd = getMode(opts) === 'production';
        const hashStr = isProd ? `-${hash}` : '';
        return hashStr;
    }
    function getPlugins({ opts, publicPath, orgName, projectName, hashStr }) {
        const isProd = opts.mode === 'production';
        const href = publicPath;
        return [
            new HtmlWebpackPlugin({
                template: path.resolve('./public/index.html'),
                title: `${href}${isProd ? `/${projectName}` : ''}/${orgName}-${projectName}${hashStr}.js`
            })
        ];
    }
    const opts = {
        port
    };
    const subVue2WebpackConfig = subVue2ConfigDefault({
        orgName: 'project-name',
        projectName: 'app-vue2',
        opts,
        publicPath: `http://localhost:${opts.port}`
    });
    return webpack_merge_1.merge(config, subVue2WebpackConfig);
};
exports.getConfig = getConfig;
exports.deps = {
    '@babel/plugin-proposal-class-properties': '^7.12.1',
};
