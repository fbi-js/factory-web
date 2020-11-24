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
            type?: undefined;
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
                    importLoaders: number;
                    sourceMap: boolean;
                    implementation?: undefined;
                };
            } | {
                loader: string;
                options: {
                    implementation: any;
                    importLoaders?: undefined;
                    sourceMap?: undefined;
                };
            })[];
            exclude?: undefined;
            type?: undefined;
        } | {
            test: RegExp;
            type: string;
            use?: undefined;
            exclude?: undefined;
        })[];
    };
    plugins: (HtmlWebpackPlugin | MiniCssExtractPlugin | webpack.DefinePlugin | CleanWebpackPlugin)[];
    resolve: {
        extensions: string[];
        symlinks: boolean;
    };
    resolveLoader: {
        modules: string[];
    };
} | {
    optimization: {
        minimize: boolean;
        minimizer: (string | CssMinimizerPlugin)[];
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
            type?: undefined;
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
                    importLoaders: number;
                    sourceMap: boolean;
                    implementation?: undefined;
                };
            } | {
                loader: string;
                options: {
                    implementation: any;
                    importLoaders?: undefined;
                    sourceMap?: undefined;
                };
            })[];
            exclude?: undefined;
            type?: undefined;
        } | {
            test: RegExp;
            type: string;
            use?: undefined;
            exclude?: undefined;
        })[];
    };
    plugins: (HtmlWebpackPlugin | MiniCssExtractPlugin | webpack.DefinePlugin | CleanWebpackPlugin)[];
    resolve: {
        extensions: string[];
        symlinks: boolean;
    };
    resolveLoader: {
        modules: string[];
    };
};
export default _default;
