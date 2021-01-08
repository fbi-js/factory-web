import { Compiler } from 'webpack';
export declare class AssetJsonPlugin {
    options: Record<string, any>;
    constructor(options: {
        onlyEntryFile: boolean;
        input: string;
        output: string;
    });
    apply(compiler: Compiler): void;
}
