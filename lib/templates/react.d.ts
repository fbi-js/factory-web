import Factory from '..';
import BaseClass from './base';
export default class TemplateReact extends BaseClass {
    factory: Factory;
    id: string;
    path: string;
    description: string;
    templates: never[];
    constructor(factory: Factory);
    protected gathering(flags: Record<string, any>): Promise<void>;
    protected writing(): Promise<void>;
}
