import Factory from '..';
import * as ejs from 'ejs';
import { Template } from 'fbi';
export default class TemplateWebBase extends Template {
    factory: Factory;
    id: string;
    renderer: typeof ejs.render;
    features: any[];
    copyFileTypes: string;
    copyFiles: string[];
    renderFileTypes: string;
    renderFiles: string[];
    constructor(factory: Factory);
    protected gathering(flags: Record<string, any>): Promise<void>;
    private getCopyFiles;
    private getRenderFiles;
    protected writing(): Promise<void>;
    protected installing(flags: Record<string, any>): Promise<void>;
    protected ending(): Promise<void>;
}
