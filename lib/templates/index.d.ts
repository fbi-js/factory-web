import { Template } from 'fbi';
import * as ejs from 'ejs';
import Factory from '..';
import SubTemplateReact from './react';
import SubTemplateVue from './vue';
import SubTemplateVue3 from './vue3';
export default class TemplateWeb extends Template {
    factory: Factory;
    id: string;
    description: string;
    path: string;
    renderer: typeof ejs.render;
    templates: (SubTemplateVue | SubTemplateReact | SubTemplateVue3)[];
    projectInfo: Record<string | number, any>;
    constructor(factory: Factory);
    protected gathering(flags: Record<string, any>): Promise<void>;
}
