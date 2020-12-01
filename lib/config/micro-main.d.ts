import type { Configuration } from 'webpack';
import { IConfigOption } from '../types';
export declare const getConfig: (options: IConfigOption) => Configuration;
export declare const deps: {
    'fork-ts-checker-webpack-plugin': string;
    '@types/systemjs': string;
};
