"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMergePaths = exports.merge = exports.isDev = exports.isProd = exports.getEnvMode = exports.getIpAddress = void 0;
const { networkInterfaces } = require('os');
const paths_1 = require("../config/constant/paths");
/**
 * get ip address with IPv4, default ip address is 0.0.0.0
 */
const getIpAddress = () => {
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
};
exports.getIpAddress = getIpAddress;
const getEnvMode = () => {
    return process.env.NODE_ENV || 'development';
};
exports.getEnvMode = getEnvMode;
const isProd = () => {
    return process.env.NODE_ENV === 'production';
};
exports.isProd = isProd;
const isDev = () => {
    const buildMode = process.env.NODE_ENV || 'development';
    return buildMode === 'development';
};
exports.isDev = isDev;
const merge = (obj1, obj2) => {
    return Object.assign(Object.assign({}, obj1), obj2);
};
exports.merge = merge;
const getMergePaths = (userPaths) => {
    return Object.assign(Object.assign({}, paths_1.paths), userPaths);
};
exports.getMergePaths = getMergePaths;
