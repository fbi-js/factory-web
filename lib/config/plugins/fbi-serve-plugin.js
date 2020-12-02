"use strict";
// import type { Compiler } from 'webpack'
// export class CliServePlugin {
//   constructor(public options: { onlyEntryFile: boolean }) {}
//   apply(compiler: Compiler) {
//     let result: string
//     compiler.hooks.compilation.tap('fbi-serve-plugin', (compilation: any) => {
//       HtmlWebpackPlugin.getHooks(compilation).afterEmit.tapAsync(
//         'AssetJsonPlugin',
//         async (data: any, cb: any) => {
//           // get entries
//           let entryNames: string[] = []
//           switch (typeof compiler.options.entry) {
//             case 'string':
//               entryNames.push(
//                 basename(compiler.options.entry).replace(extname(compiler.options.entry), '')
//               )
//               break
//             case 'object':
//               entryNames = Object.keys(compiler.options.entry)
//               break
//             default:
//               break
//           }
//           if (compiler.options.output) {
//             const { filename, publicPath } = compiler.options.output
//             if (this.options.onlyEntryFile && typeof filename === 'string') {
//               const hash = data.plugin.childCompilerHash
//               const tmp = entryNames.map(
//                 (n) => `${publicPath}${filename.replace('[name]', n).replace('[hash]', hash)}`
//               )
//               result = JSON.stringify(tmp)
//             } else {
//               result = data.plugin.assetJson
//             }
//           }
//           // Tell webpack to move on
//           cb(null, data)
//         }
//       )
//     })
//     compiler.hooks.done.tap('fbi-serve-plugin', async (
//       stats /* stats is passed as argument when done hook is tapped.  */
//     ) => {
//       if (stats.hasErrors()) {
//         return
//       }
//       if (result && compiler.options.output?.path) {
//         try {
//         } catch (err) {
//           console.error(err)
//         }
//       }
//     })
//   }
// }
