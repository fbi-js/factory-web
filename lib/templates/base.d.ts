import Factory from '..';
import { Template } from 'fbi';
export default class TemplateWebBase extends Template {
    factory: Factory;
    id: string;
    features: any[];
    path: string;
    rule: any;
    prompts: any[];
    constructor(factory: Factory);
    /**
     * get template prompt options
     */
    protected getPromptOptions(): any[];
    protected gathering(_flags: Record<string, any>): Promise<void>;
    protected writing(): Promise<void>;
    protected installing(flags: Record<string, any>): Promise<void>;
    protected ending(): Promise<void>;
}
