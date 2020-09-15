declare function _exports(webpackEnv: any): {
    mode: string | false;
    bail: boolean;
    devtool: string | boolean;
    entry: any[];
    output: {
        path: string | undefined;
        pathinfo: boolean;
        filename: string | false;
        futureEmitAssets: boolean;
        chunkFilename: string | false;
        publicPath: any;
        devtoolModuleFilenameTemplate: false | ((info: any) => string);
        jsonpFunction: string;
        globalObject: string;
    };
    optimization: {
        minimize: boolean;
        minimizer: any[];
        splitChunks: {
            chunks: string;
            name: boolean;
        };
        runtimeChunk: {
            name: (entrypoint: any) => string;
        };
    };
    resolve: {
        modules: string[];
        extensions: string[];
        alias: {
            '@': string;
            src?: undefined;
            'react-native': string;
        } | {
            '@': string;
            src: string;
            'react-native': string;
        } | {
            '@': string;
            src?: undefined;
            'react-dom$': string;
            'scheduler/tracing': string;
            'react-native': string;
        } | {
            '@': string;
            src: string;
            'react-dom$': string;
            'scheduler/tracing': string;
            'react-native': string;
        };
        plugins: any[];
    };
    resolveLoader: {
        plugins: any[];
    };
    module: {
        strictExportPresence: boolean;
        rules: ({
            parser: {
                requireEnsure: boolean;
            };
            oneOf?: undefined;
        } | {
            oneOf: ({
                test: RegExp[];
                loader: string;
                options: {
                    limit: number;
                    name: string;
                    babelrc?: undefined;
                    customize?: undefined;
                    presets?: undefined;
                    plugins?: undefined;
                    cacheDirectory?: undefined;
                    cacheCompression?: undefined;
                    compact?: undefined;
                    configFile?: undefined;
                    sourceMaps?: undefined;
                    inputSourceMap?: undefined;
                };
                include?: undefined;
                exclude?: undefined;
                use?: undefined;
                sideEffects?: undefined;
            } | {
                test: RegExp;
                include: string;
                loader: string;
                options: {
                    babelrc: boolean;
                    customize: string;
                    presets: (string | {
                        flow: boolean;
                        typescript: boolean;
                    })[][];
                    plugins: (string | {
                        loaderMap: {
                            svg: {
                                ReactComponent: string;
                            };
                        };
                    })[][];
                    cacheDirectory: boolean;
                    cacheCompression: boolean;
                    compact: boolean;
                    limit?: undefined;
                    name?: undefined;
                    configFile?: undefined;
                    sourceMaps?: undefined;
                    inputSourceMap?: undefined;
                };
                exclude?: undefined;
                use?: undefined;
                sideEffects?: undefined;
            } | {
                test: RegExp;
                exclude: RegExp;
                loader: string;
                options: {
                    babelrc: boolean;
                    configFile: boolean;
                    compact: boolean;
                    presets: (string | {
                        helpers: boolean;
                    })[][];
                    cacheDirectory: boolean;
                    cacheCompression: boolean;
                    sourceMaps: boolean;
                    inputSourceMap: boolean;
                    limit?: undefined;
                    name?: undefined;
                    customize?: undefined;
                    plugins?: undefined;
                };
                include?: undefined;
                use?: undefined;
                sideEffects?: undefined;
            } | {
                test: RegExp;
                exclude: RegExp;
                use: (string | false | {
                    loader: any;
                    options: {
                        publicPath: string;
                    } | {
                        publicPath?: undefined;
                    };
                } | {
                    loader: string;
                    options: any;
                })[];
                sideEffects: boolean;
                loader?: undefined;
                options?: undefined;
                include?: undefined;
            } | {
                test: RegExp;
                use: (string | false | {
                    loader: any;
                    options: {
                        publicPath: string;
                    } | {
                        publicPath?: undefined;
                    };
                } | {
                    loader: string;
                    options: any;
                })[];
                loader?: undefined;
                options?: undefined;
                include?: undefined;
                exclude?: undefined;
                sideEffects?: undefined;
            } | {
                loader: string;
                exclude: RegExp[];
                options: {
                    name: string;
                    limit?: undefined;
                    babelrc?: undefined;
                    customize?: undefined;
                    presets?: undefined;
                    plugins?: undefined;
                    cacheDirectory?: undefined;
                    cacheCompression?: undefined;
                    compact?: undefined;
                    configFile?: undefined;
                    sourceMaps?: undefined;
                    inputSourceMap?: undefined;
                };
                test?: undefined;
                include?: undefined;
                use?: undefined;
                sideEffects?: undefined;
            })[];
            parser?: undefined;
        })[];
    };
    plugins: any[];
    node: {
        module: string;
        dgram: string;
        dns: string;
        fs: string;
        http2: string;
        net: string;
        tls: string;
        child_process: string;
    };
    performance: boolean;
};
export = _exports;
