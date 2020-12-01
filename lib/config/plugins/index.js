"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetJsonPlugin = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = require("path");
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
// output assets list in HtmlWebpackPlugin
class AssetJsonPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        let result;
        compiler.hooks.compilation.tap('AssetJsonPlugin', (compilation) => {
            html_webpack_plugin_1.default.getHooks(compilation).afterEmit.tapAsync('AssetJsonPlugin', async (data, cb) => {
                // get entries
                let entryNames = [];
                switch (typeof compiler.options.entry) {
                    case 'string':
                        entryNames.push(path_1.basename(compiler.options.entry).replace(path_1.extname(compiler.options.entry), ''));
                        break;
                    case 'object':
                        entryNames = Object.keys(compiler.options.entry);
                        break;
                    default:
                        break;
                }
                if (compiler.options.output) {
                    const { filename, publicPath } = compiler.options.output;
                    if (this.options.onlyEntryFile && typeof filename === 'string') {
                        const hash = data.plugin.childCompilerHash;
                        const tmp = entryNames.map((n) => `${publicPath}${filename.replace('[name]', n).replace('[hash]', hash)}`);
                        result = JSON.stringify(tmp);
                    }
                    else {
                        result = data.plugin.assetJson;
                    }
                }
                // Tell webpack to move on
                cb(null, data);
            });
        });
        compiler.hooks.done.tapAsync('AssetJsonPlugin output', async (stats /* stats is passed as argument when done hook is tapped.  */) => {
            var _a;
            if (result && ((_a = compiler.options.output) === null || _a === void 0 ? void 0 : _a.path)) {
                const targetFile = path_1.join(compiler.options.output.path, 'assets.json');
                try {
                    await promises_1.default.writeFile(targetFile, result);
                }
                catch (err) {
                    console.error(err);
                }
            }
        });
    }
}
exports.AssetJsonPlugin = AssetJsonPlugin;
