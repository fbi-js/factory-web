"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deps = exports.getConfig = void 0;
const getConfig = (env) => {
    const orgName = 'project-name';
    const projectName = 'root-config';
    const singleSpaDefaults = require('webpack-config-single-spa-ts');
    const config = singleSpaDefaults({
        orgName,
        projectName
    });
    return config;
};
exports.getConfig = getConfig;
exports.deps = {
    'webpack-config-single-spa-ts': '^1.17.4 ',
    'ts-config-single-spa': '^1.9.0'
};
