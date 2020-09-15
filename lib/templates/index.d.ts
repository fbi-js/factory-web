import { Template } from 'fbi';
import * as ejs from 'ejs';
import Factory from '..';
import SubTemplateReact from './react';
import SubTemplateVue from './vue';
import SubTemplateVue3 from './vue3';
import SubTemplateReactGraphql from './react/graphql';
export default class TemplateWeb extends Template {
    factory: Factory;
    id: string;
    description: string;
    path: string;
    renderer: typeof ejs.render;
    templates: (SubTemplateReact | SubTemplateVue | SubTemplateVue3 | SubTemplateReactGraphql)[];
    projectInfo: Record<string | number, any>;
    constructor(factory: Factory);
    protected gathering(flags: Record<string, any>): Promise<void>;
}
