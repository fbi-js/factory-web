"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fbi_1 = require("fbi");
// import { createServer } from 'vite'
// const argv = require('minimist')(process.argv.slice(2))
// const command = argv._[0]
// const defaultMode = command === 'build' ? 'production' : 'development'
// const { help, h, version, v } = argv
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
        const start = Date.now();
        this.debug(`Factory: (${this.factory.id})`, 'from command', `"${this.id}"`, 'flags:', flags, 'unknown:', unknown);
        this.logStart(`Starting development server:`);
        const execOpts = {
            ...this.factory.execOpts,
            stdio: 'inherit'
        };
        this.clear();
        await this.exec.command('vite', execOpts);
        // const options = await this.resolveOptions('development')
        // this.log(options, 12121882)
        // const server = createServer(options)
        // let port = options.port || 3000
        // let hostname = options.hostname || 'localhost'
        // const protocol = options.https ? 'https' : 'http'
        // server.on('error', (e: Error & { code?: string }) => {
        //   if (e.code === 'EADDRINUSE') {
        //     console.log(`Port ${port} is in use, trying another one...`)
        //     setTimeout(() => {
        //       server.close()
        //       server.listen(++port)
        //     }, 100)
        //   } else {
        //     this.style.red(`[vite] server error:`)
        //     console.error(e)
        //   }
        // })
        // server.listen(port, () => {
        //   console.log()
        //   console.log(`Dev server running at:`)
        //   const interfaces = os.networkInterfaces()
        //   Object.keys(interfaces).forEach((key) => {
        //     ;(interfaces[key] || [])
        //       .filter((details: any) => details.family === 'IPv4')
        //       .map((detail: any) => {
        //         return {
        //           type: detail.address.includes('127.0.0.1') ? 'Local:   ' : 'Network: ',
        //           host: detail.address.replace('127.0.0.1', hostname)
        //         }
        //       })
        //       .forEach(({ type, host }) => {
        //         const url = `${protocol}://${host}:${this.style.bold(port)}/`
        //         console.log(`  > ${type} ${this.style.cyan(url)}`)
        //       })
        //   })
        //   console.log()
        //   this.debug(`server ready in ${Date.now() - start}ms.`)
        //   console.log(3434)
        // })
    }
}
exports.default = CommandServe;
