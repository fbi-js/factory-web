import { Command } from 'fbi'
import Factory from '..'
import { ServerPlugin, createServer } from 'vite'
import { reactRefreshServerPlugin } from 'vite-plugin-react/dist/serverPlugin'

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

    try {
      this.clear()
      this.log(121212)
      // await this.exec.command(`npm run serve`, execOpts)
      const myPlugin: ServerPlugin = ({
        app // Koa app instance
      }) => {
        app.use(async (ctx: any, next: any) => {
          // You can do pre-processing here - this will be the raw incoming requests
          // before vite touches it.
          if (ctx.path.endsWith('.scss')) {
            // Note vue <style lang="xxx"> are supported by
            // default as long as the corresponding pre-processor is installed, so this
            // only applies to <link ref="stylesheet" href="*.scss"> or js imports like
            // `import '*.scss'`.
            console.log('pre processing: ', ctx.url)
            ctx.type = 'css'
            ctx.body = 'body { border: 1px solid red }'
          }

          // ...wait for vite to do built-in transforms
          await next()

          // Post processing before the content is served. Note this includes parts
          // compiled from `*.vue` files, where <template> and <script> are served as
          // `application/javascript` and <style> are served as `text/css`.
          if (ctx.response.is('js')) {
            console.log('post processing: ', ctx.url)
            console.log(ctx.body) // can be string or Readable stream
          }
        })
      }

      createServer({
        configureServer: [reactRefreshServerPlugin]
      })
    } catch (err) {
      this.error('Failed to starting server')
      this.error(err).exit()
    }
  }
}
