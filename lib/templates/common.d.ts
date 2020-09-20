export declare function getNameAndDescriptionConfig(defaultName: string): ({
    type: string;
    name: string;
    message: string;
    initial({ enquirer }: any): string;
    validate(value: any): boolean;
} | {
    type: string;
    name: string;
    message: string;
    initial({ state }: any): string;
})[];
