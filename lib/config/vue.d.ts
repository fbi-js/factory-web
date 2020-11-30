import type { Configuration } from 'webpack';
import { IConfigOption } from '../types';
export declare const getConfig: (options: IConfigOption) => Configuration;
export declare const deps: {
    'vue-loader': string;
    'vue-template-compiler': string;
    '@babel/plugin-proposal-class-properties': string;
};
