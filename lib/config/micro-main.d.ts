import type { Configuration } from 'webpack';
import { IConfigOption } from '../types';
export declare const getConfig: (options: IConfigOption) => Configuration;
export declare const getDeps: ({ factory }: IConfigOption) => {
    '@types/systemjs': string;
};
