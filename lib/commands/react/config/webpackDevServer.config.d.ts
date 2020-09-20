declare function _exports(proxy: any, allowedHost: any): {
    disableHostCheck: boolean;
    compress: boolean;
    clientLogLevel: string;
    contentBase: string;
    contentBasePublicPath: any;
    watchContentBase: boolean;
    hot: boolean;
    transportMode: string;
    injectClient: boolean;
    sockHost: string | undefined;
    sockPath: string | undefined;
    sockPort: string | undefined;
    publicPath: any;
    quiet: boolean;
    watchOptions: {
        ignored: any;
    };
    https: boolean | {
        cert: Buffer;
        key: Buffer;
    };
    host: string;
    overlay: boolean;
    historyApiFallback: {
        disableDotRule: boolean;
        index: any;
    };
    public: any;
    proxy: any;
    before(app: any, server: any): void;
    after(app: any): void;
};
export = _exports;
