import { timeStamp } from 'console'
import { Command } from 'fbi'
import Factory from '..'
import { REACT_GRAPHQL_TEMPLATE_ID } from '../const'
const run = require('./react/scripts/start.js')
// import { createServer } from 'vite'

// const argv = require('minimist')(process.argv.slice(2))
// const command = argv._[0]
// const defaultMode = command === 'build' ? 'production' : 'development'
// const { help, h, version, v } = argv

export default class CommandServe extends Command {
  id = 'serve'
  alias = 's'
  description = 'start development server'
  args = ''
  flags = [['-m, --mode <mode>', 'specify env mode(development|production|testing)', 'development']]

  constructor(public factory: Factory) {
    super()
  }

  public async run(flags: any, unknown: any) {
    process.env.NODE_ENV = flags.mode ?? 'development'
    const start = Date.now()

    this.debug(
      `Factory: (${this.factory.id})`,
      'from command',
      `"${this.id}"`,
      'flags:',
      flags,
      'unknown:',
      unknown
    )

    this.logStart(`Starting development server:`)
    const execOpts: any = {
      ...this.factory.execOpts,
      stdio: 'inherit'
    }
    this.clear()

    if (this.factory.id === REACT_GRAPHQL_TEMPLATE_ID) {
      await run()
    } else {
      await this.exec.command('vite', execOpts)
    }
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

  // private async resolveOptions(mode: string) {
  //   // specify env mode
  //   argv.mode = mode
  //   // map jsx args
  //   if (argv['jsx-factory']) {
  //     ;(argv.jsx || (argv.jsx = {})).factory = argv['jsx-factory']
  //   }
  //   if (argv['jsx-fragment']) {
  //     ;(argv.jsx || (argv.jsx = {})).fragment = argv['jsx-fragment']
  //   }
  //   // cast xxx=true | false into actual booleans
  //   Object.keys(argv).forEach((key) => {
  //     if (argv[key] === 'false') {
  //       argv[key] = false
  //     }
  //     if (argv[key] === 'true') {
  //       argv[key] = true
  //     }
  //   })
  //   // command
  //   if (argv._[0]) {
  //     argv.command = argv._[0]
  //   }
  //   // normalize root
  //   // assumes all commands are in the form of `vite [command] [root]`
  //   if (!argv.root && argv._[1]) {
  //     argv.root = argv._[1]
  //   }

  //   if (argv.root) {
  //     argv.root = path.isAbsolute(argv.root) ? argv.root : path.resolve(argv.root)
  //   }

  //   // deprecation warning
  //   if (argv.sw || argv.serviceWorker) {
  //     console.warn(
  //       this.style.yellow(
  //         `[vite] service worker mode has been removed due to insufficient performance gains.`
  //       )
  //     )
  //   }

  //   return argv
  // }
}
