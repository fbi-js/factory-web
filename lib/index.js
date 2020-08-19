"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fbi_1 = require("fbi");
const build_1 = require("./commands/build");
const serve_1 = require("./commands/serve");
const factory_1 = require("./templates/factory");
class FactoryWeb extends fbi_1.Factory {
    constructor() {
        super(...arguments);
        this.id = 'factory-web';
        this.description = 'factorty for web factory development';
        this.commands = [new build_1.default(this), new serve_1.default(this)];
        this.templates = [new factory_1.default(this)];
        this.execOpts = {
            cwd: process.cwd(),
            localDir: path_1.join(__dirname, '../'),
            preferLocal: true
        };
    }
}
exports.default = FactoryWeb;
