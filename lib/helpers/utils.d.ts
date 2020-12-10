import { IFactoryPaths } from '../types';
/**
 * get ip address with IPv4, default ip address is 0.0.0.0
 */
export declare const getIpAddress: () => string;
export declare const getEnvMode: () => string;
export declare const isProd: () => boolean;
export declare const isDev: () => boolean;
export declare const merge: (obj1: Record<string, any>, obj2: Record<string, any>) => {
    [x: string]: any;
};
export declare const getMergePaths: (userPaths: IFactoryPaths) => {
    cwd: string;
    src: string;
    dist: string;
    public: string;
    js: string;
    css: string;
    cssExtractPublicPath: string;
    img: string;
    assets: string;
};
