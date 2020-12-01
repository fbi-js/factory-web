import type { Compiler } from 'webpack';
export declare class AssetJsonPlugin {
    options: {
        onlyEntryFile: boolean;
    };
    constructor(options: {
        onlyEntryFile: boolean;
    });
    apply(compiler: Compiler): void;
}
