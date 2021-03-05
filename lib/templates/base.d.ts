import Factory from '..';
import { Template } from 'fbi';
export default class TemplateWebBase extends Template {
    factory: Factory;
    id: string;
    features: any[];
    path: string;
    rule: any;
    constructor(factory: Factory);
    private get enterOrgName();
    private get enterProjectDescription();
    private get selectFeatures();
    /**
     * get template prompt options
     */
    protected getPromptOptions(): (string | {
        type: string;
        name: string;
        message: string;
        initial({ state }: any): string;
    })[];
    protected gathering(_flags: Record<string, any>): Promise<void>;
    protected writing(): Promise<void>;
    protected installing(flags: Record<string, any>): Promise<void>;
    protected ending(): Promise<void>;
}
