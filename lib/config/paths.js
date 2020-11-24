"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paths = void 0;
const path_1 = require("path");
exports.paths = {
    // Source files
    src: path_1.resolve(process.cwd(), 'src'),
    // Production build files
    dist: path_1.resolve(process.cwd(), 'dist'),
    // Static files that get copied to build folder
    public: path_1.resolve(process.cwd(), 'public')
};
