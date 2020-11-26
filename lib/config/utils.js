"use strict";
function getAppConfig(path) {
    let appConfig = {};
    try {
        appConfig = require(path);
        // eslint-disable-next-line no-empty
    }
    catch (_a) { }
    const base = appConfig.base || '';
    const otherApps = appConfig.apps || [];
    const selfApp = appConfig.selfApp || {};
    return {
        base,
        otherApps,
        selfApp,
    };
}
module.exports = {
    getAppConfig,
};
