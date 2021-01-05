import { Configuration } from 'webpack';
import { TemplateTypes } from '../types';
export declare const resolveWebpackConfig: (type: TemplateTypes, data: Record<string, any>) => Promise<Configuration>;
