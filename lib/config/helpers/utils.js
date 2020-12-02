"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIpAddress = exports.guid = exports.getRunPwd = exports.getAppConfig = void 0;
const { networkInterfaces } = require('os');
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
        selfApp
    };
}
exports.getAppConfig = getAppConfig;
function getRunPwd() {
    return process.cwd();
}
exports.getRunPwd = getRunPwd;
function guid() {
    return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
exports.guid = guid;
function getIpAddress() {
    // code source: https://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
    const nets = networkInterfaces();
    let ipAddress = '0.0.0.0';
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal && name === 'en0') {
                ipAddress = net.address;
            }
        }
    }
    return ipAddress;
}
exports.getIpAddress = getIpAddress;
