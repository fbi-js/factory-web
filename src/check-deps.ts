import { Fbi, utils } from 'fbi'

const { isValidObject } = utils

function installDeps() {
  const fbi = new Fbi()
  fbi.loadConfig()

  const template = fbi.context.get('config.factory.template')
  const { deps } = require(`./config/${template}`)
  const depsArr = Object.entries(deps).map(([name, version]) => `${name}@${version}`)

  if (isValidObject(deps)) {
    const pm = fbi.context.get('config').packageManager

    let cmds = [pm, 'install', '--no-save']

    // pnpm: Headless installation requires a pnpm-lock.yaml file
    cmds.push(pm === 'npm' ? '--no-package-lock' : pm === 'yarn' ? '--no-lockfile' : '')

    cmds = cmds.concat(depsArr)
    try {
      fbi.exec.sync(cmds[0], cmds.slice(1).filter(Boolean), {
        stdout: 'inherit',
        cwd: process.cwd()
      })
    } catch (error) {
      fbi.error(error).exit()
    }
  }
}

installDeps()
