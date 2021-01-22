"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const path_1 = require("path");
const webpack_config_base_1 = __importDefault(require("@fbi-js/webpack-config-base"));
const getConfig = (options) => {
    var _a, _b;
    const pkg = require(path_1.join(process.cwd(), 'package.json'));
    const fullName = (_b = (_a = pkg === null || pkg === void 0 ? void 0 : pkg.name) === null || _a === void 0 ? void 0 : _a.replace('@', '')) !== null && _b !== void 0 ? _b : '';
    const nameArr = fullName.split('/');
    if (nameArr.length < 2) {
        throw Error("package name should follow '@orgName/projectName' format");
    }
    const orgName = nameArr[0];
    const projectName = nameArr[1];
    return webpack_config_base_1.default({
        options,
        webpackConfig: {
            output: {
                libraryTarget: 'system',
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
        }
    });
};
exports.getConfig = getConfig;
