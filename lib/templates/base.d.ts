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
    /**
     * from -> /factory-web/templates/${template}/src-ts/routes/index.ts.ejs
     * to -> ${this.targetDir}/src-ts/routes/index.ts
     * @param srcPath file entry path
     */
    private getOutputPath;
    /**
     * copy or render file from srcPath to outputPath, .ejs file will be render by ejs
     * @param srcPath file entry path
     * @param outputPath file output path
     */
    private writeFile;
    /**
     *
     * @param files 文件列表
     */
    private writingFiles;
    protected writing(): Promise<void>;
    protected installing(flags: Record<string, any>): Promise<void>;
    protected ending(): Promise<void>;
}
