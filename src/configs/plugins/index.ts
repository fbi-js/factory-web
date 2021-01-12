import { Compiler } from 'webpack'

import fs from 'fs'
import { join, basename, extname } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

// output assets list in HtmlWebpackPlugin
export class AssetJsonPlugin {
  options: Record<string, any>

  constructor(options: { onlyEntryFile: boolean; input: string; output: string }) {
    this.options = options
  }

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
                (n) => `${publicPath}${filename.replace('[name]', n).replace('[fullhash]', hash)}`
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

    compiler.hooks.done.tap('AssetJsonPlugin output', async () => {
      const outputDir = compiler.options.output?.path
      if (result && outputDir) {
        let microAppJson = {
          entry: '',
          routes: []
        }
        if (this.options.onlyEntryFile) {
          try {
            const microAppJs = require(join(process.cwd(), this.options.input))
            microAppJson = {
              ...microAppJs
            }
          } catch (err) {
            console.log(err)
          }
          microAppJson.entry = JSON.parse(result)[0]
        } else {
          microAppJson = JSON.parse(result)
        }

        const targetFile = join(outputDir, this.options.output)
        try {
          await fs.writeFile(targetFile, JSON.stringify(microAppJson), () => {})
        } catch (err) {
          console.error(err)
        }
      }
    })
  }
}
