#!/usr/bin/env node

// reference: https://github.com/pixability/federated-types/blob/main/cli.js

const ts = require('typescript')
const fs = require('fs-extra')
const path = require('path')
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

const getArg = (argName) => {
  const argIndex = process.argv.indexOf(argName)
  return argIndex !== -1 ? process.argv[argIndex + 1] : null
}

const outDirArg = getArg('--outputDir')
const { typingsConfigs } = require('./federation.config')
const defaultOutputDir = typingsConfigs.typingsOutputDir
const outputDir = resolveApp(outDirArg || defaultOutputDir)

let federationConfig = {}
try {
  federationConfig = require('./federation.config').federationConfigs
} catch (e) {
  console.error(`ERROR:`, e)
  process.exit(1)
}
const { exposes, name: federationName } = federationConfig
const compileFiles = Object.values(exposes)
const outFile = path.resolve(outputDir, `${federationName}.d.ts`)

try {
  if (fs.existsSync(outFile)) {
    fs.unlinkSync(outFile)
  }

  // write the typings file
  const program = ts.createProgram(compileFiles, {
    outFile,
    declaration: true,
    emitDeclarationOnly: true,
    skipLibCheck: true,
    jsx: 'react',
    esModuleInterop: true,
  })

  program.emit()

  let typing = fs.readFileSync(outFile, { encoding: 'utf8', flag: 'r' })
  const moduleRegex = RegExp(/declare module "(.*)"/, 'g')
  const moduleNames = []
  // eslint-disable-next-line no-undef
  while ((execResults = moduleRegex.exec(typing) !== null)) {
    // eslint-disable-next-line no-undef
    moduleNames.push(execResults[1])
  }
  moduleNames.forEach((moduleName) => {
    const regex = RegExp(`"${moduleName}`, 'g')
    typing = typing.replace(regex, `"${federationName}/${moduleName}`)
  })

  typing = Object.keys(exposes).reduce((pre, current) => {
    const item = exposes[current]
    const regStr = /\.\//g
    const exposesModule = current.replace(regStr, '')
    const regStrB = /\.\/src\//g
    const exposesSrc = item.replace(regStrB, '')
    return pre.replace(exposesSrc, `${federationName}/${exposesModule}`)
  }, typing)

  console.log('writing typing file:', outFile)

  fs.writeFileSync(outFile, typing)
  console.log('\x1b[36m%s\x1b[0m', '==== Success! ====')
} catch (e) {
  console.error(`ERROR:`, e)
  process.exit(1)
}
