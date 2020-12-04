import { IConfigOption } from '../types';
export declare const getConfig: (options: IConfigOption) => import("webpack").Configuration;
export declare const getDeps: (data: IConfigOption) => {
    'vue-eslint-parser'?: string;
    '@typescript-eslint/parser'?: string;
    'vue-loader': string;
    'vue-template-compiler': string;
    '@babel/plugin-proposal-class-properties': string;
    'eslint-plugin-vue': string;
};
