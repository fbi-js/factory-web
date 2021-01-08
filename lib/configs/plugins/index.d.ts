import { Compiler } from 'webpack';
export declare class AssetJsonPlugin {
    options: {
        onlyEntryFile: boolean;
        input: string;
        output: string;
    };
    constructor(options: {
        onlyEntryFile: boolean;
        input: string;
        output: string;
    });
    apply(compiler: Compiler): void;
}
