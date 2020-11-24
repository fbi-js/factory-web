import Factory from '..';
import BaseClass from './base';
export default class TemplateVue extends BaseClass {
    factory: Factory;
    id: string;
    path: string;
    constructor(factory: Factory);
    protected gathering(flags: Record<string, any>): Promise<void>;
    protected writing(): Promise<void>;
}
