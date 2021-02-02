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
    private get enterOrgName();
    private get enterProjectName();
    private get enterProjectDescription();
    private get selectFeatures();
    private getPromptOptions;
    protected gathering(_flags: Record<string, any>): Promise<void>;
    protected getCopyFiles(): (string | {
        from: string;
        to: string;
    })[];
    protected getRenderFiles(): (string | {
        from: string;
        to: string;
    })[];
    private copyFile;
    protected writing(): Promise<void>;
    protected installing(flags: Record<string, any>): Promise<void>;
    protected ending(): Promise<void>;
}
