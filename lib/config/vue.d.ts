import type { Configuration } from 'webpack';
import { IConfigOption } from './utils';
export declare const getConfig: (options: IConfigOption) => Configuration;
export declare const deps: {
    'vue-loader': string;
    '@babel/plugin-proposal-class-properties': string;
};
