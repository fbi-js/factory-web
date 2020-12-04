import type { Configuration } from 'webpack';
import { IConfigOption } from '../types';
export declare const getConfig: (data: IConfigOption) => Configuration;
export declare const getDeps: ({ factory }: IConfigOption) => {
    'vue-eslint-parser'?: string;
    '@typescript-eslint/parser'?: string;
    'vue-loader': string;
    'vue-template-compiler': string;
    '@babel/plugin-proposal-class-properties': string;
    'eslint-plugin-vue': string;
};
