import type { Configuration } from 'webpack';
export declare const resolveWebpackConfig: (type: string, data: Record<string, any>) => Promise<Configuration>;
export declare const resolveDeps: (type: string, data: Record<string, any>) => {};
