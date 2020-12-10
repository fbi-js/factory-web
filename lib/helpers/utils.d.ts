import { IFactoryPaths } from '../types';
/**
 * get ip address with IPv4, default ip address is 0.0.0.0
 */
export declare const getIpAddress: () => string;
/**
 * get node_env
 */
export declare const getEnvMode: () => string;
/**
 * node_env is production
 */
export declare const isProd: () => boolean;
/**
 * node_env is development
 */
export declare const isDev: () => boolean;
/**
 * merge two object
 * @param obj1 map 1
 * @param obj2 map 2
 */
export declare const merge: (obj1: Record<string, any>, obj2: Record<string, any>) => {
    [x: string]: any;
};
/**
 * merge paths in ../configs/constant/paths & fbi.paths in package.json
 * @param userPaths fbi.paths in package.json
 */
export declare const getMergePaths: (userPaths: IFactoryPaths) => {
    cwd: string;
    src: string;
    dist: string;
    public: string;
    js: string;
    /**
     * get node_env
     */
    css: string;
    cssExtractPublicPath: string;
    img: string;
    assets: string;
};
