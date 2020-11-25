import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
declare const _default: (data: Record<string, any>) => {
    devServer: {
        historyApiFallback: boolean;
        contentBase: string;
        open: boolean;
        compress: boolean;
        hot: boolean;
        port: number;
        overlay: boolean;
        stats: string;
    };
    mode: string | undefined;
    devtool: string | boolean;
    entry: {
        main: string;
    };
    output: {
        path: string;
        publicPath: string;
        filename: string;
    };
    module: {
        rules: ({
            test: RegExp;
            use: string[];
            exclude: RegExp;
            loader?: undefined;
            options?: undefined;
        } | {
            test: RegExp;
            loader: string;
            options: {
                limit: number;
                name: string;
            };
            use?: undefined;
            exclude?: undefined;
        } | {
            test: RegExp;
            use: (string | {
                loader: string;
                options: {
                    sourceMap: boolean;
                    importLoaders: number;
                    implementation?: undefined;
                };
            } | {
                loader: string;
                options: {
                    sourceMap: boolean;
                    importLoaders?: undefined;
                    implementation?: undefined;
                };
            } | {
                loader: string;
                options: {
                    sourceMap: boolean;
                    implementation: any;
                    importLoaders?: undefined;
                };
            })[] | (string | {
                loader: string;
                options: {
                    publicPath: string;
                    importLoaders?: undefined;
                    sourceMap?: undefined;
                    implementation?: undefined;
                };
            } | {
                loader: string;
                options: {
                    importLoaders: number;
                    sourceMap: boolean;
                    publicPath?: undefined;
                    implementation?: undefined;
                };
            } | {
                loader: string;
                options: {
                    implementation: any;
                    publicPath?: undefined;
                    importLoaders?: undefined;
                    sourceMap?: undefined;
                };
            })[];
            exclude?: undefined;
            loader?: undefined;
            options?: undefined;
        })[];
    };
    plugins: (HtmlWebpackPlugin | MiniCssExtractPlugin | webpack.ProgressPlugin | webpack.DefinePlugin | CleanWebpackPlugin)[];
    resolve: {
        alias: {
            '@': string;
        };
    };
    performance: {
        hints: boolean;
        maxEntrypointSize?: undefined;
        maxAssetSize?: undefined;
    };
    node: {
        setImmediate: boolean;
        dgram: string;
        fs: string;
        net: string;
        tls: string;
        child_process: string;
    };
} | {
    optimization: {
        minimize: boolean;
        minimizer: CssMinimizerPlugin[];
        runtimeChunk: {
            name: string;
        };
    };
    performance: {
        hints: boolean;
        maxEntrypointSize: number;
        maxAssetSize: number;
    };
    mode: string | undefined;
    devtool: string | boolean;
    entry: {
        main: string;
    };
    output: {
        path: string;
        publicPath: string;
        filename: string;
    };
    module: {
        rules: ({
            test: RegExp;
            use: string[];
            exclude: RegExp;
            loader?: undefined;
            options?: undefined;
        } | {
            test: RegExp;
            loader: string;
            options: {
                limit: number;
                name: string;
            };
            use?: undefined;
            exclude?: undefined;
        } | {
            test: RegExp;
            use: (string | {
                loader: string;
                options: {
                    sourceMap: boolean;
                    importLoaders: number;
                    implementation?: undefined;
                };
            } | {
                loader: string;
                options: {
                    sourceMap: boolean;
                    importLoaders?: undefined;
                    implementation?: undefined;
                };
            } | {
                loader: string;
                options: {
                    sourceMap: boolean;
                    implementation: any;
                    importLoaders?: undefined;
                };
            })[] | (string | {
                loader: string;
                options: {
                    publicPath: string;
                    importLoaders?: undefined;
                    sourceMap?: undefined;
                    implementation?: undefined;
                };
            } | {
                loader: string;
                options: {
                    importLoaders: number;
                    sourceMap: boolean;
                    publicPath?: undefined;
                    implementation?: undefined;
                };
            } | {
                loader: string;
                options: {
                    implementation: any;
                    publicPath?: undefined;
                    importLoaders?: undefined;
                    sourceMap?: undefined;
                };
            })[];
            exclude?: undefined;
            loader?: undefined;
            options?: undefined;
        })[];
    };
    plugins: (HtmlWebpackPlugin | MiniCssExtractPlugin | webpack.ProgressPlugin | webpack.DefinePlugin | CleanWebpackPlugin)[];
    resolve: {
        alias: {
            '@': string;
        };
    };
    node: {
        setImmediate: boolean;
        dgram: string;
        fs: string;
        net: string;
        tls: string;
        child_process: string;
    };
};
export default _default;
