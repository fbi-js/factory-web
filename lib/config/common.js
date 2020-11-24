"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const path_1 = require("path");
const paths_1 = require("./paths");
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
const clean_webpack_plugin_1 = require("clean-webpack-plugin");
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const css_minimizer_webpack_plugin_1 = __importDefault(require("css-minimizer-webpack-plugin"));
exports.default = (data) => {
    const buildMode = process.env.NODE_ENV;
    const isDev = buildMode === 'development';
    const appName = process.env.npm_package_name;
    const appVersion = process.env.npm_package_version;
    const distDir = path_1.join(process.cwd(), 'dist');
    return Object.assign({ mode: buildMode, devtool: isDev ? 'inline-source-map' : false, entry: {
            main: path_1.join(paths_1.paths.src, 'main.js')
        }, output: {
            path: paths_1.paths.dist,
            publicPath: '/',
            filename: isDev ? '[name].js?v=[contenthash]' : 'js/[name].[contenthash].js'
        }, module: {
            rules: [
                // JavaScript: Use Babel to transpile JavaScript files
                {
                    test: /\.(js|jsx)$/,
                    use: ['babel-loader'],
                    exclude: /node_modules/
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
                            mini_css_extract_plugin_1.default.loader,
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
                },
                // images
                {
                    test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                    type: 'asset/resource'
                },
                // fonts and SVGs
                {
                    test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                    type: 'asset/inline'
                }
            ]
        }, plugins: [
            // Make appName & appVersion available as a constant
            new webpack_1.default.DefinePlugin({ appName: JSON.stringify(appName) }),
            new webpack_1.default.DefinePlugin({ appVersion: JSON.stringify(appVersion) }),
            // Removes/cleans build folders and unused assets when rebuilding
            new clean_webpack_plugin_1.CleanWebpackPlugin(),
            // Copies files from target to destination folder
            new copy_webpack_plugin_1.default({
                patterns: [
                    {
                        from: paths_1.paths.public,
                        to: 'assets',
                        globOptions: {
                            ignore: ['*.DS_Store']
                        }
                    }
                ]
            }),
            new html_webpack_plugin_1.default({
                title: data.title || 'My App',
                template: path_1.join(paths_1.paths.public, 'index.html'),
                filename: 'index.html' // output file
            }),
            isDev
                ? new webpack_1.default.HotModuleReplacementPlugin()
                : // Extracts CSS into separate files
                    // Note: style-loader is for development, MiniCssExtractPlugin is for production
                    new mini_css_extract_plugin_1.default({
                        filename: 'styles/[name].[contenthash].css',
                        chunkFilename: '[id].css'
                    })
        ], resolve: {
            extensions: ['*', '.js', '.vue'],
            symlinks: false
        }, resolveLoader: {
            modules: ['node_modules', 'factory-web/node_modules']
        } }, (isDev
        ? {
            devServer: {
                historyApiFallback: true,
                contentBase: distDir,
                open: true,
                compress: true,
                hot: true,
                port: 8080,
                overlay: true,
                stats: 'errors-only'
            }
        }
        : {
            optimization: {
                minimize: true,
                minimizer: [new css_minimizer_webpack_plugin_1.default(), '...'],
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
};
