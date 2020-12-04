import type { Configuration } from 'webpack';
import type { IConfigOption } from '../types';
export declare const getConfig: (env: string) => Configuration;
export declare const getDeps: ({ factory }: IConfigOption) => {
    '@babel/preset-react': string;
    '@babel/plugin-proposal-class-properties': string;
    'react-hot-loader': string;
};
