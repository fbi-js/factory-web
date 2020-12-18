import type { Configuration as WebpackConfiguration } from 'webpack';
export declare const PORT = 9000;
export declare const HOST = "0.0.0.0";
export declare const WEBPACK_STATS: WebpackConfiguration['stats'];
export declare const WEBPACK_DEV_SERVER_CONFIG: Record<string, any>;
export declare const isDev: () => boolean;
