declare function getAppConfig(path: any): {
    base: any;
    otherApps: any;
    selfApp: any;
};
declare function getRunPwd(): string;
declare function guid(): string;
declare function getIpAddress(): string;
export { getAppConfig, getRunPwd, guid, getIpAddress };
