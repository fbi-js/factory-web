import type { Configuration } from 'webpack';
import { IConfigOption } from '../types';
export declare const getConfig: (options: IConfigOption) => Configuration;
export declare const deps: {
    'webpack-config-single-spa-ts': string;
    'ts-config-single-spa': string;
    '@types/systemjs': string;
    'ts-loader': string;
};
