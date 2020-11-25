/// <reference types="webpack-dev-server" />
import type { Configuration } from 'webpack';
export declare const getConfig: (env: string) => Configuration;
export declare const deps: {
    'vue-loader': string;
    '@babel/plugin-proposal-class-properties': string;
};
