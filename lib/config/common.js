"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const path_1 = require("path");
const paths_1 = require("./helpers/paths");
const copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const clean_webpack_plugin_1 = require("clean-webpack-plugin");
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const css_minimizer_webpack_plugin_1 = __importDefault(require("css-minimizer-webpack-plugin"));
const fork_ts_checker_webpack_plugin_1 = __importDefault(require("fork-ts-checker-webpack-plugin"));
const defaults_1 = require("./defaults");
exports.default = (data) => {
    var _a, _b, _c, _d;
    const buildMode = process.env.NODE_ENV || 'development';
    const isDev = buildMode === 'development';
    const isTs = (_b = (_a = data.factory) === null || _a === void 0 ? void 0 : _a.features) === null || _b === void 0 ? void 0 : _b.typescript;
    const isMicro = (_d = (_c = data.factory) === null || _c === void 0 ? void 0 : _c.template) === null || _d === void 0 ? void 0 : _d.startsWith('micro-');
    const config = Object.assign({ mode: buildMode, devtool: isDev ? 'inline-source-map' : false, entry: {
            main: path_1.join(paths_1.paths.src, `main.${isTs ? 'ts' : 'js'}`)
        }, output: {
            path: paths_1.paths.dist,
            publicPath: isDev ? '/' : '/',
            filename: isDev ? '[name].js?v=[hash]' : `${paths_1.paths.js}/[name].[hash].js`
        }, module: {
            rules: [
                // JavaScript: Use Babel to transpile JavaScript files
                {
                    test: /\.(js|ts)x?$/,
                    use: ['babel-loader'],
                    exclude: path_1.resolve('node_modules')
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 5000,
                        name: isDev ? '[name].[ext]?[hash:8]' : `${paths_1.paths.img}/[name].[hash:8].[ext]`,
                        esModule: false
                    }
                },
                {
                    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 5000,
                        name: isDev ? '[name].[ext]?[hash:8]' : `${paths_1.paths.assets}/[name].[hash:8].[ext]`,
                        esModule: false
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 5000,
                        name: isDev ? '[name].[ext]?[hash:8]' : `${paths_1.paths.assets}/[name].[hash:8].[ext]`,
                        esModule: false
                    }
                },
                // Styles: Inject CSS into the head with source maps
                {
                    test: /\.(scss|css)$/,
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
            !isMicro && new webpack_1.default.ProgressPlugin(),
            // Make appName & appVersion available as a constant
            new webpack_1.default.DefinePlugin(data.DefinePluginData || {}),
            // Removes/cleans build folders and unused assets when rebuilding
            new clean_webpack_plugin_1.CleanWebpackPlugin(),
            // Copies files from target to destination folder
            new copy_webpack_plugin_1.default({
                patterns: [
                    {
                        from: paths_1.paths.public,
                        to: 'assets',
                        globOptions: {
                            ignore: ['*.DS_Store', 'index.html']
                        }
                    }
                ]
            }),
            new html_webpack_plugin_1.default({
                title: data.title || 'My App',
                template: path_1.join(paths_1.paths.public, 'index.html'),
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
                        filename: `${paths_1.paths.css}/[name].[contenthash].css`,
                        chunkFilename: `${paths_1.paths.css}/[name]-[id].css`
                    })
        ].filter(Boolean), resolve: {
            extensions: ['.js', '.ts', '.jsx', '.tsx', '.mjs', '.wasm', '.json'],
            alias: {
                '@': path_1.resolve('src/')
            }
        }, performance: {
            hints: false
        }, stats: defaults_1.WEBPACK_STATS }, (isDev
        ? {
            devServer: defaults_1.WEBPACK_DEV_SERVER_CONFIG
        }
        : {
            optimization: {
                minimize: true,
                minimizer: [new css_minimizer_webpack_plugin_1.default()],
                // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
                // instead of having their own. This also helps with long-term caching, since the chunks will only
                // change when actual code changes, not the webpack runtime.
                runtimeChunk: {
                    name: 'runtime'
                }
            },
            performance: {
                hints: false,
                maxEntrypointSize: 512000,
                maxAssetSize: 512000
            }
        }));
    if (isTs) {
        config.plugins.push(new fork_ts_checker_webpack_plugin_1.default());
    }
    return config;
};
