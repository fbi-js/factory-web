declare function getAppConfig(path: any): {
    base: any;
    otherApps: any;
    selfApp: any;
};
declare function getRunPwd(): string;
declare function guid(): string;
declare function getIpAddress(): string;
declare const _default: {
    getAppConfig: typeof getAppConfig;
    getRunPwd: typeof getRunPwd;
    guid: typeof guid;
    getIpAddress: typeof getIpAddress;
};
export default _default;
