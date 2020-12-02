import type { Compiler } from 'webpack'

import fs from 'fs'
import { join, basename, extname } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

// output assets list in HtmlWebpackPlugin
export class AssetJsonPlugin {
  constructor(public options: { onlyEntryFile: boolean }) {}

  apply(compiler: Compiler) {
    let result: string

    compiler.hooks.compilation.tap('AssetJsonPlugin', (compilation: any) => {
      HtmlWebpackPlugin.getHooks(compilation).afterEmit.tapAsync(
        'AssetJsonPlugin',
        async (data: any, cb: any) => {
          // get entries
          let entryNames: string[] = []
          switch (typeof compiler.options.entry) {
            case 'string':
              entryNames.push(
                basename(compiler.options.entry).replace(extname(compiler.options.entry), '')
              )
              break
            case 'object':
              entryNames = Object.keys(compiler.options.entry)
              break
            default:
              break
          }

          if (compiler.options.output) {
            const { filename, publicPath } = compiler.options.output
            if (this.options.onlyEntryFile && typeof filename === 'string') {
              const hash = data.plugin.childCompilerHash
              const tmp = entryNames.map(
                (n) => `${publicPath}${filename.replace('[name]', n).replace('[hash]', hash)}`
              )
              result = JSON.stringify(tmp)
            } else {
              result = data.plugin.assetJson
            }
          }
          // Tell webpack to move on
          cb(null, data)
        }
      )
    })

    compiler.hooks.done.tap('AssetJsonPlugin output', async (
      stats /* stats is passed as argument when done hook is tapped.  */
    ) => {
      if (result && compiler.options.output?.path) {
        const targetFile = join(compiler.options.output.path, 'assets.json')
        try {
          await fs.writeFile(targetFile, result, () => {})
        } catch (err) {
          console.error(err)
        }
      }
    })
  }
}