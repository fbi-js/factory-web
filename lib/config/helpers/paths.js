"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paths = void 0;
const path_1 = require("path");
const cwd = process.cwd();
exports.paths = {
    cwd,
    // Source files
    src: path_1.resolve(cwd, 'src'),
    // Production build files
    dist: path_1.resolve(cwd, 'dist'),
    // Static files that get copied to build folder
    public: path_1.resolve(cwd, 'public'),
    js: 'js',
    css: 'css',
    img: 'img',
    assets: 'assets'
};
