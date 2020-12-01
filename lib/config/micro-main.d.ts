import type { Configuration } from 'webpack';
import { IConfigOption } from '../types';
export declare const getConfig: (options: IConfigOption) => Configuration;
export declare const deps: {
    'standalone-single-spa-webpack-plugin': string;
    'fork-ts-checker-webpack-plugin': string;
    '@types/systemjs': string;
    'ts-loader': string;
};
