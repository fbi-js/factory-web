import { Template } from 'fbi';
import * as ejs from 'ejs';
import Factory from '..';
import SubTemplateReact from './react';
import SubTemplateUmiQiankun from './umi-qiankun';
export default class TemplateWeb extends Template {
    factory: Factory;
    id: string;
    description: string;
    path: string;
    renderer: typeof ejs.render;
    templates: (SubTemplateReact | SubTemplateUmiQiankun)[];
    projectInfo: Record<string | number, any>;
    constructor(factory: Factory);
    protected gathering(flags: Record<string, any>): Promise<void>;
}
