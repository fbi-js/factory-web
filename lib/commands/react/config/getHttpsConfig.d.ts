export = getHttpsConfig;
declare function getHttpsConfig(): boolean | {
    cert: Buffer;
    key: Buffer;
};
