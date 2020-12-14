import { TemplateTypes } from '../../types';
import type { Configuration } from 'webpack';
export * from './base';
/**
 * get template webpack config
 * @param type template file name, can be get "micro-main" | "micro-react" | "micro-vue" | "react" | "vue"
 * @param data
 */
export declare const getTemplateWebpackConfig: (type: TemplateTypes, data: Record<string, any>) => {};
/**
 * get user webpack config data, config file is 'webpack.config.js' in project root directory
 */
export declare const getUserConfig: () => {};
/**
 * support custom base webpack config when user webpack config is a function
 * @param userConfig user webpack config
 * @param baseConfig base webpack config
 */
export declare const resolveUserConfig: (userConfig: Configuration | Function, baseConfig: Configuration) => any;
/**
 * add global variable by use process.env.xxx
 * @param data
 */
export declare const getDefinePluginData: (data: Record<string, any>) => {
    definePluginData: {
        'process.env.NODE_ENV': string;
        'process.env.MICRO_MODE': string;
    };
};
