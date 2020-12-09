import Factory from '..';
import TemplateVue from './vue';
export default class TemplateMicroVue extends TemplateVue {
    factory: Factory;
    id: string;
    path: string;
    description: string;
    templates: never[];
    constructor(factory: Factory);
    protected gathering(flags: Record<string, any>): Promise<void>;
}
