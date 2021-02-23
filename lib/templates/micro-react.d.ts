import Factory from '..';
import TemplateReact from './react';
export default class TemplateMicroReact extends TemplateReact {
    factory: Factory;
    id: string;
    path: string;
    description: string;
    templates: never[];
    features: never[];
    constructor(factory: Factory);
    protected gathering(flags: Record<string, any>): Promise<void>;
}
