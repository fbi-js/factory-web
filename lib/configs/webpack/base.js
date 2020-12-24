"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebpackBaseConfig = void 0;
const webpack_1 = __importDefault(require("webpack"));
const path_1 = require("path");
const webpackbar_1 = __importDefault(require("webpackbar"));
const copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const clean_webpack_plugin_1 = require("clean-webpack-plugin");
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const css_minimizer_webpack_plugin_1 = __importDefault(require("css-minimizer-webpack-plugin"));
const fork_ts_checker_webpack_plugin_1 = __importDefault(require("fork-ts-checker-webpack-plugin"));
const utils_1 = require("../../helpers/utils");
const defaults_1 = require("../constant/defaults");
const getWebpackBaseConfig = (data) => {
    var _a, _b;
    const paths = utils_1.getMergePaths(data.paths);
    const isDev = !utils_1.isProd();
    const isTs = (_b = (_a = data.factory) === null || _a === void 0 ? void 0 : _a.features) === null || _b === void 0 ? void 0 : _b.typescript;
    const htmlWebpackPluginTemplatePath = path_1.join(paths.public, 'index.html');
    const config = Object.assign({ mode: utils_1.getEnvMode(), devtool: isDev ? 'inline-source-map' : false, entry: {
            main: path_1.join(paths.src, `main.${isTs ? 'ts' : 'js'}`)
        }, output: {
            path: paths.dist,
            publicPath: process.env.ASSET_PATH || '/',
            filename: isDev ? '[name].js?v=[fullhash]' : `${paths.js}/[name].[fullhash].js`,
            assetModuleFilename: isDev
                ? '[name][ext][query]'
                : `${paths.assets}/[name].[hash][ext][query]`
        }, cache: {
            type: 'filesystem'
        }, module: {
            rules: [
                // JavaScript: Use Babel to transpile JavaScript files
                {
                    test: /\.(j|t)sx?$/,
                    use: ['babel-loader'],
                    exclude: path_1.resolve('node_modules')
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    type: 'asset',
                    parser: {
                        dataUrlCondition: {
                            maxSize: 4 * 1024 // 4kb
                        }
                    },
                    generator: {
                        filename: isDev ? '[name][ext][query]' : `${paths.img}/[name].[hash][ext][query]`
                    }
                },
                {
                    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                    type: 'asset/resource'
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    type: 'asset/resource'
                },
                // Styles: Inject CSS into the head with source maps
                {
                    test: /\.(sc|sa|c)ss$/,
                    use: isDev
                        ? [
                            'style-loader',
                            { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
                            { loader: 'postcss-loader', options: { sourceMap: true } },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true,
                                    // Prefer `dart-sass`
                                    implementation: require('sass')
                                }
                            }
                        ]
                        : [
                            {
                                loader: mini_css_extract_plugin_1.default.loader,
                                options: {
                                    publicPath: paths.cssExtractPublicPath
                                }
                            },
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 2,
                                    sourceMap: false
                                }
                            },
                            'postcss-loader',
                            {
                                loader: 'sass-loader',
                                options: {
                                    // Prefer `dart-sass`
                                    implementation: require('sass')
                                }
                            }
                        ]
                }
            ]
        }, plugins: [
            new webpackbar_1.default({
                name: data.pkg.name || '',
                color: '#0052D9'
            }),
            // Make appName & appVersion available as a constant
            new webpack_1.default.DefinePlugin(data.definePluginData || {}),
            // Removes/cleans build folders and unused assets when rebuilding
            new clean_webpack_plugin_1.CleanWebpackPlugin(),
            // Copies files from target to destination folder
            new copy_webpack_plugin_1.default({
                patterns: [
                    {
                        from: paths.public,
                        globOptions: {
                            dot: true
                        },
                        filter: (resourcePath) => !resourcePath.endsWith('index.html')
                    }
                ]
            }),
            new html_webpack_plugin_1.default({
                title: data.title || 'My App',
                template: htmlWebpackPluginTemplatePath,
                filename: 'index.html',
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
                        isLocal: isDev,
                        serverUrl: `http://localhost:${data.port}`
                    };
                }
            }),
            isDev
                ? new webpack_1.default.HotModuleReplacementPlugin()
                : // Extracts CSS into separate files
                    // Note: style-loader is for development, MiniCssExtractPlugin is for production
                    new mini_css_extract_plugin_1.default({
                        filename: `${paths.css}/[name].[contenthash].css`
                    })
        ].filter(Boolean), resolve: {
            extensions: ['.js', '.ts', '.jsx', '.tsx', '.mjs', '.wasm', '.json'],
            modules: ['node_modules', path_1.join(__dirname, '../../../node_modules')],
            alias: {
                '@': path_1.resolve('src/')
            }
        }, resolveLoader: {
            modules: ['node_modules', path_1.join(__dirname, '../../../node_modules')]
        }, performance: {
            hints: false
        }, stats: isDev ? defaults_1.WEBPACK_DEV_STATS : defaults_1.WEBPACK_BUILD_STATS }, (isDev
        ? {
            devServer: defaults_1.WEBPACK_DEV_SERVER_CONFIG
        }
        : {
            optimization: {
                minimize: true,
                minimizer: [`...`, new css_minimizer_webpack_plugin_1.default()],
                // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
                // instead of having their own. This also helps with long-term caching, since the chunks will only
                // change when actual code changes, not the webpack runtime.
                runtimeChunk: {
                    name: 'runtime'
                },
                chunkIds: 'named'
            },
            performance: {
                hints: false,
                maxEntrypointSize: 512000,
                maxAssetSize: 512000
            }
        }));
    if (isTs) {
        config.plugins.push(new fork_ts_checker_webpack_plugin_1.default({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true
                },
                mode: 'write-references'
            }
        }));
    }
    return config;
};
exports.getWebpackBaseConfig = getWebpackBaseConfig;
