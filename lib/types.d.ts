import type { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
export interface IConfigOption {
    title: string;
    port?: number;
    mode?: string;
    cosEnv: string;
    startEntry: string;
    factory: {
        id: string;
        version: string;
        template: string;
        features: Record<string, any>;
    };
}
export interface WebpackConfiguration extends Configuration {
    devServer: DevServerConfiguration;
}
