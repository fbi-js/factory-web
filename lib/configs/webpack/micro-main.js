"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const path_1 = require("path");
const paths_1 = require("../constant/paths");
const getConfig = (data) => {
    const pkgName = require(path_1.join(paths_1.paths.cwd, 'package.json'));
    const fullName = pkgName.replace('@', '');
    const nameArr = fullName.split('/');
    if (nameArr.length < 2) {
        throw Error(`package name should follow '@orgName/projectName' format`);
    }
    const orgName = nameArr[0];
    const projectName = nameArr[1];
    const config = {
        output: {
            libraryTarget: 'system',
            path: paths_1.paths.dist,
            devtoolNamespace: `${orgName}_${projectName}`
        },
        module: {
            rules: [
                {
                    parser: {
                        system: false
                    }
                }
            ]
        },
        externals: ['single-spa', new RegExp(`^@${orgName}/`)]
    };
    return config;
};
exports.getConfig = getConfig;
