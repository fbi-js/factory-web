import { Fbi, utils } from 'fbi'

const { isValidObject } = utils

function installDeps() {
  const fbi = new Fbi()
  fbi.loadConfig()

  const template = fbi.context.get('config.factory.template')

  if (!template) {
    return
  }

  let deps

  try {
    const config = require(`./config/${template}`)
    deps = config.deps
  } catch (err) {}

  if (!deps) {
    return
  }

  const depsArr = Object.entries(deps).map(([name, version]) => `${name}@${version}`)

  if (isValidObject(deps)) {
    const pm = fbi.context.get('config').packageManager

    const cmds = [pm, pm === 'yarn' ? 'add' : 'install', ...depsArr]

    // pnpm: Headless installation requires a pnpm-lock.yaml file
    cmds.push(pm === 'yarn' ? '--no-lockfile' : '--no-save --no-package-lock')

    fbi.logStart(`${cmds.join(' ')}...`)
    try {
      fbi.exec.sync(cmds[0], cmds.slice(1).filter(Boolean), {
        stdout: 'ignore',
        cwd: process.cwd()
      })
      fbi.logEnd(`Installed successfully`)
    } catch (error) {
      fbi.error(error).exit()
    }
  }
}

installDeps()
