"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fbi_1 = require("fbi");
const vite_1 = require("vite");
const serverPlugin_1 = require("vite-plugin-react/dist/serverPlugin");
class CommandServe extends fbi_1.Command {
    constructor(factory) {
        super();
        this.factory = factory;
        this.id = 'serve';
        this.alias = 's';
        this.description = 'start development server';
        this.args = '';
        this.flags = [['-m, --mode <mode>', 'specify env mode(development|production|testing)', 'development']];
    }
    async run(flags, unknown) {
        var _a;
        process.env.NODE_ENV = (_a = flags.mode) !== null && _a !== void 0 ? _a : 'development';
        this.debug(`Factory: (${this.factory.id})`, 'from command', `"${this.id}"`, 'flags:', flags, 'unknown:', unknown);
        this.logStart(`Starting development server:`);
        const execOpts = {
            ...this.factory.execOpts,
            stdio: 'inherit'
        };
        try {
            this.clear();
            this.log(121212);
            // await this.exec.command(`npm run serve`, execOpts)
            const myPlugin = ({ app // Koa app instance
             }) => {
                app.use(async (ctx, next) => {
                    // You can do pre-processing here - this will be the raw incoming requests
                    // before vite touches it.
                    if (ctx.path.endsWith('.scss')) {
                        // Note vue <style lang="xxx"> are supported by
                        // default as long as the corresponding pre-processor is installed, so this
                        // only applies to <link ref="stylesheet" href="*.scss"> or js imports like
                        // `import '*.scss'`.
                        console.log('pre processing: ', ctx.url);
                        ctx.type = 'css';
                        ctx.body = 'body { border: 1px solid red }';
                    }
                    // ...wait for vite to do built-in transforms
                    await next();
                    // Post processing before the content is served. Note this includes parts
                    // compiled from `*.vue` files, where <template> and <script> are served as
                    // `application/javascript` and <style> are served as `text/css`.
                    if (ctx.response.is('js')) {
                        console.log('post processing: ', ctx.url);
                        console.log(ctx.body); // can be string or Readable stream
                    }
                });
            };
            vite_1.createServer({
                configureServer: [serverPlugin_1.reactRefreshServerPlugin]
            });
        }
        catch (err) {
            this.error('Failed to starting server');
            this.error(err).exit();
        }
    }
}
exports.default = CommandServe;
